import HouseFloor from "./HouseFloor/HouseFloor.js";
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
          <h3 className={styles.main_caption}>Create building structure</h3>
          <div className={styles.create_table}>
            <div className={styles.table_section}>
              <table id={styles.floors_table}>
                <tr>
                <th scope="col" className={styles.caption}>Floor type</th>
                <th scope="col" className={styles.floor_cancel}>Remove</th>
                </tr>
                <tbody id={styles.table_body}>

                </tbody>
              </table>
            </div>
            <div className={styles.buttons_section}>
              <button className={styles.main_title_btn}>
                  <a className={styles.navigation}>
                      <p>Add T1 foor</p>
                  </a>
              </button>
              <button className={styles.main_title_btn}>
                  <a className={styles.navigation}>
                      <p>Add T2 foor</p>
                  </a>
              </button>
              <button id={styles.submit_struct_btn} className={styles.main_title_btn}>
                  <a className={styles.navigation}>
                      <p>Submit structure</p>
                  </a>
              </button>
            </div>
          </div>

          <div className={styles.lower_section}>
            <div className={styles.button_section2}>
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
            <div className={styles.ststus_show}>
              <h3 className={styles.main_caption}>Simulation status:</h3>
              <p>In Process</p>
            </div>
          </div>
          

        </div>
    </div>
  );
}

export default House;
