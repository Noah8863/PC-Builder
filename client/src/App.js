import "./index.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar/NavBar.jsx";
import Motherboards from "./components/Motherboard-Page/motherboard.jsx";
import CPU from "./components/CPU-Page/cpu.jsx";
import GPU from "./components/GPU-Page/gpu.jsx";
import RAM from "./components/Ram-Page/ram.jsx";
import Cases from "./components/Cases-Page/cases.jsx";
import Fans from "./components/Fans-Page/fans.jsx";
import WaterCoolingAccessories from "./components/WaterCA-Page/water.jsx";
import Home from "./components/Home/home.jsx";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/motherboards" element={<Motherboards />} />
        <Route path="/CPU" element={<CPU />} />
        <Route path="/GPU" element={<GPU />} />
        <Route path="/RAM" element={<RAM />} />
        <Route path="/Cases" element={<Cases />} />
        <Route path="/Fans" element={<Fans />} />
        <Route path="/Water-Cooling-Accessories" element={<WaterCoolingAccessories />} />
      </Routes>
    </Router>
  );
}

export default App;
