import "./index.css";
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {NavBar} from './components/NavBar/NavBar.jsx'
import Parts from './components/Parts-Page/parts.jsx';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/parts" element={<Parts />} />
      </Routes>
    </Router>
  );
}

export default App;
