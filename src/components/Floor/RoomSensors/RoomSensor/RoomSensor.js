import { useBuilding } from "../../../../contexts/BuidingContext";
import styles from "./RoomSensor.module.scss";

function RoomSensor({ sensor }) {
  const { dispatch } = useBuilding();
  function handleOnDeactivateSensor() {
    dispatch({ type: "room/sensor/deactivate", payload: sensor.ID });
  }

  return (
    <div className={styles["sensor-container"]}>
      <p>ID: {sensor.ID} </p>
      <p>{sensor.type} </p>
      <p>{sensor.status} </p>
      <button
        className={styles["btn-deactivate"]}
        onClick={handleOnDeactivateSensor}
      >
        Deactivate
      </button>
    </div>
  );
}

export default RoomSensor;
