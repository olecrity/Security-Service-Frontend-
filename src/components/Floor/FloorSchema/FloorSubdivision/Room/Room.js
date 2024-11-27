import { useEffect, useState } from "react";
import styles from "./Room.module.scss";
import { useBuilding } from "../../../../../contexts/BuidingContext";

function Room({ room, subdivisionSize, roomId }) {
  const roomHeight = (room.area / subdivisionSize) * 100;
  const { dispatch } = useBuilding();

  const [sensorStatus, setSensorStatus] = useState({
    camera: false,
    motion: false,
    fire: false,
    sound: false
  });

  useEffect(
    function () {
      const room = document.getElementById(`${roomId}`);
      room.style.height = `${roomHeight}%`;
      room.style.width = `100%`;
    },
    [roomHeight, roomId]
  );

  function handleClick() {
    dispatch({ type: "room/sensors/shown", payload: roomId });
  }

  useEffect(() => {
    // Check the status of each sensor and update the state
    const updatedSensorStatus = {
      camera: room.sensors.some(sensor => sensor.SensorType === "Camera" && sensor.status === "active"),
      motion: room.sensors.some(sensor => sensor.SensorType === "MotionSensor" && sensor.status === "active"),
      fire: room.sensors.some(sensor => sensor.SensorType === "TemperatureSensor" && sensor.status === "active"),
      sound: room.sensors.some(sensor => sensor.SensorType === "Microphone" && sensor.status === "active")
    };
    setSensorStatus(updatedSensorStatus);
  }, [room.sensors]);

  return (
    <div
      onClick={handleClick}
      id={roomId}
      className={`${styles.room} ${
        room.sensors.some((sensor) => sensor.status === "active")
          ? styles.alarm
          : ""
      }`}
    >
      {sensorStatus.fire && (
        <img
          className={`${styles.gif} ${styles.fire}`}
          src="../../../../../fire-flame.gif"
          alt="Fire GIF"
          width="50"
          height="50"
        />
      )}
      {sensorStatus.motion && (
        <img
          className={`${styles.gif} ${styles.motion}`}
          src="../../../../../motion.gif"
          alt="Motion GIF"
          width="50"
          height="50"
        />
      )}
      {sensorStatus.camera && (
        <img
          className={`${styles.gif} ${styles.camera}`}
          src="../../../../../camera-emoji.gif"
          alt="Camera GIF"
          width="50"
          height="50"
        />
      )}
      {sensorStatus.sound && (
        <img
          className={`${styles.gif} ${styles.sound}`}
          src="../../../../../sound.gif"
          alt="Sound GIF"
          width="50"
          height="50"
        />
      )}
    </div>
  );
}

export default Room;
