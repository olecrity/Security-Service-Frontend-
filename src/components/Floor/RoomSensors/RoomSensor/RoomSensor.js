import { useBuilding } from "../../../../contexts/BuidingContext";
import styles from "./RoomSensor.module.scss";

function RoomSensor({ sensor }) {
  const { dispatch } = useBuilding();
  function handleOnDeactivateSensor() {
    dispatch({ type: "room/sensor/deactivate", payload: sensor.ID });
  }
  function formatSensorName(name) {
    return name.replace(/Sensor$/, " sensor");
  }
  return (
    <div className={`${styles["sensor-container"]} `}>
      <p>{formatSensorName(sensor.SensorType)} :</p>
      <button
        className={`${styles["btn-deactivate"]} ${
          sensor.status === "active" ? styles.active : ""
        }`}
        onClick={handleOnDeactivateSensor}
      >
        Deactivate
      </button>
    </div>
  );
}

export default RoomSensor;
