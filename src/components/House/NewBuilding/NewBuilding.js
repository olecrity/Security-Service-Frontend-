import { useState } from "react";
import { useBuilding } from "../../../contexts/BuidingContext";
import styles from "./NewBuilding.module.scss";

function NewBuilding() {
  const { dispatch } = useBuilding();

  const [numFloors, setNumFloors] = useState("");
  const [floorArea, setFloorArea] = useState("");

  function handleCreateBuilding() {
    dispatch({ type: "building/create" });
  }

  return (
    <div className={styles["new-building"]}>
      <input
        className={styles["new-building-input"]}
        type="text"
        placeholder="Enter number of floors"
        onChange={(e) => setNumFloors(e.target.value)}
      />
      <input
        className={styles["new-building-input"]}
        type="text"
        placeholder="Enter floor area"
        onChange={(e) => setFloorArea(e.target.value)}
      />
      <div className={styles["new-building-button-container"]}>
        <button
          onClick={handleCreateBuilding}
          className={styles["new-building-btn"]}
        >
          Start Creation
        </button>
      </div>
    </div>
  );
}

export default NewBuilding;
