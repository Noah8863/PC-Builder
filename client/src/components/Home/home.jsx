import React, { useEffect, useState } from "react";
import CPUImage from "../../images/cpu.jpg";
import GPUImage from "../../images/gpu.jpg";
import MotherboardImage from "../../images/motherboard.png";
import PowerSupplyImage from "../../images/psu.jpg";
import FanImage from "../../images/fans.jpg";
import RamImage from "../../images/ram.jpg";
import CaseImage from "../../images/case.jpg";
import PCImage3 from "../../images/custom-PC-3.jpg";
import "./style.css";

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

  const partCategories = {
    Motherboard: ["MB"],
    CPU: ["CPU"],
    GPU: ["GPU"],
    RAM: ["RAM"],
    FANS: ["FAN"],
    CASES: ["CASE"],
    POWERSUPPLY: ["POWER"],
  };

  const partCategorie = {
    Motherboard: ["MB"],
    CPU: ["CPU"],
    GPU: ["GPU"],
    RAM: ["RAM"],
    FANS: ["FAN"],
    CASES: ["CASE"],
    POWERSUPPLY: ["POWER"],
  };

  if (!dataLoaded) {
    return (
      <div className="text-superText flex justify-center items-center m-auto h-screen">
        Loading...
      </div>
    ); // Render a loading message until data is loaded
  }

  return (
    <main className="m-auto justify-center h-full relative">
    {/* Section 1 */}
    <header className="customBackground h-screen items-center justify-center pt-2 relative">
      <p className="text-2xl text-center">Welcome to the PC Builder community!</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:w-5/6 md:w-3/4 max-h-2 mx-auto ">
        <div className="bg-customBlue p-4 rounded-lg shadow-lg">
          <h2 className=" mb-2 md:text-3xl sm:text-2xl">Build Your Dream PC</h2>
          <p className="mb-4">
            Are you looking to build your own custom PC? Our PC-Builder project offers a wide range of high-quality PC components to help you create the perfect system tailored to your needs.
          </p>
          <p className="mb-4">
            From powerful CPUs and GPUs to reliable motherboards and memory modules, we have all the essential components you need to bring your dream PC to life.
          </p>
          <p className="mb-4">
            Explore our extensive collection and start building your PC today!
          </p>
          <a
            href="/signup"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg inline-block"
          >
            Sign Up Now
          </a>
        </div>
        <div className="bg-customBlue p-4 rounded-lg shadow-lg sm:mt-0 relative">
          <p className="md:text-3xl sm:text-2xl mb-2">Join the PC-Builder Community</p>
          <p className="mb-2">
            Building a PC is not just about the hardware; it's also about the community. Join our PC-Builder community and connect with fellow PC enthusiasts from around the world.
          </p>
          <p className="mb-2">
            Share your experiences, ask questions, and learn from others. Our community blog is the perfect place to discuss PC building tips, troubleshoot issues, and stay up-to-date with the latest trends.
          </p>
          <p className="mb-2">
            Whether you're a beginner or an experienced builder, our community is here to support you throughout your PC-building journey.
          </p>
          <a
            href="/signup"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg inline-block"
          >
            Join the Community
          </a>
        </div>
      </div>
    </header>

      {/* Section 2 */}
      <section className="w-5/6 justify-center item-center m-auto relative ">
        <div>
          <p className="text-xxl text-center lg:mt-28">Shop by Category</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 m-4 p-4">
            <button className="flex flex-col items-center justify-center bg-blue-500 text-white rounded-lg p-4 text-xl">
              <a href="/CPU">
                <img src={CPUImage} alt="CPU" className="max-w-40 max-h-40" />
              </a>
              CPUs
            </button>
            <button className="flex flex-col items-center justify-center bg-blue-500 text-white rounded-lg p-4 text-xl">
              <a href="/GPU">
                <img src={GPUImage} alt="GPU" className="max-w-40 max-h-40" />
              </a>
              GPUs
            </button>
            <button className="flex flex-col items-center justify-center bg-blue-500 text-white rounded-lg p-4 text-xl">
              <a href="/motherboards">
                <img
                  src={MotherboardImage}
                  alt="Motherboard"
                  className="max-w-40 max-h-40"
                />
              </a>
              Motherboards
            </button>
            <button className="flex flex-col items-center justify-center bg-blue-500 text-white rounded-lg p-4 text-xl">
              <a href="/RAM">
                <img src={RamImage} alt="RAM" className="max-w-40 max-h-40" />
              </a>
              RAM
            </button>
            <button className="flex flex-col items-center justify-center bg-blue-500 text-white rounded-lg p-4 text-xl">
              <a href="/Fans">
                <img src={FanImage} alt="Fan" className="max-w-40 max-h-40" />
              </a>
              Fans
            </button>
            <button className="flex flex-col items-center justify-center bg-blue-500 text-white rounded-lg p-4 text-xl">
              <a href="/PowerSupply">
                <img
                  src={PowerSupplyImage}
                  alt="Power Supply"
                  className="max-w-40 max-h-40"
                />
              </a>
              Power Supplies
            </button>
            <button className="flex flex-col items-center justify-center bg-blue-500 text-white rounded-lg p-4 text-xl">
              <a href="/Cases">
                <img src={CaseImage} alt="Case" className="max-w-40 max-h-40" />
              </a>
              Cases
            </button>
          </div>
        </div>
        {/* Section 3 */}

        <p className="text-2xl text-white text-center">
          Check out these hot deals across all categories!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-3">
          {Object.entries(partCategorie).map(([category, prefixes]) => {
            const cheapestItem = findCheapestItem(prefixes);
            return (
              <div
                key={category}
                className="grid p-6 bg-white m-4 items-center text-center text-xl justify-center"
              >
                <div className="grid bg-white">
                  <h3>{category}</h3>
                  <div className="p-4">
                    <img
                      src={cheapestItem.img}
                      alt={cheapestItem.title}
                      className="w-60 max-h-60 p-2 z-1"
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
          <p className="text-2xl text-white text-center">
            Looking to maximize the preformance of your PC? We got you covered!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-3">
            {Object.entries(partCategories).map(([category, prefixes]) => {
              const mostExpensiveItem = findMostExpensiveItem(prefixes);
              return (
                <div key={category} className=" grid">
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
      </section>
    </main>
  );
}

export default Home;
