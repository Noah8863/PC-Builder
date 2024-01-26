import React, { useState, useEffect } from "react";

function Ram() {
  const [ramParts, setRamParts] = useState([]);
  const [popUpMenu, setPopUpMenu] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  // Toggle dropdown setting

  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown((prevDropdown) =>
      prevDropdown === dropdownName ? null : dropdownName
    );
  };

  useEffect(() => {
    fetch("/RAM")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Error fetching parts data");
        }
      })
      .then((jsonResult) => {
        const ram = jsonResult.ram; // Flatten the arrays of parts
        setRamParts(ram);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const sortMax = () => {
    const sortedCases = [...ramParts].sort((a, b) => b.price - a.price);
    setRamParts(sortedCases);
  };

  const sortLeast = () => {
    const sortedCases = [...ramParts].sort((a, b) => a.price - b.price);
    setRamParts(sortedCases);
  };

  const sortAZ = () => {
    const sortedCases = [...ramParts].sort((a, b) =>
      a.manufacturer.localeCompare(b.manufacturer)
    );
    setRamParts(sortedCases);
  };

  const sortZA = () => {
    const sortedCases = [...ramParts].sort((a, b) =>
      b.manufacturer.localeCompare(a.manufacturer)
    );
    setRamParts(sortedCases);
  };

  const sortBlackFirst = () => {
    const sortedCases = [...ramParts].sort((a, b) =>
      a.color.localeCompare(b.color)
    );
    setRamParts(sortedCases);
  };

  const sortWhiteFirst = () => {
    const sortedCases = [...ramParts].sort((a, b) =>
      b.color.localeCompare(a.color)
    );
    setRamParts(sortedCases);
  };

  const sortSlowest = () => {
    const sortedCases = [...ramParts].sort((a, b) => a.speed - b.speed);
    setRamParts(sortedCases);
  };

  const sortFastest = () => {
    const sortedCases = [...ramParts].sort((a, b) => b.speed - a.speed);
    setRamParts(sortedCases);
  };

  const sortDDR4 = () => {
    const sortedRam = [...ramParts].sort((a, b) => {
      if (a.type === "DDR4" && b.type !== "DDR4") {
        return -1;
      } else if (a.type !== "DDR4" && b.type === "DDR4") {
        return 1;
      } else {
        return 0;
      }
    });
    setRamParts(sortedRam);
  };

  const sortDDR5 = () => {
    const sortedRam = [...ramParts].sort((a, b) => {
      if (a.type === "DDR5" && b.type !== "DDR5") {
        return -1;
      } else if (a.type !== "DDR5" && b.type === "DDR5") {
        return 1;
      } else {
        return 0;
      }
    });
    setRamParts(sortedRam);
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
        RAM Sticks
      </div>
      <div className="flex flex-col sm:flex-row ">
        <div className="w-90 sm:w-1/5 bg-gray-300 rounded-xl m-2 mt-4 h-1/3">
          <p className="text-xl text-left bg-blue-500 px-4 py-4 rounded-t-xl text-white">
            Filter By
          </p>

          {/* Price */}

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
                    className="block pl-2 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    onClick={sortMax}
                  >
                    Highest
                  </button>
                  <button
                    className="block pl-2 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    onClick={sortLeast}
                  >
                    Lowest
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Alphabetocal */}

          <div className="relative my-4 text-left z-3 px-4">
            <div>
              <button
                type="button"
                className="inline-flex justify-center items-center w-full px-4 py-2 text-xl text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-blue-400"
                onClick={() => toggleDropdown("alphabetical")}
              >
                Alphabetical
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
            {openDropdown === "alphabetical" && (
              <div className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white z-10 ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <button
                    className="block pl-2 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    onClick={sortAZ}
                  >
                    Sort: A - Z
                  </button>
                  <button
                    className="block pl-2 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    onClick={sortZA}
                  >
                    Sort: Z - A
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Color */}

          <div className="relative my-4 text-left z-3 px-4">
            <div>
              <button
                type="button"
                className="inline-flex justify-center items-center w-full px-4 py-2 text-xl text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-blue-400"
                onClick={() => toggleDropdown("color")}
              >
                Color
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
            {openDropdown === "color" && (
              <div className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white z-10 ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <button
                    className="block pl-2 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    onClick={sortBlackFirst}
                  >
                    Color: Black
                  </button>
                  <button
                    className="block pl-2 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    onClick={sortWhiteFirst}
                  >
                    Color: White
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mhz Speed */}

          <div className="relative my-4 text-left z-3 px-4">
            <div>
              <button
                type="button"
                className="inline-flex justify-center items-center w-full px-4 py-2 text-xl text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-blue-400"
                onClick={() => toggleDropdown("mhz")}
              >
                Mhz Speed
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
            {openDropdown === "mhz" && (
              <div className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white z-10 ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <button
                    className="block pl-2 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    onClick={sortSlowest}
                  >
                    Slowest Mhz
                  </button>
                  <button
                    className="block pl-2 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    onClick={sortFastest}
                  >
                    Fastest Mhz
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Color */}

          <div className="relative my-4 text-left z-3 px-4">
            <div>
              <button
                type="button"
                className="inline-flex justify-center items-center w-full px-4 py-2 text-xl text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-blue-400"
                onClick={() => toggleDropdown("type")}
              >
                Type of Format
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
            {openDropdown === "type" && (
              <div className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white z-10 ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <button
                    className="block px-12 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    onClick={sortDDR4}
                  >
                    DDR4
                  </button>
                  <button
                    className="block px-12 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    onClick={sortDDR5}
                  >
                    DDR5
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-full sm:w-4/5 bg-gray-300 m-4 z-1">
          <div className="bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ramParts.length > 0 &&
                ramParts.map((part, index) => (
                  <div key={index} className="relative">
                    <div className="flex flex-col items-center justify-cent z-1 w-full h-5/6">
                      <img
                        src={part.img}
                        alt={part.title}
                        className="w-60 h-auto p-2 z-1"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bg-gray-600 w-2/3 text-white p-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <p className="text-center">
                            Memory Configuration: {part.size}
                          </p>
                          <p className="text-center">
                            Max Memory Speed: {part.speed}
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

export default Ram;
