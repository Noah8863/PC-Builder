import React, {useState, useEffect} from 'react';

function CPU() {

  const [cpuParts, setCpuParts] = useState([]);

  useEffect(() => {
    fetch('/CPU')
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Error fetching parts data');
        }
      })
      .then((jsonResult) => {
        const cpus = jsonResult.cpus // Flatten the arrays of parts
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

  const addItemToList = (itemId) => {
    console.log('Item ID:', itemId);
  };

  return (
    <main className="z-1">
      <div className="m-4 text-center text-2xl underline underline-offset-4 h-32 bg-slate-400 pt-10">
        Central Processing Unit
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
          <p className="text-xxl text-left px-4">Brand</p>
          <button
            className="block px-12 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
            onClick={sortAMD}
          >
            AMD processors
          </button>
          <button
            className="block px-12 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
            onClick={sortIntel}
          >
           Intel processors
          </button>
          
        </div>

        <div className="w-full sm:w-4/5 bg-gray-300 m-4 z-1">
          <div className="bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {cpuParts.length > 0 &&
                cpuParts.map((part, index) => (
                  <div key={index} className="relative">
                    <div className="flex flex-col items-center justify-cent z-1 w-full h-5/6">
                      <img
                        src={part.img}
                        alt={part.title}
                        className="w-60 h-auto p-2 z-1"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bg-gray-800 text-white p-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <p className="text-center">Cores: {part.cores}</p>
                          <p className="text-center">Threads: {part.threads}</p>
                          <p className="text-center">
                            Socket Type: {part.socket}
                          </p>
                        </div>
                      </div>
                      <p>Price: ${part.price}</p>
                      <p>Manufacture: {part.manufacturer}</p>
                      <p>Model: {part.model}</p>
                      <button className="bg-blue-400 px-4 my-2 rounded-md" onClick={() => addItemToList(part.id)}>Add to Cart</button>
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

export default CPU;