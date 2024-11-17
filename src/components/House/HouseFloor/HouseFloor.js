import React from "react";
import styles from "./HouseFloor.module.scss";


function HouseFloor() {
  return (
    <div
      className={styles["house-floor"]}
    >
     {[1, 2, 3, 4].map((_, index) => (
        <div key={index} className={styles.sensor}>
          <div className={`${styles.decoration} ${styles[`color-${index + 1}`]}`}></div>
          <p className={`${styles.sensors_amount} ${styles[`type-${index + 1}`]}`}>
            {index + 1}
          </p>
        </div>
      ))}
      
    </div>
  );
}

export default HouseFloor;
