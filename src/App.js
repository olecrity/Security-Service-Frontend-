import { useState } from "react";
import AppNav from "./components/AppNav/AppNav";
import House from "./components/House/House";

function App() {
  const [floors, setFloors] = useState([
    "floor",
    "floor",
    "floor",
    "floor",
    "floor",
  ]);
  return (
    <div className="app">
      <AppNav />
      <House floors={floors} />
    </div>
  );
}

export default App;
