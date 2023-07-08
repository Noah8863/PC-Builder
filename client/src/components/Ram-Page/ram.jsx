import React, {useState, useEffect} from 'react';

function Ram() {

  const [ramParts, setRamParts] = useState([]);

  useEffect(() => {
    fetch('/RAM')
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Error fetching parts data');
        }
      })
      .then((jsonResult) => {
        const ram = jsonResult.ram // Flatten the arrays of parts
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

  return (
    <main className="z-1">
      <div className="m-4 text-center text-2xl underline underline-offset-4 h-32 bg-slate-400 pt-10">
        RAM Sticks
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
              {ramParts.length > 0 &&
                ramParts.map((part, index) => (
                  <div key={index} className="relative">
                    <div className="flex flex-col items-center justify-cent z-1">
                      <img
                        src={part.img}
                        alt={part.title}
                        className="w-80 h-auto p-2 z-1"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bg-gray-800 text-white p-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <p className="text-center">Memory Configuration: {part.size}</p>
                          <p className="text-center">
                            Max Memory Speed: {part.speed}
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

export default Ram;