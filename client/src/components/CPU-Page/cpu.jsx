import React, { useState, useEffect } from "react";

function CPU() {
  const [cpuParts, setCpuParts] = useState([]);
  const [popUpMenu, setPopUpMenu] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  //Makes sure that one dropdown menu is active
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown((prevDropdown) => (prevDropdown === dropdownName ? null : dropdownName));
  };


  useEffect(() => {
    fetch("/CPU")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Error fetching parts data");
        }
      })
      .then((jsonResult) => {
        const cpus = jsonResult.cpus; // Flatten the arrays of parts
        setCpuParts(cpus);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const sortMax = () => {
    const sortedParts = [...cpuParts].sort((a, b) => b.price - a.price);
    setCpuParts(sortedParts);
  };

  const sortLeast = () => {
    const sortedParts = [...cpuParts].sort((a, b) => a.price - b.price);
    setCpuParts(sortedParts);
  };

  const sortAMD = () => {
    const sortedParts = [...cpuParts].sort((a, b) =>
      a.manufacturer.localeCompare(b.manufacturer)
    );
    setCpuParts(sortedParts);
  };

  const sortIntel = () => {
    const sortedParts = [...cpuParts].sort((a, b) =>
      b.manufacturer.localeCompare(a.manufacturer)
    );
    setCpuParts(sortedParts);
  };

  const sortAM4 = () => {
    const sortedParts = [...cpuParts].sort((a, b) =>
      a.socket.localeCompare(b.socket)
    );
    setCpuParts(sortedParts);
  };

  const sortMaxThreads = () => {
    const sortedParts = [...cpuParts].sort((a, b) => b.threads - a.threads);
    setCpuParts(sortedParts);
  };

  const sortMinimalThreads = () => {
    const sortedParts = [...cpuParts].sort((a, b) => a.threads - b.threads);
    setCpuParts(sortedParts);
  };

  const sortMaxCores = () => {
    const sortedParts = [...cpuParts].sort((a, b) => b.core - a.core);
    setCpuParts(sortedParts);
  };

  const sortMinimalCores = () => {
    const sortedParts = [...cpuParts].sort((a, b) => a.core - b.core);
    setCpuParts(sortedParts);
  };

  const addItemToList = (itemId) => {
    setPopUpMenu(!popUpMenu);
    console.log("Item ID:", itemId);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const openListMenu = () => {
    setPopUpMenu(!popUpMenu);
  };

  return (
    <main className="z-1">
      <div className=" text-center text-2xl font-medium h-32 bg-gray-300 pt-10">
        Central Processing Unit
      </div>
      <div className="flex flex-col sm:flex-row ">
        <div className="w-90 sm:w-1/5 bg-gray-300 rounded-xl m-2 mt-4 h-1/3">
          <p className="text-xl text-left bg-blue-500 px-4 py-4 rounded-t-xl text-white">
            Filter By
          </p>

          {/* Price Dropdown */}
          <div className="relative my-4 text-left z-3 px-4">
            <div>
              <button
                type="button"
                className="inline-flex justify-center items-center w-full px-4 py-2 text-xl text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-blue-400"
                onClick={() => toggleDropdown("price")}
              >
                Price
                <svg
                  className="-mr-1 ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M6 8l4 4 4-4H6z" />
                </svg>
              </button>
            </div>
            {openDropdown === "price" && (
              <div className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white z-10 ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <button
                    className="block px-12 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    onClick={sortMax}
                  >
                    Highest
                  </button>
                  <button
                    className="block px-12 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    onClick={sortLeast}
                  >
                    Lowest
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Brand Dropdown */}
          <div className="relative my-4 text-left z-3 px-4">
            <div>
              <button
                type="button"
                className="inline-flex justify-center items-center w-full px-4 py-2 text-xl text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-blue-400"
                onClick={() => toggleDropdown("brand")}
              >
                Brand
                <svg
                  className="-mr-1 ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M6 8l4 4 4-4H6z" />
                </svg>
              </button>
            </div>
            {openDropdown === "brand" && (
              <div className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white z-10 ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <button
                    className="block px-12 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    onClick={sortAMD}
                  >
                    AMD
                  </button>
                  <button
                    className="block px-12 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    onClick={sortIntel}
                  >
                    Intel
                  </button>
                </div>
              </div>
            )}
          </div>

{/* Socket Type */}

          <div className="relative my-4 text-left z-3 px-4">
            <div>
              <button
                type="button"
                className="inline-flex justify-center items-center w-full px-4 py-2 text-xl text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-blue-400"
                onClick={() => toggleDropdown("socket")}
              >
                Socket
                <svg
                  className="-mr-1 ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M6 8l4 4 4-4H6z" />
                </svg>
              </button>
            </div>
            {openDropdown === "socket" && (
              <div className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white z-10 ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <button
                    className="block px-12 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    onClick={sortAM4}
                  >
                    AM4 Socket
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Thread Number */}

          <div className="relative my-4 text-left z-3 px-4">
            <div>
              <button
                type="button"
                className="inline-flex justify-center items-center w-full px-4 py-2 text-xl text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-blue-400"
                onClick={() => toggleDropdown("threads")}
              >
                Threads
                <svg
                  className="-mr-1 ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M6 8l4 4 4-4H6z" />
                </svg>
              </button>
            </div>
            {openDropdown === "threads" && (
              <div className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white z-10 ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <button
                    className="block px-12 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    onClick={sortMaxThreads}
                  >
                    Max Threads
                  </button>
                  <button
                    className="block px-12 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    onClick={sortMinimalThreads}
                  >
                    Minimal Threads
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Core Count */}

          <div className="relative my-4 text-left z-3 px-4">
            <div>
              <button
                type="button"
                className="inline-flex justify-center items-center w-full px-4 py-2 text-xl text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-blue-400"
                onClick={() => toggleDropdown("cores")}
              >
                Core Count
                <svg
                  className="-mr-1 ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M6 8l4 4 4-4H6z" />
                </svg>
              </button>
            </div>
            {openDropdown === "cores" && (
              <div className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white z-10 ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <button
                    className="block px-12 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    onClick={sortMaxCores}
                  >
                    Max Cores
                  </button>
                  <button
                    className="block px-12 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    onClick={sortMinimalCores}
                  >
                    Minimal Cores
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-full sm:w-4/5 bg-gray-300 m-4 z-1">
          <div className="bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
              {cpuParts.length > 0 &&
                cpuParts.map((part, index) => (
                  <div key={index} className="relative">
                    <div className="flex flex-col items-center text-left justify-center z-1">
                      <img
                        src={part.img}
                        alt={part.title}
                        className="w-60 h-auto p-2 z-1"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bg-gray-600 w-2/3 text-white p-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <p className="text-center">Cores: {part.core}</p>
                          <p className="text-center">Threads: {part.threads}</p>
                          <p className="text-center">
                            Socket Type: {part.socket}
                          </p>
                          <button
                            className="bg-blue-400 px-4 my-2 rounded-md flex items-center m-auto"
                            onClick={openListMenu}
                          >
                            Add to a build
                          </button>
                        </div>
                      </div>
                      <p className="text-blue-500">Price: ${part.price}</p>
                      <p className="font-medium text-xl text-left">Manufacture: {part.manufacturer}</p>
                      <p className="text-red-400 font-semibold">Model: {part.model}</p>
                    </div>
                    {popUpMenu && (
                      <div className="fixed inset-0 bg-gray-800 bg-opacity-20 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg lg:w-1/3 sm:w-2/3">
                          <h2 className="text-xl font-semibold mb-4">
                            Select a build
                          </h2>
                          <div className="mt-4">
                            <label
                              htmlFor="buildOptions"
                              className="block font-medium"
                            >
                              Current Builds:
                            </label>
                            <select
                              id="buildOptions"
                              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                              value={selectedOption}
                              onChange={handleOptionChange}
                            >
                              <option value="option1">Shopping List</option>
                              <option value="option2">Wish List</option>
                              <option value="option3">Current Set Up</option>
                            </select>
                            <button
                              className="bg-blue-400 p-2 mt-6 mb-2 rounded-md m-auto text-white"
                              onClick={() => addItemToList(part.id)}
                            >
                              Add to List
                            </button>
                          </div>
                          <button
                            className="mt-4 bg-red-500 text-white p-2 rounded-md"
                            onClick={addItemToList}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CPU;
