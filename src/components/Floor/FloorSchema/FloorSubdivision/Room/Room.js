import { useEffect } from "react";
import styles from "./Room.module.scss";
import { useBuilding } from "../../../../../contexts/BuidingContext";

function Room({ room, subdivisionSize, roomId }) {
  const roomHeight = (room.area / subdivisionSize) * 100;
  const { dispatch } = useBuilding();

  useEffect(
    function () {
      const room = document.getElementById(`${roomId}`);
      room.style.height = `${roomHeight}%`;
      room.style.width = `100%`;
    },
    [roomHeight, roomId]
  );

  function handleClick() {
    dispatch({ type: "room/sensors/shown", payload: roomId });
  }
  return (
    <div
      onClick={handleClick}
      id={roomId}
      className={`${styles.room} ${
        room.sensors.reduce(
          (acc, cur) =>
            (cur.status === "active" ? true : false) ? acc + 1 : acc,
          0
        ) > 0
          ? styles.alarm
          : ""
      }`}
    ></div>
  );
}

export default Room;
