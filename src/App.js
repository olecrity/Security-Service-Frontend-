import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import House from "./components/House/House";
import Homepage from "./pages/Homepage/Homepage";
import FloorPage from "./pages/FloorPage/FloorPage";
import Footer from "./components/Footer/Footer";
import AppNav from "./components/AppNav/AppNav";

import Git from "./components/Footer/GitHub";
import Guidance from "./components/Footer/Guide";
import Documentation from "./components/Footer/Documentation";

function App() {
  const [floors, setFloors] = useState([
    "floor",
    "floor",
    "floor",
    "floor",
    "floor",
  ]);
  return (
    <BrowserRouter>
      <AppNav></AppNav>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="house" element={<House floors={floors} />} />
        <Route path="floor" element={<FloorPage />} />
        <Route path="git" element={<Git />} />
        <Route path="guidance" element={<Guidance />} />
        <Route path="documentation" element={<Documentation />} />
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
