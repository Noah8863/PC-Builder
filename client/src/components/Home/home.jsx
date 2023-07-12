import React, { useEffect, useState } from "react";
import CPUImage from "../../images/cpu.jpg";
import GPUImage from "../../images/gpu.jpg";
import MotherboardImage from "../../images/motherboard.png";
import PowerSupplyImage from "../../images/psu.jpg";
import FanImage from "../../images/fans.jpg";
import RamImage from "../../images/ram.jpg";
import CaseImage from "../../images/case.jpg";
import PCImage from "../../images/custom-PC.jpg";
import PCImage2 from "../../images/custom-PC-2.webp";
import PCImage3 from "../../images/custom-PC-3.jpg";


function Home() {
  const [allParts, setAllParts] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  

  useEffect(() => {
    fetch("/parts/")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Error fetching parts data");
        }
      })
      .then((jsonResult) => {
        const partList = [
          ...jsonResult.motherboards,
          ...jsonResult.cpus,
          ...jsonResult.gpus,
          ...jsonResult.ram,
          ...jsonResult.cases,
          ...jsonResult.fans,
          ...jsonResult.powerSupply,
        ];
        setAllParts(partList);
        setDataLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  

  const findMostExpensiveItem = (partCategory) => {
    const filteredParts = allParts.filter((part) =>
      partCategory.some((prefix) => part.id.startsWith(prefix))
    );
    if (filteredParts.length > 0) {
      const mostExpensiveItem = filteredParts.reduce(
        (maxPriceItem, currentItem) => {
          return currentItem.price > maxPriceItem.price
            ? currentItem
            : maxPriceItem;
        }
      );
      return mostExpensiveItem;
    }
    return null;
  };

  const partCategories = {
    Motherboard: ["MB"],
    CPU: ["CPU"],
    GPU: ["GPU"],
    RAM: ["RAM"],
    FANS: ["FAN"],
    CASES: ["CASE"],
    POWERSUPPLY: ["POWER"],
    // Add more categories as needed
  };

  const findCheapestItem = (partCategory) => {
    const filteredParts = allParts.filter((part) =>
      partCategory.some((prefix) => part.id.startsWith(prefix))
    );
    if (filteredParts.length > 0) {
      const cheapestItem = filteredParts.reduce((minPriceItem, currentItem) => {
        return currentItem.price < minPriceItem.price
          ? currentItem
          : minPriceItem;
      });
      return cheapestItem;
    }
    return null;
  };
  

  const partCategorie = {
    Motherboard: ["MB"],
    CPU: ["CPU"],
    GPU: ["GPU"],
    RAM: ["RAM"],
    FANS: ["FAN"],
    CASES: ["CASE"],
    POWERSUPPLY: ["POWER"],
    // Add more categories as needed
  };

  if (!dataLoaded) {
    return (
      <div className="text-superText flex justify-center items-center m-auto h-screen">
        Loading...
      </div>
    ); // Render a loading message until data is loaded
  }

  return (
    <main className="w-5/6 m-auto justify-center bg-gray-500 h-contain">
      <header>
        <div classaName="flex">
          <img className="w-4/6 flex m-auto p-4"src={PCImage3}></img>
        </div>
      </header>
    <div>
      <p className="text-2xl">Most Expensive Items</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-3">
        {Object.entries(partCategories).map(([category, prefixes]) => {
          const mostExpensiveItem = findMostExpensiveItem(prefixes);
          return (
            <div key={category} className="bg-blue-300 grid">
              <div className="grid p-6 bg-white m-4 items-center text-center text-xl justify-center">
                <h3>{category}</h3>
                <img
                  src={mostExpensiveItem.img}
                  alt={mostExpensiveItem.title}
                  className="w-60 max-h-60 p-2 z-1"
                />
                <p>Title: {mostExpensiveItem.title}</p>
                <p>Price: {mostExpensiveItem.price}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
      <p className="text-2xl">Cheapest Items</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-3">
        {Object.entries(partCategorie).map(([category, prefixes]) => {
          const cheapestItem = findCheapestItem(prefixes);
          return (
            <div
              key={category}
              className="grid p-6 bg-blue-300 m-4 items-center text-center text-xl justify-center rounded-lg"
            >
              <div className="grid bg-white">
                <h3>{category}</h3>
                <div className="p-4">
                  <img
                    src={cheapestItem.img}
                    alt={cheapestItem.title}
                    className="max-w-60 max-h-60"
                  />
                </div>
                <p>Title: {cheapestItem.title}</p>
                <p>Price: {cheapestItem.price}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <p className="text-xxl text-center">Shop by Category</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 m-4 p-4">
          <button className="flex flex-col items-center justify-center bg-blue-500 text-white rounded-lg p-4 text-xl">
            <a href="/CPU"><img src={CPUImage} alt="CPU" className="max-w-40 max-h-40" /></a>
            CPUs
          </button>
          <button className="flex flex-col items-center justify-center bg-blue-500 text-white rounded-lg p-4 text-xl">
          <a href="/GPU"><img src={GPUImage} alt="GPU" className="max-w-40 max-h-40" /></a>
            GPUs
          </button>
          <button className="flex flex-col items-center justify-center bg-blue-500 text-white rounded-lg p-4 text-xl">
            <a href="/motherboards"><img
              src={MotherboardImage}
              alt="Motherboard"
              className="max-w-40 max-h-40"
            /></a>
            Motherboards
          </button>
          <button className="flex flex-col items-center justify-center bg-blue-500 text-white rounded-lg p-4 text-xl">
            <a href="/RAM"><img src={RamImage} alt="RAM" className="max-w-40 max-h-40" /></a>
            RAM
          </button>
          <button className="flex flex-col items-center justify-center bg-blue-500 text-white rounded-lg p-4 text-xl">
            <a href="/Fans"><img src={FanImage} alt="Fan" className="max-w-40 max-h-40" /></a>
            Fans
          </button>
          <button className="flex flex-col items-center justify-center bg-blue-500 text-white rounded-lg p-4 text-xl">
            <a href="/PowerSupply"><img
              src={PowerSupplyImage}
              alt="Power Supply"
              className="max-w-40 max-h-40"
            /></a>
            Power Supplies
          </button>
          <button className="flex flex-col items-center justify-center bg-blue-500 text-white rounded-lg p-4 text-xl">
            <a href="/Cases"><img src={CaseImage} alt="Case" className="max-w-40 max-h-40" /></a>
            Cases
          </button>
        </div>
      </div>
    </main>  
  );
}

export default Home;
