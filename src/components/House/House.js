import HouseFloor from "../HouseFloor/HouseFloor";
import styles from "./House.module.scss";

function House({ floors }) {
  return (
    <div className={styles.house}>
      {floors.map((floor, i) => (
        <HouseFloor key={i} />
      ))}
    </div>
  );
}

export default House;