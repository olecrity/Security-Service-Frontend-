import AppNav from "../AppNav/AppNav";
import HouseFloor from "./HouseFloor/HouseFloor.js";
import styles from "./House.module.scss";

function House({ floors }) {
  return (
    <>
      <AppNav />
      <div className={styles.house}>
        {floors.map((floor, i) => (
          <HouseFloor key={i} />
        ))}
      </div>
    </>
  );
}

export default House;
