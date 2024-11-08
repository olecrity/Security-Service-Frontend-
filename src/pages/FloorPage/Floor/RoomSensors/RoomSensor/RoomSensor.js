function RoomSensor({ sensor }) {
  return (
    <div>
      <label>ID: {sensor.id} </label>
      <label>{sensor.type} </label>
      <label>{sensor.status} </label>
      <button>Deactivate</button>
    </div>
  );
}

export default RoomSensor;
