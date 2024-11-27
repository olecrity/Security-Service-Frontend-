import { useBuilding } from "../../../contexts/BuidingContext";
import styles from "./PastSimulations.module.scss";
import { NavLink } from "react-router-dom";

function PastSimulations() {
  const { getLogs, startReplay, stopReplay, isFinalized } = useBuilding();
  return (
    <div className={styles.second_section_simulations}>
      <h3>Past simulations</h3>
      <table></table>
      <div className={styles.button_section2}>
        <button
          className={
            isFinalized ? styles.main_title_btn2 : styles["btn-inactive"]
          }
          onClick={isFinalized ? getLogs : () => {}}
        >
          <a className={styles.navigation}>
            <p className={styles.main_btn_text}>Show information</p>
          </a>
        </button>
        <button
          className={
            isFinalized ? styles.main_title_btn2 : styles["btn-inactive"]
          }
          onClick={isFinalized ? startReplay : () => {}}
        >
          <a className={styles.navigation}>
            <p className={styles.main_btn_text}>Replay last simulation</p>
          </a>
        </button>
        <div className={styles.button_section3}>
          <button
            className={
              isFinalized ? styles.main_title_btn2 : styles["btn-inactive"]
            }
            onClick={isFinalized ? stopReplay : () => {}}
          >
            <a className={styles.navigation}>
              <p className={styles.main_btn_text}>Stop replay</p>
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PastSimulations;
