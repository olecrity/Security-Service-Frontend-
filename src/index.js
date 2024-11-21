import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

async function simulateActivity(building) {
  const allSensors = building.floors.map((floor) =>
    floor.rooms.map((room) => room.sensors.map((sensor) => sensor))
  );
  console.log(allSensors);
}

export { simulateActivity };
