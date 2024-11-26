import { createContext, useContext, useEffect, useReducer } from "react";
import { useAuth } from "./AuthContext";

const BASE_URL = "http://localhost:9000";
const DB_BASE_URL = "http://localhost:8080";

const BuildingContext = createContext();
const initialState = {
  heightInFloors: null,
  floorArea: null,
  floors: [],
  isLoading: false,
  error: null,
  currentFloor: null,
  currentRoom: null,
  buildingCreation: null,
  isFinalized: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "floors/loaded":
      return {
        ...state,
        heightInFloors: action.payload.heightInFloors,
        floorArea: action.payload.floorArea,
        floors: action.payload.floors,
        isLoading: false,
        currentFloor: action.payload[0],
        isFinalized: action.payload.isFinalized,
      };
    case "building/create":
      return {
        ...state,
        buildingCreation: {
          heightInFloors: action.payload.heightInFloors,
          floorArea: action.payload.floorArea,
          floors: [],
        },
      };
    case "buiding/floors/add":
      return {
        ...state,
        buildingCreation: {
          ...state.buildingCreation,
          floors: [...state.buildingCreation.floors, action.payload],
        },
      };
    case "rooms/shown":
      return {
        ...state,
        currentFloor: state.floors.find((floor) => floor.ID === action.payload),
      };
    case "room/sensors/shown":
      return {
        ...state,
        currentRoom: state.currentFloor.rooms.find(
          (room) => room.ID === action.payload
        ),
      };
    case "room/sensors/hide": {
      return {
        ...state,
        currentRoom: null,
      };
    }
    case "room/sensor/activate":
      const myFloor = state.floors.find((floor) =>
        floor.rooms.find((room) =>
          room.sensors.find((sensor) => sensor.ID === action.payload)
        )
      );
      const myRoom = myFloor.rooms.find((room) =>
        room.sensors.find((sensor) => sensor.ID === action.payload)
      );
      console.log(action.payload, myFloor, myRoom);
      return {
        ...state,
        floors: state.floors.map((floor) =>
          floor.ID === myFloor.ID
            ? {
                ...floor,
                rooms: floor.rooms.map((room) =>
                  room.ID === myRoom.ID
                    ? {
                        ...room,
                        sensors: room.sensors.map((sensor) =>
                          sensor.ID === action.payload
                            ? { ...sensor, status: "active" }
                            : sensor
                        ),
                      }
                    : room
                ),
              }
            : floor
        ),
        currentFloor:
          state.currentFloor !== null
            ? state.currentFloor.ID === myFloor.ID
              ? {
                  ...state.currentFloor,
                  rooms: state.currentFloor.rooms.map((room) =>
                    room.ID === myRoom.ID
                      ? {
                          ...room,
                          sensors: room.sensors.map((sensor) =>
                            sensor.ID === action.payload
                              ? { ...sensor, status: "active" }
                              : sensor
                          ),
                        }
                      : room
                  ),
                }
              : { ...state.currentFloor }
            : null,
        currentRoom:
          state.currentRoom !== null
            ? state.currentRoom.ID === myRoom.ID
              ? {
                  ...state.currentRoom,
                  sensors: state.currentRoom.sensors.map((sensor) =>
                    sensor.ID === action.payload
                      ? { ...sensor, status: "active" }
                      : sensor
                  ),
                }
              : { ...state.currentRoom }
            : null,
      };
    case "room/sensor/deactivate":
      return {
        ...state,
        floors: state.floors.map((floor) =>
          floor.ID === state.currentFloor.ID
            ? {
                ...floor,
                rooms: floor.rooms.map((room) =>
                  room.ID === state.currentRoom.ID
                    ? {
                        ...room,
                        sensors: room.sensors.map((sensor) =>
                          sensor.ID === action.payload
                            ? { ...sensor, status: "inactive" }
                            : sensor
                        ),
                      }
                    : room
                ),
              }
            : floor
        ),
        currentFloor: {
          ...state.currentFloor,
          rooms: state.currentFloor.rooms.map((room) =>
            room.ID === state.currentRoom.ID
              ? {
                  ...room,
                  sensors: room.sensors.map((sensor) =>
                    sensor.ID === action.payload
                      ? { ...sensor, status: "inactive" }
                      : sensor
                  ),
                }
              : room
          ),
        },
        currentRoom: {
          ...state.currentRoom,
          sensors: state.currentRoom.sensors.map((sensor) =>
            sensor.ID === action.payload
              ? { ...sensor, status: "inactive" }
              : sensor
          ),
        },
      };
    default:
      throw new Error("Unknown action type");
  }
}

function BuildingProvider({ children }) {
  const [
    { floors, isLoading, currentFloor, currentRoom, error, buildingCreation },
    dispatch,
  ] = useReducer(reducer, initialState);
  const { sessionId } = useAuth();

  async function handleCreateBuilding(numFloors, floorArea) {
    const sendBuilding = {
      sessionId: sessionId,
      heightInFloors: numFloors,
      floorArea: floorArea,
    };
    console.log(sendBuilding);

    await fetch(`${DB_BASE_URL}/api/building/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId: sessionId,
        heightInFloors: numFloors,
        floorArea: floorArea,
      }),
    });
    dispatch({
      type: "building/create",
      payload: { heightInFloors: numFloors, floorArea: floorArea },
    });
  }

  async function handleAddFloor(floorType) {
    await fetch(
      `${DB_BASE_URL}/api/building/addFloor?sessionId=${sessionId}&floorType=${floorType}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "buiding/floors/add", payload: floorType });
  }

  async function handleFinalize() {
    const res = await fetch(
      `${DB_BASE_URL}/api/building/finalize?sessionId=${sessionId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);
    const goodBuilding = reworkBuildingObject(data);
    dispatch({ type: "floors/loaded", payload: goodBuilding });
  }
  async function handleGetBuilding() {
    const res = await fetch(
      `${DB_BASE_URL}/api/building/config?sessionId=${sessionId}`
    );
    const data = await res.json();
    console.log(data);
    const goodBuilding = reworkBuildingObject(data);
    dispatch({ type: "floors/loaded", payload: goodBuilding });
  }

  function reworkBuildingObject(building) {
    const floorArea = building.floorArea;
    const floors = building.floors;
    const heightInFloors = building.heightInFloors;
    const isFinalized = building.isFinalized;

    const reworkedFloors = floors.map((floor) => {
      return {
        ...floor,
        rooms: floor.rooms.map((room) => {
          return { ...room, area: (room.area / floorArea) * 100 };
        }),
      };
    });

    const resultBuilding = {
      floorArea,
      heightInFloors,
      isFinalized,
      floors: reworkedFloors,
    };
    return resultBuilding;
  }

  // місце для сокетів

  useEffect(
    function () {
      async function fetchBuilding() {
        dispatch({ type: "loading" });
        try {
          await handleGetBuilding();
        } catch (error) {
          // console.error(error);
        }
      }
      fetchBuilding();
    },
    [sessionId]
  );

  return (
    <BuildingContext.Provider
      value={{
        floors,
        isLoading,
        currentFloor,
        currentRoom,
        error,
        dispatch,
        buildingCreation,
        handleCreateBuilding,
        handleAddFloor,
        handleFinalize,
        handleGetBuilding,
      }}
    >
      {children}
    </BuildingContext.Provider>
  );
}

function useBuilding() {
  const context = useContext(BuildingContext);
  if (context === undefined)
    throw new Error("💥 BuildingContext was used outside the RoomsProvider");
  return context;
}

export { BuildingProvider, useBuilding };
