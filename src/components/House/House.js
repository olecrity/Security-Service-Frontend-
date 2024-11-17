import HouseFloor from "./HouseFloor/HouseFloor.js";
import CreateBuilding from "./CreateBuilding/CreateBuilding.js";
import SimulationActions from "./SimulationActions/SimulationActions.js";
import styles from "./House.module.scss";

function House({ floors }) {
  return (
      <div className={styles.main_house}>
        <div className={styles.simulation_section}>
          <h3 className={styles.main_caption}>Simulation building</h3>
          <div className={styles.house}>
            {floors.map((floor, i) => (
              <HouseFloor key={i} />
            ))}
          </div>
        </div>

        <div className={styles.building_structure}>
          <CreateBuilding></CreateBuilding>
          <SimulationActions></SimulationActions>
        </div>
    </div>
  );
}

export default House;
