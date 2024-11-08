import FloorSchema from "./FloorSchema/FloorSchema";
import styles from "./Floor.module.scss";
import RoomSensors from "./RoomSensors/RoomSensors";

function Floor() {
  return (
    <div className={styles["floor-page"]}>
      <FloorSchema />
      <RoomSensors />
    </div>
  );
}

export default Floor;
