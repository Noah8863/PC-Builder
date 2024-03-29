import React, { useState, useEffect } from "react";

function Monitor() {
  const [monitorParts, setMonitorParts] = useState([]);
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
    fetch("/Monitor")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Error fetching parts data");
        }
      })
      .then((jsonResult) => {
        const monitor = jsonResult.monitor; // Flatten the arrays of parts
        setMonitorParts(monitor);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const sortMax = () => {
    const sortedParts = [...monitorParts].sort((a, b) => b.price - a.price);
    setMonitorParts(sortedParts);
  };

  const sortLeast = () => {
    const sortedParts = [...monitorParts].sort((a, b) => a.price - b.price);
    setMonitorParts(sortedParts);
  };

  const sortAZ = () => {
    const sortedParts = [...monitorParts].sort((a, b) =>
      a.manufacturer.localeCompare(b.manufacturer)
    );
    setMonitorParts(sortedParts);
  };

  const sortZA = () => {
    const sortedParts = [...monitorParts].sort((a, b) =>
      b.manufacturer.localeCompare(a.manufacturer)
    );
    setMonitorParts(sortedParts);
  };

  const sortLargestSize = () => {
    const sortedParts = [...monitorParts].sort(
      (a, b) => parseInt(b.size) - parseInt(a.size)
    );
    setMonitorParts(sortedParts);
  };

  const sortSmallestSize = () => {
    const sortedParts = [...monitorParts].sort(
      (a, b) => parseInt(a.size) - parseInt(b.size)
    );
    setMonitorParts(sortedParts);
  };

  const sort240 = () => {
    const sortedParts = [...monitorParts].sort((a, b) => {
      if (a.hz === "240hz" && b.hz !== "240hz") {
        return -1;
      } else if (a.hz !== "240hz" && b.hz === "240hz") {
        return 1;
      } else {
        return 0;
      }
    });
    setMonitorParts(sortedParts);
  };

  const sort165 = () => {
    const sortedParts = [...monitorParts].sort((a, b) => {
      if (a.hz === "165hz" && b.hz !== "165hz") {
        return -1;
      } else if (a.hz !== "165hz" && b.hz === "165hz") {
        return 1;
      } else {
        return 0;
      }
    });
    setMonitorParts(sortedParts);
  };

  const sort144 = () => {
    const sortedParts = [...monitorParts].sort((a, b) => {
      if (a.hz === "144hz" && b.hz !== "144hz") {
        return -1;
      } else if (a.hz !== "144hz" && b.hz === "144hz") {
        return 1;
      } else {
        return 0;
      }
    });
    setMonitorParts(sortedParts);
  };

  const sort75 = () => {
    const sortedParts = [...monitorParts].sort((a, b) => {
      if (a.hz === "75hz" && b.hz !== "75hz") {
        return -1;
      } else if (a.hz !== "75hz" && b.hz === "75hz") {
        return 1;
      } else {
        return 0;
      }
    });
    setMonitorParts(sortedParts);
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
      <div className="text-center text-2xl font-medium h-32 bg-gray-300 pt-10">
        Monitors
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

          {/* Screen Size */}

          <div className="relative my-4 text-left z-3 px-4">
            <div>
              <button
                type="button"
                className="inline-flex justify-center items-center w-full px-4 py-2 text-xl text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-blue-400"
                onClick={() => toggleDropdown("size")}
              >
                Screen Size
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
            {openDropdown === "size" && (
              <div className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white z-10 ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <button
                    className="block pl-2 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    onClick={sortSmallestSize}
                  >
                    Smallest Size
                  </button>
                  <button
                    className="block pl-2 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    onClick={sortLargestSize}
                  >
                    Largest Size
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Refresh Rate */}

          <div className="relative my-4 text-left z-3 px-4">
            <div>
              <button
                type="button"
                className="inline-flex justify-center items-center w-full px-4 py-2 text-xl text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-blue-400"
                onClick={() => toggleDropdown("refresh")}
              >
                Refresh Rate
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
            {openDropdown === "refresh" && (
              <div className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white z-10 ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <button
                    className="block pl-2 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    onClick={sort240}
                  >
                    240hz
                  </button>
                  <button
                    className="block pl-2 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    onClick={sort165}
                  >
                    165hz
                  </button>
                  <button
                    className="block pl-2 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    onClick={sort144}
                  >
                    144hz
                  </button>
                  <button
                    className="block pl-2 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    onClick={sort75}
                  >
                    75hz
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-full sm:w-4/5 bg-gray-300 m-4 z-1">
          <div className="bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {monitorParts.length > 0 &&
                monitorParts.map((part, index) => (
                  <div key={index} className="relative">
                    <div className="flex flex-col items-center justify-cent z-1">
                      <img
                        src={part.img}
                        alt={part.title}
                        className="w-80 h-auto p-2 z-1"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bg-gray-600 w-2/3 text-white p-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <p className="text-center">Refresh Rate: {part.hz}</p>
                          <p className="text-center">
                            Screen Size: {part.size}
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

export default Monitor;
