import { useBuilding } from "../../../../contexts/BuidingContext";
import styles from "./BuildingFloor.module.scss";
function BuildingFloor({ floor, id }) {
  const { handleRemoveFloor } = useBuilding();

  return (
    <tr className={styles["floor-container"]}>
      <td className={styles["floor-cell"]}>{floor}</td>
      <td className={styles["floor-cell"]}>
        <button
          onClick={() => handleRemoveFloor(id)}
          className={styles["btn-delete"]}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default BuildingFloor;
