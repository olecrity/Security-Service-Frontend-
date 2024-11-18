import FloorSchema from "./FloorSchema/FloorSchema";
import styles from "./Floor.module.scss";
import RoomSensors from "./RoomSensors/RoomSensors";
import { RoomsProvider, useRooms } from "../../contexts/RoomsContext";
import InAppSimulation from "../InAppSimulation/InAppSimulation";

function Floor() {
  const { currentRoom } = useRooms();

  return (
    <div className={styles["floor-page"]}>
      <FloorSchema />
      <div>
        {currentRoom && <RoomSensors />}
        <InAppSimulation />
      </div>
    </div>
  );
}

export default Floor;
