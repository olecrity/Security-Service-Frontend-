import { useRooms } from "../../../../contexts/RoomsContext";
import RoomSensor from "./RoomSensor/RoomSensor";
import styles from "./RoomSensors.module.scss";

function RoomSensors() {
  const { currentRoom } = useRooms();
  const sensors = currentRoom.sensors;
  return (
    <div className={styles["sensors-container"]}>
      <h3>List of sensors:</h3>
      {sensors.map((sensor) => (
        <RoomSensor sensor={sensor} key={sensor.id} />
      ))}
    </div>
  );
}

export default RoomSensors;
