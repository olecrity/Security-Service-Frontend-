import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import House from "./components/House/House";
import Homepage from "./pages/Homepage/Homepage";
import FloorPage from "./pages/FloorPage/FloorPage";
import Footer from "./components/Footer/Footer";
import AppNav from "./components/AppNav/AppNav";
import { BuildingProvider, useBuilding } from "./contexts/BuidingContext";

import Git from "./components/Footer/GitHub";
import Guidance from "./components/Footer/Guide";
import Documentation from "./components/Footer/Documentation";
import { AuthProvider } from "./contexts/AuthContext";

//to connect back part, please change the localhost in the URL in (AuthContext.js - 1 line and BuildingContext.js - 3 times)

function App() {
  const [floors, setFloors] = useState([
    "floor",
    "floor",
    "floor",
    "floor",
    "floor",
  ]);

  return (
    <AuthProvider>
      <BuildingProvider>
        <InnerApp /> 
      </BuildingProvider>
    </AuthProvider>
  );
}

function InnerApp() {
  const { stopSimulation, disconnectWebSocket } = useBuilding();

  useEffect(() => {
    const handleBeforeUnload = () => {
      stopSimulation(); // this is an alert stop, which will be used in case the page is reloaded while the simulation is still running
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [stopSimulation, disconnectWebSocket]);

  return (
    <BrowserRouter>
      <AppNav />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="house" element={<House />} />
        <Route path="floor" element={<FloorPage />} />
        <Route path="git" element={<Git />} />
        <Route path="guidance" element={<Guidance />} />
        <Route path="documentation" element={<Documentation />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
