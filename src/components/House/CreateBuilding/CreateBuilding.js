import React from "react";
import styles from "./CreateBuilding.module.scss";


function CreateBuilding() {
  return (
    <div>
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
                        <p className={styles.main_btn_text}>Add T1 foor</p>
                    </a>
                </button>
                <button className={styles.main_title_btn}>
                    <a className={styles.navigation}>
                        <p className={styles.main_btn_text}>Add T2 foor</p>
                    </a>
                </button>
                <button className={styles.main_title_btn}>
                    <a className={styles.navigation}>
                        <p className={styles.main_btn_text}>Add T3 foor</p>
                    </a>
                </button>
                <button id={styles.submit_struct_btn} className={styles.main_title_btn}>
                    <a className={styles.navigation}>
                        <p className={styles.main_btn_text}>Submit structure</p>
                    </a>
                </button>
            </div>
        </div>
      
    </div>
  );
}

export default CreateBuilding;
