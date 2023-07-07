import React, {useState, useEffect} from 'react';

function Fans() {

  const [fanParts, setFanParts] = useState([]);

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



  return (
    <main>
      <div className="m-4 text-center text-2xl underline underline-offset-4 h-32 bg-slate-400">
        Fans
      </div>
      <div className="flex">
        <div className="w-1/5 bg-gray-200 max-h-screen m-4">
          <p className="text-xxl text-center">Sort By:</p>
        </div>

        <div className="w-4/5 bg-gray-300 m-4">
          <div className="bg-white">
            <div className="grid grid-cols-4 gap-4">
              {fanParts.length > 0 &&
                fanParts.map((part, index) => (
                  <div key={index} className="relative">
                    <div className="flex flex-col items-center justify-center">
                      <img
                        src={part.img}
                        alt={part.title}
                        className="max-w-full h-auto"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bg-gray-800 text-white p-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <p className="text-center">
                            Fan Size: {part.size}
                          </p>
                          <p className="text-center">
                            Quantity: {part.quantity}
                          </p>
                        </div>
                      </div>
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

export default Fans;