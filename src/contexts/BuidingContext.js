import { createContext, useContext, useEffect, useReducer } from "react";

const BASE_URL = "http://localhost:9000";

const BuildingContext = createContext();
const initialState = {
  floors: [],
  isLoading: false,
  error: null,
  currentFloor: null,
  currentRoom: null,
};

// const initialState = {
//   floors: [
//     {
//       id: 1,
//       rooms: [
//         {
//           area: 10,
//           id: 1,
//           type: "kitchen",
//           sensors: [
//             { id: 11, type: "heat", status: "active" },
//             { id: 12, type: "move", status: "inactive" },
//             { id: 13, type: "move", status: "active" },
//           ],
//         },
//         {
//           area: 10,
//           id: 2,
//           type: "toilet",
//           sensors: [
//             { id: 21, type: "heat", status: "active" },
//             { id: 22, type: "camera", status: "inactive" },
//             { id: 23, type: "move", status: "active" },
//           ],
//         },
//         {
//           area: 20,
//           id: 3,
//           type: "corridor",
//           sensors: [
//             { id: 31, type: "heat", status: "active" },
//             { id: 32, type: "move", status: "inactive" },
//             { id: 33, type: "move", status: "inactive" },
//             { id: 34, type: "move", status: "inactive" },
//             { id: 35, type: "move", status: "inactive" },
//             { id: 36, type: "move", status: "inactive" },
//           ],
//         },
//         {
//           area: 40,
//           id: 4,
//           type: "office",
//           sensors: [
//             { id: 41, type: "heat", status: "inactive" },
//             { id: 42, type: "move", status: "inactive" },
//             { id: 43, type: "move", status: "inactive" },
//             { id: 44, type: "camera", status: "inactive" },
//             { id: 45, type: "camera", status: "inactive" },
//           ],
//         },
//         {
//           area: 10,
//           id: 5,
//           type: "restingZone",
//           sensors: [
//             { id: 51, type: "heat", status: "active" },
//             { id: 52, type: "move", status: "inactive" },
//             { id: 53, type: "move", status: "active" },
//           ],
//         },
//         {
//           area: 10,
//           id: 6,
//           type: "meetingZone",
//           sensors: [
//             { id: 61, type: "heat", status: "active" },
//             { id: 62, type: "move", status: "inactive" },
//             { id: 63, type: "move", status: "active" },
//           ],
//         },
//       ],
//     },
//     {
//       id: 2,
//       rooms: [
//         {
//           area: 5,
//           id: 1,
//           type: "kitchen",
//           sensors: [
//             { id: 11, type: "heat", status: "active" },
//             { id: 12, type: "move", status: "inactive" },
//             { id: 13, type: "move", status: "active" },
//           ],
//         },
//         {
//           area: 2,
//           id: 2,
//           type: "toilet",
//           sensors: [
//             { id: 21, type: "heat", status: "active" },
//             { id: 22, type: "camera", status: "inactive" },
//             { id: 23, type: "move", status: "active" },
//           ],
//         },
//         {
//           area: 10,
//           id: 3,
//           type: "corridor",
//           sensors: [
//             { id: 31, type: "heat", status: "active" },
//             { id: 32, type: "move", status: "inactive" },
//             { id: 33, type: "move", status: "inactive" },
//             { id: 34, type: "move", status: "inactive" },
//             { id: 35, type: "move", status: "inactive" },
//             { id: 36, type: "move", status: "inactive" },
//           ],
//         },
//         {
//           area: 28,
//           id: 4,
//           type: "office",
//           sensors: [
//             { id: 41, type: "heat", status: "inactive" },
//             { id: 42, type: "move", status: "inactive" },
//             { id: 43, type: "move", status: "inactive" },
//             { id: 44, type: "camera", status: "inactive" },
//             { id: 45, type: "camera", status: "inactive" },
//           ],
//         },
//         {
//           area: 10,
//           id: 5,
//           type: "restingZone",
//           sensors: [
//             { id: 51, type: "heat", status: "active" },
//             { id: 52, type: "move", status: "inactive" },
//             { id: 53, type: "move", status: "active" },
//           ],
//         },
//         {
//           area: 7,
//           id: 6,
//           type: "meetingZone",
//           sensors: [
//             { id: 61, type: "heat", status: "active" },
//             { id: 62, type: "move", status: "inactive" },
//             { id: 63, type: "move", status: "active" },
//           ],
//         },
//         {
//           area: 25,
//           id: 4,
//           type: "office",
//           sensors: [
//             { id: 41, type: "heat", status: "inactive" },
//             { id: 42, type: "move", status: "inactive" },
//             { id: 43, type: "move", status: "inactive" },
//             { id: 44, type: "camera", status: "inactive" },
//             { id: 45, type: "camera", status: "inactive" },
//           ],
//         },
//         {
//           area: 13,
//           id: 4,
//           type: "office",
//           sensors: [
//             { id: 41, type: "heat", status: "inactive" },
//             { id: 42, type: "move", status: "inactive" },
//             { id: 43, type: "move", status: "inactive" },
//             { id: 44, type: "camera", status: "inactive" },
//             { id: 45, type: "camera", status: "inactive" },
//           ],
//         },
//       ],
//     },
//   ],
//   isLoading: false,
//   currentFloor: null,
//   currentRoom: null,
//   error: "",
// };

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
  const [{ floors, isLoading, currentFloor, currentRoom, error }, dispatch] =
    useReducer(reducer, initialState);

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
