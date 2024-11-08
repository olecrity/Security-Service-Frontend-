import { createContext, useContext, useReducer } from "react";

const RoomsContext = createContext();

const initialState = {
  rooms: [
    {
      area: 10,
      id: 1,
      type: "kitchen",
      sensors: [
        { id: 11, type: "heat", status: "active" },
        { id: 12, type: "move", status: "inactive" },
        { id: 13, type: "move", status: "active" },
      ],
    },
    {
      area: 10,
      id: 2,
      type: "toilet",
      sensors: [
        { id: 21, type: "heat", status: "active" },
        { id: 22, type: "camera", status: "inactive" },
        { id: 23, type: "move", status: "active" },
      ],
    },
    {
      area: 20,
      id: 3,
      type: "corridor",
      sensors: [
        { id: 31, type: "heat", status: "active" },
        { id: 32, type: "move", status: "inactive" },
        { id: 33, type: "move", status: "inactive" },
        { id: 34, type: "move", status: "inactive" },
        { id: 35, type: "move", status: "inactive" },
        { id: 36, type: "move", status: "inactive" },
      ],
    },
    {
      area: 40,
      id: 4,
      type: "office",
      sensors: [
        { id: 41, type: "heat", status: "inactive" },
        { id: 42, type: "move", status: "inactive" },
        { id: 43, type: "move", status: "inactive" },
        { id: 44, type: "camera", status: "inactive" },
        { id: 45, type: "camera", status: "inactive" },
      ],
    },
    {
      area: 10,
      id: 5,
      type: "restingZone",
      sensors: [
        { id: 51, type: "heat", status: "active" },
        { id: 52, type: "move", status: "inactive" },
        { id: 53, type: "move", status: "active" },
      ],
    },
    {
      area: 10,
      id: 6,
      type: "meetingZone",
      sensors: [
        { id: 61, type: "heat", status: "active" },
        { id: 62, type: "move", status: "inactive" },
        { id: 63, type: "move", status: "active" },
      ],
    },
  ],
  isLoading: false,
  currentRoom: null,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "roomSensors/shown":
      return {
        ...state,
        currentRoom: state.rooms.find((room) => room.id === action.payload),
      };
    default:
      throw new Error("Unknown action type");
  }
}

function RoomsProvider({ children }) {
  const [{ rooms, isLoading, currentRoom, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <RoomsContext.Provider
      value={{
        rooms,
        isLoading,
        currentRoom,
        error,
        dispatch,
      }}
    >
      {children}
    </RoomsContext.Provider>
  );
}

function useRooms() {
  const context = useContext(RoomsContext);
  if (context === undefined)
    throw new Error("RoomsContext was used outside the RoomsProvider");
  return context;
}

export { RoomsProvider, useRooms };
