import { useEffect } from "react";
import styles from "./Room.module.scss";

function Room({ room, subdivisionSize, roomId }) {
  const roomHeight = (room.area / subdivisionSize) * 100;

  useEffect(function () {
    const room = document.getElementById(`${roomId}`);
    room.style.height = `${roomHeight}%`;
    room.style.width = `100%`;
  }, []);

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
      id={roomId}
      className={styles.room}
    ></div>
  );
}

export default Room;
