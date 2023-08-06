import React, {useState, useEffect} from 'react';

function Monitor() {

    const [monitorParts, setMonitorParts] = useState([]);

    useEffect(() => {
        fetch('/Monitor')
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              throw new Error('Error fetching parts data');
            }
          })
          .then((jsonResult) => {
            const monitor = jsonResult.monitor // Flatten the arrays of parts
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
    
      const sortBlackFirst = () => {
        const sortedParts = [...monitorParts].sort((a, b) =>
          a.color.localeCompare(b.color)
        );
        setMonitorParts(sortedParts);
      };
    
      const sortWhiteFirst = () => {
        const sortedParts = [...monitorParts].sort((a, b) =>
          b.color.localeCompare(a.color)
        );
        setMonitorParts(sortedParts);
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
                        <div className="absolute bg-gray-800 text-white p-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <p className="text-center">Refresh Rate: {part.hz}</p>
                          <p className="text-center">
                            Screen Size: {part.size}
                          </p>
                        </div>
                      </div>
                      <p>Price: ${part.price}</p>
                      <p>Manufacture: {part.manufacturer}</p>
                      <p>Model: {part.model}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </main>
    )
}

export default Monitor;