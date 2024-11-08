import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import House from "./components/House/House";
import Homepage from "./pages/Homepage/Homepage";
import FloorPage from "./pages/FloorPage/FloorPage";

function App() {
  const [floors, setFloors] = useState([
    "floor",
    "floor",
    "floor",
    "floor",
    "floor",
  ]);
  // return (
  //   <div className="app">
  //     <AppNav />
  //     <House floors={floors} />
  //   </div>
  // );
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="house" element={<House floors={floors} />} />
        <Route path="floor" element={<FloorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

//я переглянув і закомітив, напиши мені в тг пліз

export default App;
