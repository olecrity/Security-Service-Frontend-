import { useEffect } from "react";
import styles from "./Room.module.scss";
import { useRooms } from "../../../../../../contexts/RoomsContext";

function Room({ room, subdivisionSize, roomId }) {
  const roomHeight = (room.area / subdivisionSize) * 100;
  const { dispatch, currentRoom } = useRooms();

  useEffect(function () {
    const room = document.getElementById(`${roomId}`);
    room.style.height = `${roomHeight}%`;
    room.style.width = `100%`;
  }, []);

  function handleMouseEnter(e) {
    e.target.style.border = "5px solid black";
  }

  function handleMouseLeave(e) {
    e.target.style.border = "2px solid black";
  }
  function handleClick() {
    dispatch({ type: "roomSensors/shown", payload: roomId });
  }
  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      id={roomId}
      className={`${styles.room} ${
        room.sensors.reduce((acc, cur) =>
          cur.status === "active" ? true : false
        )
          ? styles.alarm
          : ""
      }`}
    ></div>
  );
}

export default Room;
