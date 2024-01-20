import React, { useState, useEffect } from "react";

function Motherboards() {
  const [parts, setParts] = useState([]);
  const [popUpMenu, setPopUpMenu] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  // Toggle dropdown setting

  const [isOpenPrice, setIsOpenPrice] = useState(false);

  const toggleDropdownPrice = () => {
    setIsOpenPrice(!isOpenPrice);
  };

  const [isOpenAlpha, setIsOpenAlpha] = useState(false);

  const toggleDropdownAlpha = () => {
    setIsOpenAlpha(!isOpenAlpha);
  };

  const [isOpenColor, setIsOpenColor] = useState(false);

  const toggleDropdownColor = () => {
    setIsOpenColor(!isOpenColor);
  };

  const [isOpenSize, setIsOpenSize] = useState(false);

  const toggleDropdownSize = () => {
    setIsOpenSize(!isOpenSize);
  };

  useEffect(() => {
    fetch("/motherboards")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Error fetching parts data");
        }
      })
      .then((jsonResult) => {
        const motherboards = jsonResult.motherboards; // Flatten the arrays of parts
        setParts(motherboards);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const sortMax = () => {
    const sortedParts = [...parts].sort((a, b) => b.price - a.price);
    setParts(sortedParts);
  };

  const sortLeast = () => {
    const sortedParts = [...parts].sort((a, b) => a.price - b.price);
    setParts(sortedParts);
  };

  const sortAZ = () => {
    const sortedParts = [...parts].sort((a, b) =>
      a.manufacturer.localeCompare(b.manufacturer)
    );
    setParts(sortedParts);
  };

  const sortZA = () => {
    const sortedParts = [...parts].sort((a, b) =>
      b.manufacturer.localeCompare(a.manufacturer)
    );
    setParts(sortedParts);
  };

  const sortBlackFirst = () => {
    const sortedParts = [...parts].sort((a, b) =>
      a.color.localeCompare(b.color)
    );
    setParts(sortedParts);
  };

  const sortWhiteFirst = () => {
    const sortedParts = [...parts].sort((a, b) =>
      b.color.localeCompare(a.color)
    );
    setParts(sortedParts);
  };

  const sortATXFirst = () => {
    const sortedParts = [...parts].sort((a, b) => a.size.localeCompare(b.size));
    setParts(sortedParts);
  };

  const sortMiniATXFirst = () => {
    const sortedParts = [...parts].sort((a, b) => b.size.localeCompare(a.size));
    setParts(sortedParts);
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
        MotherBoards
      </div>
      <div className="flex flex-col sm:flex-row ">
        <div className="w-90 sm:w-1/5 bg-gray-300 rounded-xl m-2 mt-4 h-1/3">
          <p className="text-xl text-left bg-blue-500 px-4 py-4 rounded-t-xl text-white">Filter By</p>

          {/* Price */}

          <div className="relative my-4 text-left z-3 px-4">
            <div>
              <button
                type="button"
                className="inline-flex justify-center items-center w-full px-4 py-2 text-xl text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-blue-400"
                onClick={toggleDropdownPrice}
              >
                {selectedOption ? selectedOption : "Price"}
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
            {isOpenPrice && (
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

          {/* Alphabetocal */}

          <div className="relative my-4 text-left z-3 px-4">
            <div>
              <button
                type="button"
                className="inline-flex justify-center items-center w-full px-4 py-2 text-xl text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-blue-400"
                onClick={toggleDropdownAlpha}
              >
                {selectedOption ? selectedOption : "Alphabetical"}
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
            {isOpenAlpha && (
              <div className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white z-10 ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <button
                    className="block px-12 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    onClick={sortAZ}
                  >
                    Sort: A - Z
                  </button>
                  <button
                    className="block px-12 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
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
                onClick={toggleDropdownColor}
              >
                {selectedOption ? selectedOption : "Color"}
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
            {isOpenColor && (
              <div className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white z-10 ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <button
                    className="block px-12 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    onClick={sortBlackFirst}
                  >
                    Color: Black
                  </button>
                  <button
                    className="block px-12 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    onClick={sortWhiteFirst}
                  >
                    Color: White
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Size */}

          <div className="relative my-4 text-left z-3 px-4">
            <div>
              <button
                type="button"
                className="inline-flex justify-center items-center w-full px-4 py-2 text-xl text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-blue-400"
                onClick={toggleDropdownSize}
              >
                {selectedOption ? selectedOption : "Size"}
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
            {isOpenSize && (
              <div className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white z-10 ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <button
                    className="block px-12 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    onClick={sortATXFirst}
                  >
                    ATX
                  </button>
                  <button
                    className="block px-12 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    onClick={sortMiniATXFirst}
                  >
                    Mini-ATX
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-full sm:w-4/5 bg-gray-300 m-4 z-1">
          <div className="bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {parts.length > 0 &&
                parts.map((part, index) => (
                  <div key={index} className="relative">
                    <div className="flex flex-col items-center justify-cent z-1">
                      <img
                        src={part.img}
                        alt={part.title}
                        className="w-80 h-auto p-2 z-1"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bg-gray-600 w-2/3 text-white p-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <p className="text-center">Color: {part.color}</p>
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
                      <p>Price: ${part.price}</p>
                      <p>Manufacture: {part.manufacturer}</p>
                      <p>Model: {part.model}</p>
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

export default Motherboards;
