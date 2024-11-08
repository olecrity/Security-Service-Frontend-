import { useEffect, useState } from "react";
import styles from "./FloorSchema.module.scss";
import FloorSubdivision from "./FloorSubdivision/FloorSubdivision";
function FloorSchema() {
  const initialRooms = [
    {
      area: 10,
      id: 1,
      type: "kitchen",
      sensors: [
        { id: 11, type: "heat", status: "active" },
        { id: 12, type: "move", status: "inactive" },
        { id: 13, type: "move", status: "active" },
      ],
    },
    {
      area: 10,
      id: 2,
      type: "toilet",
      sensors: [
        { id: 21, type: "heat", status: "active" },
        { id: 22, type: "camera", status: "inactive" },
        { id: 23, type: "move", status: "active" },
      ],
    },
    {
      area: 20,
      id: 3,
      type: "corridor",
      sensors: [
        { id: 31, type: "heat", status: "active" },
        { id: 32, type: "move", status: "inactive" },
        { id: 33, type: "move", status: "inactive" },
        { id: 34, type: "move", status: "inactive" },
        { id: 35, type: "move", status: "inactive" },
        { id: 36, type: "move", status: "inactive" },
      ],
    },
    {
      area: 40,
      id: 4,
      type: "office",
      sensors: [
        { id: 41, type: "heat", status: "inactive" },
        { id: 42, type: "move", status: "inactive" },
        { id: 43, type: "move", status: "inactive" },
        { id: 44, type: "camera", status: "inactive" },
        { id: 45, type: "camera", status: "inactive" },
      ],
    },
    {
      area: 10,
      id: 5,
      type: "restingZone",
      sensors: [
        { id: 51, type: "heat", status: "active" },
        { id: 52, type: "move", status: "inactive" },
        { id: 53, type: "move", status: "active" },
      ],
    },
    {
      area: 10,
      id: 6,
      type: "meetingZone",
      sensors: [
        { id: 61, type: "heat", status: "active" },
        { id: 62, type: "move", status: "inactive" },
        { id: 63, type: "move", status: "active" },
      ],
    },
  ];
  const [rooms, setRooms] = useState(initialRooms);

  const [leftRooms, setLeftRooms] = useState([]);
  const [corridor, setCorridor] = useState([]);
  const [rightRooms, setRightRooms] = useState([]);
  const [floorHeight, setFloorHeight] = useState(0);

  useEffect(
    function () {
      let roomsChangable = [...rooms];
      const container = document.getElementById("container");
      setFloorHeight(container.getBoundingClientRect().width);
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
