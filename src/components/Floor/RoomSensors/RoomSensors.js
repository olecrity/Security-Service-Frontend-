import { useBuilding } from "../../../contexts/BuidingContext";
import RoomSensor from "./RoomSensor/RoomSensor";
import styles from "./RoomSensors.module.scss";

function RoomSensors() {
  const { currentRoom, dispatch } = useBuilding();
  const sensors = currentRoom.sensors;
  function handleBtnClose() {
    dispatch({ type: "room/sensors/hide" });
  }

  return (
    <div className={styles["sensors-container"]}>
      <div className={styles["sensors-title-container"]}>
        <h3>List of sensors of {currentRoom.RoomType}:</h3>
        <button onClick={handleBtnClose} className={styles["btn-close"]}>
          Close
        </button>
      </div>
      {sensors.map((sensor) => (
        <RoomSensor sensor={sensor} key={sensor.ID} />
      ))}
    </div>
  );
}

export default RoomSensors;
