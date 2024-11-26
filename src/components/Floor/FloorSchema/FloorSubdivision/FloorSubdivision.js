import { useEffect } from "react";
import Room from "./Room/Room";

function FloorSubdivision({ rooms, id, floorHeight }) {
  const size = rooms.reduce((acc, cur) => acc + cur.area, 0);

  useEffect(
    function () {
      const subdivision = document.getElementById(`${id}`);
      subdivision.style.width = `${size}%`;
    },
    [size, id]
  );
  return (
    <div id={id}>
      {rooms.map((room) => (
        <Room
          room={room}
          subdivisionSize={size}
          key={room.ID}
          roomId={room.ID}
        />
      ))}
    </div>
  );
}

export default FloorSubdivision;
