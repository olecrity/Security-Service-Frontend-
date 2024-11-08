import FloorSchema from "./FloorSchema/FloorSchema";
import styles from "./Floor.module.scss";
import RoomSensors from "./RoomSensors/RoomSensors";
import { RoomsProvider, useRooms } from "../../../contexts/RoomsContext";

function Floor() {
  const { currentRoom } = useRooms();

  return (
    <div className={styles["floor-page"]}>
      <FloorSchema />
      {currentRoom && <RoomSensors />}
    </div>
  );
}

export default Floor;
