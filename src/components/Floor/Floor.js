import FloorSchema from "./FloorSchema/FloorSchema";
import styles from "./Floor.module.scss";
import RoomSensors from "./RoomSensors/RoomSensors";
import InAppSimulation from "../House/SimulationActions/SimulationActions.js";
import { useBuilding } from "../../contexts/BuidingContext";

function Floor() {
  const { currentRoom, isLoading } = useBuilding();

  return (
    <div className={styles["floor-page"]}>
      {!isLoading && <FloorSchema />}
      <div>
        {currentRoom && <RoomSensors />}
        <InAppSimulation />
      </div>
    </div>
  );
}

export default Floor;
