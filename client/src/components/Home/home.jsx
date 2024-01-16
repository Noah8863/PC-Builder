import React, { useEffect, useState } from "react";
import CPUImage from "../../images/cpu.jpg";
import GPUImage from "../../images/gpu.jpg";
import MotherboardImage from "../../images/motherboard.png";
import PowerSupplyImage from "../../images/psu.jpg";
import FanImage from "../../images/fans.jpg";
import RamImage from "../../images/ram.jpg";
import CaseImage from "../../images/case.jpg";
import MonitorImage from "../../images/monitor.jpg";
import PCImage3 from "../../images/custom-PC-3.jpg";
import communityImage from "../../images/community.png";
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
          ...jsonResult.monitor,
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
    MONITOR: ["MONITOR"],
  };

  const partCategorie = {
    Motherboard: ["MB"],
    CPU: ["CPU"],
    GPU: ["GPU"],
    RAM: ["RAM"],
    FANS: ["FAN"],
    CASES: ["CASE"],
    POWERSUPPLY: ["POWER"],
    MONITOR: ["MONITOR"],
  };

  if (!dataLoaded) {
    return (
      <div className="text-superText flex justify-center items-center m-auto h-screen">
        Loading...
      </div>
    ); // Render a loading message until data is loaded
  }

  return (
    <main className="m-auto justify-center h-full relative customBackgroundColor">
      {/* Section 1 */}
      <header className="flex items-center customBackground h-screen pt-2 relative">
        <div className=" w-1/2 h-auto ml-10 mb-10">
          <div className="text-white p-4 rounded-lg">
            <h2 className=" mb-2 md:text-3xl sm:text-2xl">
              Build Your Dream PC
            </h2>
            <p className="mb-4">
              Are you looking to build your own custom PC? Our PC-Builder
              project offers a wide range of high-quality PC components to help
              you create the perfect system tailored to your needs.
            </p>
            <p className="mb-4">
              From powerful CPUs and GPUs to reliable motherboards and memory
              modules, we have all the essential components you need to bring
              your dream PC to life.
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
          {/* <div className="bg-customBlue p-4 rounded-lg shadow-lg sm:mt-0 relative">
            <p className="md:text-3xl sm:text-2xl mb-2">
              Join the PC-Builder Community
            </p>
            <p className="mb-2">
              Building a PC is not just about the hardware; it's also about the
              community. Join our PC-Builder community and connect with fellow
              PC enthusiasts from around the world.
            </p>
            <p className="mb-2">
              Share your experiences, ask questions, and learn from others. Our
              community blog is the perfect place to discuss PC building tips,
              troubleshoot issues, and stay up-to-date with the latest trends.
            </p>
            <p className="mb-2">
              Whether you're a beginner or an experienced builder, our community
              is here to support you throughout your PC-building journey.
            </p>
            <a
              href="/signup"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg inline-block"
            >
              Join the Community
            </a>
          </div> */}
        </div>
      </header>

      <section className="grid grid-cols-2 grid-rows-1 h-auto mx-20 mt-4">
        <div>
          <img
            src={communityImage}
            className="m-auto p-4 "
            alt="CommunityPicture"
          />
          <div className="relative bottom-10 left-28 w-16 h-16 bg-opacity-75 bg-blue-500 rounded-full "></div>
        </div>

        <div className="p-4 sm:mt-0 relative w-2/3">
          <div className=" mr-10 ">
            <p className="md:text-3xl sm:text-2xl mb-2 font-medium">
              Join the PC Builder Community
            </p>
            <div className="absolute top-0 right-1 w-24 h-24 bg-opacity-75 bg-blue-500 rounded-full "></div>

            <p className="mb-2">
              Building a PC is not just about the hardware; it's also about the
              community. Join our PC-Builder community and connect with fellow
              PC enthusiasts from around the world.
            </p>
            <p className="mb-2">
              Share your experiences, ask questions, and learn from others. Our
              community blog is the perfect place to discuss PC building tips,
              troubleshoot issues, and stay up-to-date with the latest trends.
            </p>
            <p className="mb-2">
              Whether you're a beginner or an experienced builder, our community
              is here to support you throughout your PC-building journey.
            </p>
            <a
              href="/signup"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg inline-block"
            >
              Join Now
            </a>
          </div>
        </div>
      </section>
      {/* Section 2 */}
      <section className="m-20">
        <p className="text-xxl font-medium text-center">Featured Categories</p>
        <div class="flex items-center justify-center">
          <div class="border-2 border-blue-400 w-1/6"></div>
        </div>
        <div className="w-5/6 my-8 grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 rows-1 gap-2 bg-400-blue justify-center item-center m-auto relative ">
          <button className="flex flex-col items-center justify-center bg-blue-500 text-white rounded-lg p-4 text-xl">
            <a href="/CPU">
              <img src={CPUImage} alt="CPU" className="max-w-42 max-h-40" />
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
          <button className="flex flex-col items-center justify-center bg-blue-500 text-white rounded-lg p-4 text-xl">
            <a href="/Monitor">
              <img
                src={MonitorImage}
                alt="Monitor"
                className="max-w-40 max-h-40"
              />
            </a>
            Monitor
          </button>
        </div>
      </section>
      {/* Section 3 */}
      <section className="m-20">
        <p className="text-xxl font-medium text-center">Hot Deals!</p>
        <div class="flex items-center justify-center">
          <div class="border-2 border-blue-400 w-1/6"></div>
        </div>

        <div className="w-5/6 my-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 rows-2 gap-2 justify-center item-center m-auto relative">
          {Object.entries(partCategorie).map(([category, prefixes]) => {
            const cheapestItem = findCheapestItem(prefixes);
            return (
              <div key={category} className="grid">
                <div className="grid bg-white m-4 items-center text-center text-xl justify-center">
                  
                  <img
                    src={cheapestItem.img}
                    alt={cheapestItem.title}
                    className="lg:w-60 sm:w-full z-1 justify-center flex"
                  />
                  <p className="text-sm text-blue-400 text-start">Brand: {cheapestItem.manufacturer}</p>
                  <div className="text-small h-auto">
                    <a href={cheapestItem.part}>
                      <p className="text-sm font-semibold text-left">{cheapestItem.title}</p>
                    </a>
                    <p className="text-sm text-left font-semibold text-red-500">Price: {cheapestItem.price}</p>
                    
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      {/* Section 4 */}
      <section className="m-20">
        <p className="text-xxl font-medium text-center">Max Preformance</p>
        <div class="flex items-center justify-center">
          <div class="border-2 border-blue-400 w-1/6"></div>
        </div>

        <div className="w-5/6 my-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 rows-2 gap-2 justify-center item-center m-auto relative">
          {Object.entries(partCategories).map(([category, prefixes]) => {
            const mostExpensiveItem = findMostExpensiveItem(prefixes);
            return (
              <div key={category} className=" grid">
                <div className="grid p-6 bg-white m-4 items-center text-center text-xl justify-center">
                  <img
                    src={mostExpensiveItem.img}
                    alt={mostExpensiveItem.title}
                    className="lg:w-60 sm:w-full z-1 justify-center flex"
                  />
                  <p className="text-sm text-blue-400 text-start">Brand: {mostExpensiveItem.manufacturer}</p>
                  <div className=" text-small h-auto">
                    <a href={mostExpensiveItem.part}>
                      <p className="text-sm font-semibold text-left">
                        {mostExpensiveItem.title}
                      </p>
                    </a>
                    <p className="text-lg text-left font-semibold text-red-500">Price: {mostExpensiveItem.price}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Home;
