import React, {useState, useEffect} from 'react';

function Fans() {
  const [fanParts, setFanParts] = useState([]);
  const [popUpMenu, setPopUpMenu] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    fetch('/Fans')
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Error fetching parts data');
        }
      })
      .then((jsonResult) => {
        const fans = jsonResult.fans // Flatten the arrays of parts
        setFanParts(fans);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const sortMax = () => {
    const sortedParts = [...fanParts].sort((a, b) => b.price - a.price);
    setFanParts(sortedParts);
  };

  const sortLeast = () => {
    const sortedParts = [...fanParts].sort((a, b) => a.price - b.price);
    setFanParts(sortedParts);
  };

  const sortAZ = () => {
    const sortedParts = [...fanParts].sort((a, b) =>
      a.manufacturer.localeCompare(b.manufacturer)
    );
    setFanParts(sortedParts);
  };

  const sortZA = () => {
    const sortedParts = [...fanParts].sort((a, b) =>
      b.manufacturer.localeCompare(a.manufacturer)
    );
    setFanParts(sortedParts);
  };

  const sortBlackFirst = () => {
    const sortedParts = [...fanParts].sort((a, b) =>
      a.color.localeCompare(b.color)
    );
    setFanParts(sortedParts);
  };

  const sortWhiteFirst = () => {
    const sortedParts = [...fanParts].sort((a, b) =>
      b.color.localeCompare(a.color)
    );
    setFanParts(sortedParts);
  };

  const sort120 = () => {
    const sortedParts = [...fanParts].sort((a, b) =>
      a.size.localeCompare(b.size)
    );
    setFanParts(sortedParts);
  };

  const sort140 = () => {
    const sortedParts = [...fanParts].sort((a, b) =>
      b.size.localeCompare(a.size)
    );
    setFanParts(sortedParts);
  };

  const addItemToList = (itemId) => {
    setPopUpMenu(!popUpMenu);
    console.log("Item ID:", itemId);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <main className="z-1">
      <div className="m-4 text-center text-2xl underline underline-offset-4 h-32 bg-slate-400 pt-10">
        Case Fans
      </div>
      <div className="flex flex-col sm:flex-row ">
        <div className="w-90 sm:w-1/5 bg-gray-200 base:min-h-screen m-4">
          <p className="text-xxl text-center px-4 py-2">Sort By:</p>
          <p className="text-xxl text-left px-4">Price</p>
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
          <p className="text-xxl text-left px-4">Alphabetical</p>
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
          <p className="text-xxl text-left px-4">Color</p>
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
          <p className="text-xxl text-left px-4">By Size</p>
          <button
            className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
            onClick={sort120}
          >
            120mm
          </button>
          <button
            className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
            onClick={sort140}
          >
            140mm
          </button>
        </div>

        <div className="w-full sm:w-4/5 bg-gray-300 m-4 z-1">
          <div className="bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {fanParts.length > 0 &&
                fanParts.map((part, index) => (
                  <div key={index} className="relative">
                    <div className="flex flex-col items-center justify-cent z-1 w-full h-5/6">
                      <img
                        src={part.img}
                        alt={part.title}
                        className="w-60 h-auto p-2 z-1"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bg-gray-600 w-2/3 text-white p-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <p className="text-center">Fan Size: {part.size}</p>
                          <p className="text-center">
                            Total quantity: {part.quantity}
                          </p>
                          <button
                            className="bg-blue-400 px-4 my-2 rounded-md flex items-center m-auto"
                            onClick={() => addItemToList(part.id)}
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
                            <button className="bg-blue-400 p-2 mt-6 mb-2 rounded-md m-auto text-white">Add to List</button>
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

export default Fans;