import React, {useState, useEffect} from 'react';

function PowerSuppply() {

  const [powerParts, setPowerParts] = useState([]);

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

  return (
    <main className="z-1">
      <div className="m-4 text-center text-2xl underline underline-offset-4 h-32 bg-slate-400 pt-10">
        Power Supplies
      </div>
      <div className="flex flex-col sm:flex-row ">
        <div className="w-90 sm:w-1/5 bg-gray-200 base:min-h-screen m-4">
          <p className="text-xxl text-left px-4 py-2">Sort By:</p>
          <button
            className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
            onClick={sortMax}
          >
            Price: Highest to Lowest
          </button>
          <button
            className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
            onClick={sortLeast}
          >
            Price: Lowest to Highest
          </button>
          <button
            className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
            onClick={sortAZ}
          >
            Sort: A - Z
          </button>
          <button
            className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
            onClick={sortZA}
          >
            Sort: Z - A
          </button>
          <button
            className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
            onClick={sortBlackFirst}
          >
            Color: Black
          </button>
          <button
            className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
            onClick={sortWhiteFirst}
          >
            Color: White
          </button>
        </div>

        <div className="w-full sm:w-4/5 bg-gray-300 m-4 z-1">
          <div className="bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {powerParts.length > 0 &&
                powerParts.map((part, index) => (
                  <div key={index} className="relative">
                    <div className="flex flex-col items-center justify-cent z-1">
                      <img
                        src={part.img}
                        alt={part.title}
                        className="w-80 h-auto p-2 z-1"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bg-gray-800 text-white p-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <p className="text-center">Power Rating: {part.powerRating}</p>
                          <p className="text-center">
                            Total Watts: {part.watts}
                          </p>
                          <p className="text-center">
                            Type of Modularity: {part.modular}
                          </p>
                        </div>
                      </div>
                      <p>{part.price}</p>
                      <p>{part.manufacturer}</p>
                      <p>{part.model}</p>
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

export default PowerSuppply;