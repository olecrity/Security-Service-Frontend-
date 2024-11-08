import { useEffect, useState } from "react";
import styles from "./FloorSchema.module.scss";
import FloorSubdivision from "./FloorSubdivision/FloorSubdivision";
import { useRooms } from "../../../../contexts/RoomsContext";
function FloorSchema() {
  const { rooms } = useRooms();

  const [leftRooms, setLeftRooms] = useState([]);
  const [corridor, setCorridor] = useState([]);
  const [rightRooms, setRightRooms] = useState([]);
  const [floorHeight, setFloorHeight] = useState(0);

  useEffect(
    function () {
      const container = document.getElementById("container");
      setFloorHeight(container.getBoundingClientRect().width);
      console.log(container, container.getBoundingClientRect());

      setCorridor(rooms.filter((room) => room.type === "corridor"));

      const roomsSorted = rooms.toSorted((a, b) => (a.area > b.area ? -1 : 1));

      let tempLeft = [];
      let tempRight = [];
      rooms.forEach((room) => {
        console.log(tempLeft.reduce((acc, cur) => acc + cur.area, 0));
        if (room.type === "corridor") {
        } else if (
          tempLeft.reduce((acc, cur) => acc + cur.area, 0) + room.area <
          50
        ) {
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
      <FloorSubdivision
        rooms={leftRooms}
        id={123456789}
        floorHeight={floorHeight}
      />
      <FloorSubdivision
        rooms={corridor}
        id={23456789}
        floorHeight={floorHeight}
      />
      <FloorSubdivision
        rooms={rightRooms}
        id={3456789}
        floorHeight={floorHeight}
      />
    </div>
  );
}

export default FloorSchema;

// брати найбільшу кімнату крім коридора запихати її зліва, потім брати наступну, поки площа не стане >= 40 всі решта запхати в праву частину
