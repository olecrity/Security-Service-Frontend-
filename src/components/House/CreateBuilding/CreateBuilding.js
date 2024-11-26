import React from "react";
import styles from "./CreateBuilding.module.scss";
import { useBuilding } from "../../../contexts/BuidingContext";
import BuildingFloor from "./BuildingFloor/BuildingFloor";

function CreateBuilding() {
  const { buildingCreation, handleAddFloor, handleFinalize } = useBuilding();

  return (
    <div>
      <h3 className={styles.main_caption}>Create building structure</h3>
      <div className={styles.create_table}>
        <div className={styles.table_section}>
          <table id={styles.floors_table}>
            <thead>
              <tr>
                <th scope="col" className={styles.caption}>
                  Floor type
                </th>
                <th scope="col" className={styles.floor_cancel}>
                  Remove
                </th>
              </tr>
            </thead>
            <tbody id={styles.table_body}>
              {buildingCreation.floors.map((floor, index) => (
                <BuildingFloor
                  floor={floor}
                  id={index}
                  key={index}
                ></BuildingFloor>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.buttons_section}>
          <button
            onClick={() => handleAddFloor("Default")}
            className={styles.main_title_btn}
          >
            Add Default floor
          </button>
          <button
            onClick={() => handleAddFloor("Office")}
            className={styles.main_title_btn}
          >
            Add Office floor
          </button>
          <button
            onClick={() => handleAddFloor("Hostel")}
            className={styles.main_title_btn}
          >
            Add Hostel floor
          </button>
          <button
            onClick={handleFinalize}
            id={styles.submit_struct_btn}
            className={styles.main_title_btn}
          >
            Submit structure
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateBuilding;
