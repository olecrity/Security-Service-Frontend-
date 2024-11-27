import { createContext, useContext, useEffect, useReducer } from "react";
import { useAuth } from "./AuthContext";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const BASE_URL = "http://localhost:9000";
const DB_BASE_URL = "http://localhost:8080";

let webSocket = null;
let stompClient = null;
let shouldStop = false;

const BuildingContext = createContext();
const initialState = {
  topic: null,
  simulationStatus: "Not active",
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
    case "logout":
      return { ...initialState };
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "loaded":
      return {
        ...state,
        isLoading: false,
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
    case "building/floors/remove":
      return {
        ...state,
        buildingCreation: {
          ...state.buildingCreation,
          floors: state.buildingCreation.floors.filter(
            (_, index) => index !== action.payload
          ),
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
          state.currentFloor != null
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
    case "simulation/start":
      return {
        ...state,
        topic: action.payload,
        simulationStatus: "In Progress",
      };
    case "simulation/pause":
      return {
        ...state,
        simulationStatus: "Stopped",
      };
    case "simulation/resume":
      return {
        ...state,
        simulationStatus: "In Progress",
      };
    case "simulation/stop":
      return {
        ...state,
        simulationStatus: "Ended",
      };
    default:
      throw new Error("Unknown action type");
  }
}

function BuildingProvider({ children }) {
  const [
    {
      floors,
      isLoading,
      currentFloor,
      currentRoom,
      error,
      buildingCreation,
      simulationStatus,
      heightInFloors,
      isFinalized,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const { sessionId, logout } = useAuth();

  async function handleCreateBuilding(numFloors, floorArea) {
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

  function handleAddFloor(floorType) {
    dispatch({ type: "buiding/floors/add", payload: floorType });
  }
  function handleRemoveFloor(id) {
    dispatch({ type: "building/floors/remove", payload: id });
  }

  async function handleFinalize() {
    try {
      dispatch({ type: "loading" });
      for (let i = 0; i < buildingCreation.floors.length; i++) {
        await fetch(
          `${DB_BASE_URL}/api/building/add-floor?sessionId=${sessionId}&floorType=${buildingCreation.floors[i]}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
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
      const goodBuilding = reworkBuildingObject(data);
      dispatch({ type: "floors/loaded", payload: goodBuilding });
    } catch (error) {
      console.error(error.message);
    } finally {
      dispatch({ type: "loaded" });
    }
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

  async function startSimulation() {
    const res = await fetch(
      `${DB_BASE_URL}/api/building/start-simulation?sessionId=${sessionId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);
    connectWebSocket(data, true);
    dispatch({ type: "simulation/start", payload: data.topic });
  }
  async function stopSimulation() {
    const res = await fetch(
      `${DB_BASE_URL}/api/building/stop-simulation?sessionId=${sessionId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);
    disconnectWebSocket();
    dispatch({ type: "simulation/stop" });
  }
  async function pauseSimulation() {
    await fetch(
      `${DB_BASE_URL}/api/building/pause-simulation?sessionId=${sessionId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "simulation/pause" });
  }
  async function resumeSimulation() {
    await fetch(
      `${DB_BASE_URL}/api/building/resume-simulation?sessionId=${sessionId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "simulation/resume" });
  }
  async function getLogs() {
    const res = await fetch(
      `${DB_BASE_URL}/api/session/get-logs?sessionId=${sessionId}`
    );
    const data = await res.json();
    console.log(data);
    const formattedString = data
      .map(
        (sensor) =>
          `ID: ${sensor.sensorDetails.ID}, SensorType: ${sensor.sensorDetails.SensorType}, activated: ${sensor.activated}, currentTime: ${sensor.currentTime}`
      )
      .join("\n");
    console.log(formattedString);
    document.getElementById("Logs").value = formattedString;
  }
  async function startReplay() {
    const res = await fetch(
      `${DB_BASE_URL}/api/building/start-replay?sessionId=${sessionId}&startTime=2024-11-25T14%3A25%3A42&endTime=2024-12-11T14%3A25%3A42`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    connectWebSocket(data, false);
    dispatch({ type: "simulation/start", payload: data.topic });
  }
  async function stopReplay() {
    const res = await fetch(
      `${DB_BASE_URL}/api/building/stop-replay?sessionId=${sessionId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    disconnectWebSocket();
    dispatch({ type: "simulation/stop" });
  }

  function logoutAll() {
    dispatch({ type: "logout" });
    logout();
  }

  // місце для сокетів

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  function connectWebSocket(data, replay) {
    const socket = new SockJS("http://localhost:8080/ws");
    stompClient = Stomp.over(socket);
  
    socket.onopen = function () {
      console.log("open");
    };
    shouldStop = false;
  
    stompClient.connect(
      {},
      function (frame) {
        stompClient.subscribe(data.topic, async function (message) {
          const parsedMessages = message.body.split("\n").map(line => {
            try {
              return JSON.parse(line.trim()); 
            } catch (e) {
              console.error("Error parsing message:", e);
              return null; 
            }
          });
  
          for (const parsedMessage of parsedMessages) {
            if (shouldStop) {
              break; // Припиняємо цикл, якщо потрібна зупинка
            }
            if (parsedMessage) {
              let sensorId = null;
              let time = null;
              // Перевірка на наявність полів у кожному об'єкті
              if (parsedMessage.sensorId) {
                sensorId = parsedMessage.sensorId;

                console.log( parseInt(sensorId, 10));
                if (!replay) {
                  if (shouldStop) {
                    break; // Припиняємо цикл під час затримки
                  }
                  await sleep(5000);
                }
                if (sensorId !== null) {
                  dispatch({
                    type: "room/sensor/activate",
                    payload: parseInt(sensorId, 10),
                  });
                }
              }
              if (parsedMessage.time) {
                time = parsedMessage.time;
              }
            }
          }
        });
      },
      function (error) {
        console.log(`WebSocket error: ${error}`);
      }
    );
  }

  async function disconnectWebSocket() {
    shouldStop = true;
    if (webSocket) {
      webSocket.close();
      webSocket = null;
      console.log("WebSocket disconnected");
    }
  }

  useEffect(
    function () {
      async function fetchBuilding() {
        dispatch({ type: "loading" });
        try {
          await handleGetBuilding();
        } catch (error) {
          console.error(error);
        } finally {
          dispatch({ type: "loaded" });
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
        simulationStatus,
        heightInFloors,
        isFinalized,
        handleCreateBuilding,
        handleAddFloor,
        handleFinalize,
        handleGetBuilding,
        startSimulation,
        stopSimulation,
        resumeSimulation,
        pauseSimulation,
        handleRemoveFloor,
        getLogs,
        startReplay,
        stopReplay,
        logoutAll,
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
