import React, {useState, useEffect} from 'react';

//TODO: Figure out master function?? Pass in children for the sorting alg

function PowerSuppply() {
  const [powerParts, setPowerParts] = useState([]);
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
    fetch('/PowerSupply')
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Error fetching parts data');
        }
      })
      .then((jsonResult) => { 
        const powerSupply = jsonResult.powerSupply // Flatten the arrays of parts
        setPowerParts(powerSupply);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const sortMax = () => {
    const sortedParts = [...powerParts].sort((a, b) => b.price - a.price);
    setPowerParts(sortedParts);
  };

  const sortLeast = () => {
    const sortedParts = [...powerParts].sort((a, b) => a.price - b.price);
    setPowerParts(sortedParts);    
  };

  const sortAZ = () => {
    const sortedParts = [...powerParts].sort((a, b) =>
      a.manufacturer.localeCompare(b.manufacturer)
    );
    setPowerParts(sortedParts);
  };

  const sortZA = () => {
    const sortedParts = [...powerParts].sort((a, b) =>
      b.manufacturer.localeCompare(a.manufacturer)
    );
    setPowerParts(sortedParts);
  };

  const sortBlackFirst = () => {
    const sortedParts = [...powerParts].sort((a, b) =>
      a.color.localeCompare(b.color)
    );
    setPowerParts(sortedParts);
  };

  const sortWhiteFirst = () => {
    const sortedParts = [...powerParts].sort((a, b) =>
      b.color.localeCompare(a.color)
    );
    setPowerParts(sortedParts);
  };

  const sortLeastPower = () => {
    const sortedParts = [...powerParts].sort((a, b) =>
      parseInt(a.watts) - parseInt(b.watts)
    );
    setPowerParts(sortedParts);
  };

  const sortMaxPower = () => {
    const sortedParts = [...powerParts].sort((a, b) =>
      parseInt(b.watts) - parseInt(a.watts)
    );
    setPowerParts(sortedParts);
  };

  const sortBronze = () => {
    const sortedParts = [...powerParts].sort((a, b) => {
      if (a.powerRating === '80 Plus Bronze' && b.powerRating !== '80 Plus Bronze') {
        return -1; 
      } else if (a.powerRating !== '80 Plus Bronze' && b.powerRating === '80 Plus Bronze') {
        return 1; 
      } else {
        return 0; 
      }
    });
    setPowerParts(sortedParts);
  };

  const sortGold = () => {
    const sortedParts = [...powerParts].sort((a, b) => {
      if (a.powerRating === '80 Plus Gold' && b.powerRating !== '80 Plus Gold') {
        return -1; 
      } else if (a.powerRating !== '80 Plus Gold' && b.powerRating === '80 Plus Gold') {
        return 1; 
      } else {
        return 0; 
      }
    });
    setPowerParts(sortedParts);
  };

  const sortPlat = () => {
    const sortedParts = [...powerParts].sort((a, b) => {
      if (a.powerRating === '80 Plus Platinum' && b.powerRating !== '80 Plus Platinum') {
        return -1; 
      } else if (a.powerRating !== '80 Plus Platinum' && b.powerRating === '80 Plus Platinum') {
        return 1; 
      } else {
        return 0; 
      }
    });
    setPowerParts(sortedParts);
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
        Power Supplies
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

          {/* Wattage */}

          <div className="relative my-4 text-left z-3 px-4">
            <div>
              <button
                type="button"
                className="inline-flex justify-center items-center w-full px-4 py-2 text-xl text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-blue-400"
                onClick={() => toggleDropdown("wattage")}
              >
                Wattage
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
            {openDropdown === "wattage" && (
              <div className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white z-10 ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <button
            className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
            onClick={sortMaxPower}
          >
            Highest Wattage
          </button>
          <button
            className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
            onClick={sortLeastPower}
          >
            Lowest Wattage
          </button>
                </div>
              </div>
            )}
          </div>

{/* Rating */}

<div className="relative my-4 text-left z-3 px-4">
            <div>
              <button
                type="button"
                className="inline-flex justify-center items-center w-full px-4 py-2 text-xl text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-blue-400"
                onClick={() => toggleDropdown("rating")}
              >
                Power Rating
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
            {openDropdown === "rating" && (
              <div className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white z-10 ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <button
            className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
            onClick={sortBronze}
          >
            80+ Bronze
          </button>
          <button
            className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
            onClick={sortGold}
          >
            80+ Gold
          </button>
          <button
            className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
            onClick={sortPlat}
          >
            80+ Platinum
          </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-full sm:w-4/5 bg-gray-300 m-4 z-1">
          <div className="bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {powerParts.length > 0 &&
                powerParts.map((part, index) => (
                  <div key={index} className="relative">
                    <div className="flex flex-col items-center justify-cent z-1 w-full h-5/6">
                      <img
                        src={part.img}
                        alt={part.title}
                        className="w-60 h-auto p-2 z-1"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bg-gray-600 w-2/3 text-white p-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <p className="text-center">Power Rating: {part.powerRating}</p>
                          <p className="text-center">
                            Total Watts: {part.watts}
                          </p>
                          <p className="text-center">
                            Modularity: {part.modular}
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
                            <button className="bg-blue-400 p-2 mt-6 mb-2 rounded-md m-auto text-white" onClick={() => addItemToList(part.id)}>Add to List</button>
                          </div>
                          <button className="mt-4 bg-red-500 text-white p-2 rounded-md" onClick={addItemToList}>
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

export default PowerSuppply;