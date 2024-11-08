import RoomSensor from "./RoomSensor/RoomSensor";
import styles from "./RoomSensors.module.scss";

function RoomSensors() {
  return (
    <div className={styles["sensors-container"]}>
      <h3>List of sensors:</h3>
      <RoomSensor />
      <RoomSensor />
      <RoomSensor />
    </div>
  );
}

export default RoomSensors;
