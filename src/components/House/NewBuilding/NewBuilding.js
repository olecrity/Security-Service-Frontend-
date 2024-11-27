import { useState } from "react";
import { useBuilding } from "../../../contexts/BuidingContext";
import styles from "./NewBuilding.module.scss";
import { useAuth } from "../../../contexts/AuthContext";

function NewBuilding() {
  const { handleCreateBuilding, isFinalized } = useBuilding();
  const { isAuthenticated } = useAuth();

  const [numFloors, setNumFloors] = useState("");
  const [floorArea, setFloorArea] = useState("");

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
          onClick={
            isFinalized
              ? () => {}
              : () => handleCreateBuilding(numFloors, floorArea)
          }
          className={
            isAuthenticated && !isFinalized
              ? styles["new-building-btn"]
              : styles["btn-inactive"]
          }
        >
          Start Creation
        </button>
      </div>
    </div>
  );
}

export default NewBuilding;
