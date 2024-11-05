import { useEffect, useState } from "react";
import styles from "./FloorSchema.module.scss";
function FloorSchema() {
  const initialRooms = [
    { area: 10 },
    { area: 10 },
    { area: 20, type: "corridor" },
    { area: 40 },
    { area: 10 },
    { area: 10 },
  ];
  const [rooms, setRooms] = useState(initialRooms);

  const [leftRooms, setLeftRooms] = useState([]);
  const [corridor, setCorridor] = useState([]);
  const [rightRooms, setRightRooms] = useState([]);

  useEffect(
    function () {
      let roomsChangable = [...rooms];
      const container = document.getElementById("container");
      console.log(container, container.getBoundingClientRect());

      setCorridor(roomsChangable.filter((room) => room.type === "corridor"));
      roomsChangable = roomsChangable.filter(
        (room) => room.type !== "corridor"
      );
      roomsChangable.sort((a, b) => (a.area > b.area ? -1 : 1));

      let tempLeft = [];
      let tempRight = [];
      roomsChangable.forEach((room) => {
        console.log(tempLeft.reduce((acc, cur) => acc + cur.area, 0));
        if (tempLeft.reduce((acc, cur) => acc + cur.area, 0) + room.area < 50) {
          tempLeft = [...tempLeft, room];
        } else {
          tempRight = [...tempRight, room];
        }
      });
      setLeftRooms(tempLeft);
      setRightRooms(tempRight);
    },
    [rooms]
  );
  return (
    <div id="container" className={styles["floor-outline"]}>
      <div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div>
        <div></div>
      </div>
      <div>
        <button
          onClick={() => {
            console.log(leftRooms);
            console.log(rightRooms);
            console.log(corridor);
          }}
        />
      </div>
    </div>
  );
}

export default FloorSchema;

// брати найбільшу кімнату крім коридора запихати її зліва, потім брати наступну, поки площа не стане >= 40 всі решта запхати в праву частину
