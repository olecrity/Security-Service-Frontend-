import styles from "./BuildingFloor.module.scss";
function BuildingFloor({ floor }) {
  return (
    <tr className={styles["floor-container"]}>
      <td className={styles["floor-cell"]}>{floor}</td>
      <td className={styles["floor-cell"]}>
        <button className={styles["btn-delete"]}>Delete</button>
      </td>
    </tr>
  );
}

export default BuildingFloor;
