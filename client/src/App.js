import "./index.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar/NavBar.jsx";
import Parts from "./components/Parts-Page/parts.jsx";
import Home from "./components/Home/home.jsx";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/motherboards" element={<Parts />} />
      </Routes>
    </Router>
  );
}

export default App;
