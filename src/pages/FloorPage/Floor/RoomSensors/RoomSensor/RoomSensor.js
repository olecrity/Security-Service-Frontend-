import { useRooms } from "../../../../../contexts/RoomsContext";
import styles from "./RoomSensor.module.scss";

function RoomSensor({ sensor }) {
  const { dispatch } = useRooms();
  function handleOnDeactivateSensor() {
    dispatch({ type: "sensor/deactivate", payload: sensor.id });
  }

  return (
    <div className={styles["sensor-container"]}>
      <p>ID: {sensor.id} </p>
      <p>{sensor.type} </p>
      <p>{sensor.status} </p>
      <button onClick={handleOnDeactivateSensor}>Deactivate</button>
    </div>
  );
}

export default RoomSensor;
