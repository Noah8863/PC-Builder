import React, {useState, useEffect} from 'react';

function GPU() {

  const [gpuParts, setGpuParts] = useState([]);
  const [popUpMenu, setPopUpMenu] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    fetch('/GPU')
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Error fetching parts data');
        }
      })
      .then((jsonResult) => {
        const gpus = jsonResult.gpus // Flatten the arrays of parts
        setGpuParts(gpus);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const sortMax = () => {
    const sortedParts = [...gpuParts].sort((a, b) => b.price - a.price);
    setGpuParts(sortedParts);
  };

  const sortLeast = () => {
    const sortedParts = [...gpuParts].sort((a, b) => a.price - b.price);
    setGpuParts(sortedParts);
  };

  const sortAZ = () => {
    const sortedParts = [...gpuParts].sort((a, b) =>
      a.manufacturer.localeCompare(b.manufacturer)
    );
    setGpuParts(sortedParts);
  };

  const sortZA = () => {
    const sortedParts = [...gpuParts].sort((a, b) =>
      b.manufacturer.localeCompare(a.manufacturer)
    );
    setGpuParts(sortedParts);
  };

  const sortBlackFirst = () => {
    const sortedParts = [...gpuParts].sort((a, b) =>
      a.color.localeCompare(b.color)
    );
    setGpuParts(sortedParts);
  };

  const sortWhiteFirst = () => {
    const sortedParts = [...gpuParts].sort((a, b) =>
      b.color.localeCompare(a.color)
    );
    setGpuParts(sortedParts);
  };

  const sortVRam = () => {
    const sortedParts = [...gpuParts].sort((a, b) => b.vRam - a.vRam);
    setGpuParts(sortedParts);
  };
  
  const sortLowestVRam = () => {
    const sortedParts = [...gpuParts].sort((a, b) => a.vRam - b.vRam);
    setGpuParts(sortedParts);
  };
  
  const sortSingle = () => {
    const sortedParts = [...gpuParts].sort((a, b) => {
      if (a.size === 'Single Slot' && b.size !== 'Single Slot') {
        return -1; 
      } else if (a.size !== 'Single Slot' && b.size === 'Single Slot') {
        return 1; 
      } else {
        return 0; 
      }
    });
    setGpuParts(sortedParts);
  };

  const sortDouble = () => {
    const sortedParts = [...gpuParts].sort((a, b) => {
      if (a.size === 'Dual Slot' && b.size !== 'Dual Slot') {
        return -1; 
      } else if (a.size !== 'Dual Slot' && b.size === 'Dual Slot') {
        return 1; 
      } else {
        return 0; 
      }
    });
    setGpuParts(sortedParts);
  };

  const sortTriple = () => {
    const sortedParts = [...gpuParts].sort((a, b) => {
      if (a.size === 'Triple Slot' && b.size !== 'Triple Slot') {
        return -1; 
      } else if (a.size !== 'Triple Slot' && b.size === 'Triple Slot') {
        return 1; 
      } else {
        return 0; 
      }
    });
    setGpuParts(sortedParts);
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
      <div className="m-4 text-center text-2xl underline underline-offset-4 h-32 bg-slate-400 pt-10">
        Graphic Cards
      </div>
      <div className="flex flex-col sm:flex-row ">
        <div className="w-90 sm:w-1/5 bg-gray-200 base:min-h-screen m-4">
          <p className="text-xxl text-center px-4 py-2">Sort By:</p>
          <p className="text-xxl text-left px-4">Price</p>
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
          <p className="text-xxl text-left px-4">Alphabetical</p>
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
          <p className="text-xxl text-left px-4">Color</p>
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
          <p className="text-xxl text-left px-4">V-Ram</p>
          <button
            className="block px-12 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
            onClick={sortVRam}
          >
            Highest V-Ram Cards
          </button>
          <button
            className="block px-12 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
            onClick={sortLowestVRam}
          >
            Lowest V-Ram Cards
          </button>
          <p className="text-xxl text-left px-4">Sort by Size</p>
          <button
            className="block px-12 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
            onClick={sortSingle}
          >
            Single Slot
          </button>
          <button
            className="block px-12 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
            onClick={sortDouble}
          >
            Dual Slot
          </button>
          <button
            className="block px-12 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
            onClick={sortTriple}
          >
            Triple Slot
          </button>
        </div>

        <div className="w-full sm:w-4/5 bg-gray-300 m-4 z-1">
          <div className="bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {gpuParts.length > 0 &&
                gpuParts.map((part, index) => (
                  <div key={index} className="relative">
                    <div className="flex flex-col items-center justify-cent z-1">
                      <img
                        src={part.img}
                        alt={part.title}
                        className="w-80 h-auto p-2 z-1"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bg-gray-600 w-2/3 text-white p-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <p className="text-center">Slots: {part.size}</p>
                          <p className="text-center">
                            V RAM: {part.vRam} GB
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
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
  
}

export default GPU;