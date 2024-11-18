import styles from "./InAppSimulation.module.scss";

function InAppSimulation() {
  return (
    <div className={styles["simulation-container"]}>
      <div className={styles["simulation-btn-container"]}>
        <button className={styles.main_title_btn2}>
          <a className={styles.navigation}>
            <p>Start simulation</p>
          </a>
        </button>
        <button className={styles.main_title_btn2}>
          <a className={styles.navigation}>
            <p>Stop simulation</p>
          </a>
        </button>
        <button className={styles.main_title_btn2}>
          <a className={styles.navigation}>
            <p>Resume simulation</p>
          </a>
        </button>
        <button className={styles.main_title_btn2}>
          <a className={styles.navigation}>
            <p>Save information</p>
          </a>
        </button>
      </div>
      <div className={styles["simulation-status"]}>
        <h3 className={styles.main_caption}>Simulation status:</h3>
        <p className={styles["status"]}>In Process</p>
      </div>
    </div>
  );
}

export default InAppSimulation;
