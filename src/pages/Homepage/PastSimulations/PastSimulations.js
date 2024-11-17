import styles from "./PastSimulations.module.scss";

function PastSimulations() {
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
          <button className={styles.main_title_btn2}>
              <a className={styles.navigation}>
                  <p className={styles.main_btn_text}>Resume simulation</p>
              </a>
          </button>
          <div className={styles.button_section3}>
            <button className={styles.main_title_btn2}>
              <a className={styles.navigation}>
                  <p className={styles.main_btn_text}>Continute to simulation</p>
              </a>
            </button>
          </div>
        </div>
      </div>
    );
}

export default PastSimulations;