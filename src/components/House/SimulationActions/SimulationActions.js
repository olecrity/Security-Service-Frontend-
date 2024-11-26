import React from "react";
import styles from "./SimulationActions.module.scss";
import { useBuilding } from "../../../contexts/BuidingContext";

function SimulationActions() {
  const { floors, dispatch } = useBuilding();
  return (
    <div className={styles.lower_section}>
      <div className={styles.button_section2}>
        <button
          className={styles.main_title_btn2}
          onClick={async () => {
            const sensorsArray = [];
            floors.forEach((floor) =>
              floor.rooms.forEach((room) =>
                room.sensors.forEach((sensor) => sensorsArray.push(sensor.ID))
              )
            );
            console.log(sensorsArray);
            for (let i = 0; i < 10; i++) {
              const randomIndex = Math.floor(
                Math.random() * sensorsArray.length
              );

              const randomElement = sensorsArray[randomIndex];
              setTimeout(
                () =>
                  dispatch({
                    type: "room/sensor/activate",
                    payload: randomElement,
                  }),
                (i + 1) * 5000
              );

              console.log(randomElement);
            }
          }}
        >
          <a className={styles.navigation}>
            <p className={styles.main_btn_text}>Start simulation</p>
          </a>
        </button>
        <button className={styles.main_title_btn2}>
          <a className={styles.navigation}>
            <p className={styles.main_btn_text}>Stop simulation</p>
          </a>
        </button>
        <button className={styles.main_title_btn2}>
          <a className={styles.navigation}>
            <p className={styles.main_btn_text}>Resume simulation</p>
          </a>
        </button>
        <button className={styles.main_title_btn2}>
          <a className={styles.navigation}>
            <p className={styles.main_btn_text}>Save information</p>
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
