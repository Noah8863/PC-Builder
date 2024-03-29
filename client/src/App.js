import React, { useState, useEffect } from "react";
import "./index.css";
import DataContext from "./context.js"
import data from "./data/parts.JSON"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar/NavBar.jsx";
import Footer from "./components/Footer/footer.jsx";
import Motherboards from "./components/Motherboard-Page/motherboard.jsx";
import CPU from "./components/CPU-Page/cpu.jsx";
import GPU from "./components/GPU-Page/gpu.jsx";
import RAM from "./components/Ram-Page/ram.jsx";
import Cases from "./components/Cases-Page/cases.jsx";
import Fans from "./components/Fans-Page/fans.jsx";
import PowerSupply from "./components/PowerSupply-Page/power.jsx";
import Home from "./components/Home/home.jsx";
import Login from "./components/login/login.jsx";
import SignUp from "./components/signup/signup.jsx";
import BlogPage from "./components/Blog-Page/blog.jsx";
import AccountPage from "./components/Account-page/account.jsx";
import MonitorPage from "./components/Monitor-Page/monitor.jsx";
import Reset from "./components/Reset/reset.jsx";

function App() {
  
  const [pcParts, setPcParts] = useState([])

  useEffect(() => {
    setPcParts(data);
  }, []);

  const appData = { pcParts }

  return (
    <Router>
      <DataContext.Provider value={ appData }>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/motherboards" element={<Motherboards />} />
        <Route path="/CPU" element={<CPU />} />
        <Route path="/GPU" element={<GPU />} />
        <Route path="/RAM" element={<RAM />} />
        <Route path="/Cases" element={<Cases />} />
        <Route path="/Fans" element={<Fans />} />
        <Route path="/PowerSupply" element={<PowerSupply />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Blog" element={<BlogPage />} />
        <Route path="/Account" element={<AccountPage />} />
        <Route path="/Monitor" element={<MonitorPage />} />
        <Route path="/Reset" element={<Reset />} />
        
      </Routes>
      <Footer />
      </DataContext.Provider>
    </Router>
  );
}

//Passing props from app to components
// const App = () => (
//   <>
//     <h1>Online Store</h1>
//     <Product name="Green iguana" price={579} />
//   </>
// );


// Child Component (Product)
// const Product = (props) => (
//   <>
//     <p>Product name: {props.name}</p>
//     <p>Price: ${props.price}</p>
//   </>
// );



export default App;
