import { useEffect, useState } from "react";
import styles from "./FloorSchema.module.scss";
import FloorSubdivision from "./FloorSubdivision/FloorSubdivision";
import { useBuilding } from "../../../contexts/BuidingContext";
function FloorSchema() {
  const { currentFloor } = useBuilding();

  const [leftRooms, setLeftRooms] = useState([]);
  const [corridor, setCorridor] = useState([]);
  const [rightRooms, setRightRooms] = useState([]);
  const [floorHeight, setFloorHeight] = useState(0);

  useEffect(
    function () {
      const container = document.getElementById("container");
      setFloorHeight(container.getBoundingClientRect().width);
      setCorridor(
        currentFloor.rooms.filter((room) => room.type === "corridor")
      );
      let tempLeft = [];
      let tempRight = [];
      currentFloor.rooms.forEach((room) => {
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
    [currentFloor.rooms]
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
