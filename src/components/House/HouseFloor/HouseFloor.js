import React, { useState } from "react";
import styles from "./HouseFloor.module.scss";

function HouseFloor() {
  const sensors = [1, 2, 3, 4]; 
  
  const [floorContent, setFloorContent] = useState(
    sensors.map((_, index) => (
      <div key={index} className={styles.sensor}>
        <div className={`${styles.decoration} ${styles[`color-${index + 1}`]}`}></div>
        <p className={`${styles.sensors_amount} ${styles[`type-${index + 1}`]}`}>
          {index + 1}
        </p>
      </div>
    ))
  );

  return <div className={styles["house-floor"]}>{floorContent}</div>;
}

export default HouseFloor;