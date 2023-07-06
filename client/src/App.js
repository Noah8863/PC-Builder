import "./index.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar/NavBar.jsx";
import Motherboards from "./components/Motherboard-Page/motherboard.jsx";
import CPU from "./components/CPU-Page/cpu.jsx";
import Home from "./components/Home/home.jsx";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/motherboards" element={<Motherboards />} />
        <Route path="/CPU" element={<CPU />} />
      </Routes>
    </Router>
  );
}

export default App;
