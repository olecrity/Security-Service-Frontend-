import React, { useState } from "react";
import styles from "./HouseFloor.module.scss";
import { useBuilding } from "../../../contexts/BuidingContext";
import { useNavigate } from "react-router-dom";

function HouseFloor({ floor }) {
  const { dispatch } = useBuilding();
  const navigate = useNavigate();

  function handleClick() {
    dispatch({ type: "rooms/shown", payload: floor.id });
    navigate("/floor");
  }
  return (
    <div
      onClick={handleClick}
      className={`${styles["house-floor"]} 
      
      `}
    >
      {[1, 2, 3, 4].map((_, index) => (
        <div key={index} className={styles.sensor}>
          <div
            className={`${styles.decoration} ${styles[`color-${index + 1}`]}`}
          ></div>
          <p
            className={`${styles.sensors_amount} ${
              styles[`type-${index + 1}`]
            }`}
          >
            {index + 1}
          </p>
        </div>
      ))}
    </div>
  );
}

export default HouseFloor;
