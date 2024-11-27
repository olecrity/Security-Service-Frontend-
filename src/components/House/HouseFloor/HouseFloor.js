import React, { useState } from "react";
import styles from "./HouseFloor.module.scss";
import { useBuilding } from "../../../contexts/BuidingContext";
import { useNavigate } from "react-router-dom";

function HouseFloor({ floor }) {
  const { dispatch, floors } = useBuilding();
  const navigate = useNavigate();
  let sensorsCounted = [0, 0, 0, 0];
  countSensors();

  function handleClick() {
    dispatch({ type: "rooms/shown", payload: floor.ID });
    navigate("/floor");
  }

  function countSensors() {
    floor.rooms.forEach((room) =>
      room.sensors.forEach((sensor) => {
        if (sensor.SensorType === "Camera") {
          sensorsCounted[0]++;
        }
        if (sensor.SensorType === "MotionSensor") {
          sensorsCounted[1]++;
        }
        if (sensor.SensorType === "TemperatureSensor") {
          sensorsCounted[2]++;
        }
        if (sensor.SensorType === "Microphone") {
          sensorsCounted[3]++;
        }
      })
    );
  }
  return (
    <div
      onClick={handleClick}
      className={`${styles["house-floor"]} 
      ${
        floor.rooms.some((room) =>
          room.sensors.some((sensor) => sensor.status === "active")
        )
          ? styles.alarm
          : ""
      }
      `}
    >
      {sensorsCounted.map((counter, index) => (
        <div key={index} className={styles.sensor}>
          <div
            className={`${styles.decoration} ${styles[`color-${index + 1}`]}`}
          ></div>
          <p
            className={`${styles.sensors_amount} ${
              styles[`type-${index + 1}`]
            }`}
          >
            {counter}
          </p>
        </div>
      ))}
    </div>
  );
}

export default HouseFloor;
