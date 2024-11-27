import styles from "./PastSimulations.module.scss";
import { NavLink } from "react-router-dom";
import { useBuilding } from "../../../contexts/BuidingContext.js";

function PastSimulations() {
  const { startSimulation } = useBuilding();
    return ( 
        <div className={styles.second_section_simulations}>
        <h3>Past simulations</h3>
        <table></table>
        <div className={styles.button_section2}>
          <button className={styles.main_title_btn2}>
            <a className={styles.navigation}>
                <p className={styles.main_btn_text}>Show information</p>
            </a>
          </button>
          <button className={styles.main_title_btn2} onClick={startSimulation}>
              <NavLink to="/house" className={styles.navigation}>
                  <p className={styles.main_btn_text}>Resume simulation</p>
              </NavLink>
          </button>
          <div className={styles.button_section3}>
            <button className={styles.main_title_btn2}>
              <NavLink to="/house" className={styles.navigation}>
                  <p className={styles.main_btn_text}>Continute to simulation</p>
              </NavLink>
            </button>
          </div>
        </div>
      </div>
    );
}

export default PastSimulations;