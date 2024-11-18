import { useRooms } from "../../../contexts/RoomsContext";
import RoomSensor from "./RoomSensor/RoomSensor";
import styles from "./RoomSensors.module.scss";

function RoomSensors() {
  const { currentRoom, dispatch } = useRooms();
  const sensors = currentRoom.sensors;

  function handleBtnClose() {
    dispatch({ type: "roomSensors/hide" });
  }

  return (
    <div className={styles["sensors-container"]}>
      <div className={styles["sensors-title-container"]}>
        <h3>List of sensors:</h3>
        <button onClick={handleBtnClose} className={styles["btn-close"]}>
          Close
        </button>
      </div>
      {sensors.map((sensor) => (
        <RoomSensor sensor={sensor} key={sensor.id} />
      ))}
    </div>
  );
}

export default RoomSensors;
