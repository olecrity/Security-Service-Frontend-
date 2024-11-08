import styles from "./RoomSensor.module.scss";

function RoomSensor({ sensor }) {
  return (
    <div className={styles["sensor-container"]}>
      <p>ID: {sensor.id} </p>
      <p>{sensor.type} </p>
      <p>{sensor.status} </p>
      <button>Deactivate</button>
    </div>
  );
}

export default RoomSensor;
