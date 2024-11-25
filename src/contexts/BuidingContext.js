import { createContext, useContext, useEffect, useReducer } from "react";

const BASE_URL = "http://localhost:9000";

const BuildingContext = createContext();
const initialState = {
  floors: [],
  isLoading: false,
  error: null,
  currentFloor: null,
  currentRoom: null,
  buildingCreation: null,
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
        floors: action.payload,
        isLoading: false,
        currentFloor: action.payload[0],
      };
    case "building/create":
      return { ...state, buildingCreation: { floors: [] } };
    case "buiding/floors/add":
      return {
        ...state,
        buildingCreation: {
          floors: [...state.buildingCreation.floors, action.payload],
        },
      };
    case "rooms/shown":
      return {
        ...state,
        currentFloor: state.floors.find((floor) => floor.id === action.payload),
      };
    case "room/sensors/shown":
      return {
        ...state,
        currentRoom: state.currentFloor.rooms.find(
          (room) => room.id === action.payload
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
          room.sensors.find((sensor) => sensor.id === action.payload)
        )
      );
      const myRoom = myFloor.rooms.find((room) =>
        room.sensors.find((sensor) => sensor.id === action.payload)
      );
      console.log(action.payload, myFloor, myRoom);
      return {
        ...state,
        floors: state.floors.map((floor) =>
          floor.id === myFloor.id
            ? {
                ...floor,
                rooms: floor.rooms.map((room) =>
                  room.id === myRoom.id
                    ? {
                        ...room,
                        sensors: room.sensors.map((sensor) =>
                          sensor.id === action.payload
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
            ? state.currentFloor.id === myFloor.id
              ? {
                  ...state.currentFloor,
                  rooms: state.currentFloor.rooms.map((room) =>
                    room.id === myRoom.id
                      ? {
                          ...room,
                          sensors: room.sensors.map((sensor) =>
                            sensor.id === action.payload
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
            ? state.currentRoom.id === myRoom.id
              ? {
                  ...state.currentRoom,
                  sensors: state.currentRoom.sensors.map((sensor) =>
                    sensor.id === action.payload
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
          floor.id === state.currentFloor.id
            ? {
                ...floor,
                rooms: floor.rooms.map((room) =>
                  room.id === state.currentRoom.id
                    ? {
                        ...room,
                        sensors: room.sensors.map((sensor) =>
                          sensor.id === action.payload
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
            room.id === state.currentRoom.id
              ? {
                  ...room,
                  sensors: room.sensors.map((sensor) =>
                    sensor.id === action.payload
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
            sensor.id === action.payload
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

  useEffect(function () {
    async function fetchFloors() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/floors`);
        const data = await res.json();
        dispatch({ type: "floors/loaded", payload: data });
      } catch (error) {
        console.error(error);
      }
    }
    fetchFloors();
  }, []);

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
