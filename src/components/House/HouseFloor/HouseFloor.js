import styles from "./HouseFloor.module.scss";
function HouseFloor() {
  function handleMouseEnter(e) {
    console.log(e);
    e.target.style.border = "5px solid black";
  }

  function handleMouseLeave(e) {
    console.log(e);
    e.target.style.border = "2px solid black";
  }
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={styles["house-floor"]}
    ></div>
  );
}

export default HouseFloor;
