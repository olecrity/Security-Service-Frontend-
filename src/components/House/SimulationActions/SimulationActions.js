import React from "react";
import styles from "./SimulationActions.module.scss";
import { useBuilding } from "../../../contexts/BuidingContext";

function SimulationActions() {
  const { startSimulation, stopSimulation, resumeSimulation, pauseSimulation } =
    useBuilding();
  return (
    <div className={styles.lower_section}>
      <div className={styles.button_section2}>
        <button className={styles.main_title_btn2} onClick={startSimulation}>
          <a className={styles.navigation}>
            <p className={styles.main_btn_text}>Start simulation</p>
          </a>
        </button>
        <button className={styles.main_title_btn2} onClick={pauseSimulation}>
          <a className={styles.navigation}>
            <p className={styles.main_btn_text}>Pause simulation</p>
          </a>
        </button>
        <button className={styles.main_title_btn2} onClick={resumeSimulation}>
          <a className={styles.navigation}>
            <p className={styles.main_btn_text}>Resume simulation</p>
          </a>
        </button>
        <button className={styles.main_title_btn2} onClick={stopSimulation}>
          <a className={styles.navigation}>
            <p className={styles.main_btn_text}>Stop information</p>
          </a>
        </button>
      </div>
      <div className={styles.ststus_show}>
        <h3 className={styles.main_caption}>Simulation status:</h3>
        <p>In Process</p>
      </div>
    </div>
  );
}

export default SimulationActions;
