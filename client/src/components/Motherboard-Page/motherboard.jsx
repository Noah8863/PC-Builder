import React, { useState, useEffect } from "react";

function Motherboards() {
  const [parts, setParts] = useState([]);

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

  return (
    // <div>
    //   <p>Hello! This is the Motherboard component!</p>
    //   <ul>
    //     {parts.map((part) => (
    //       <li key={part.id}>{part.size}</li>
    //     ))}
    //   </ul>
    //   <div>
    //     {parts.map((part) => {
    //       return <p key={part.id}>{part.price}</p>
    //     })}
    //   </div>
    //   <div>
    //     {parts.map((part) => {
    //       return <img key={part.id} src={part.img} alt={part.title} className="max-w-xs "></img>
    //     })}
    //   </div>
    // </div>
    <main>
      <div className="m-4 text-center text-2xl underline underline-offset-4 h-32 bg-slate-400">
        MotherBoards
      </div>
      <div className="flex">
        <div className="w-1/5 bg-gray-200 max-h-screen m-4">
          <p className="text-xxl text-center">Sort By:</p>
        </div>

        <div className="w-4/5 bg-gray-300 m-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white flex flex-col items-center justify-center">
              {parts.length > 0 && (
                <>
                  <div className="relative">
                    <img
                      src={parts[0].img}
                      alt={parts[0].title}
                      className="max-w-full h-auto"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bg-gray-800 text-white p-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <p className="text-center">
                          Socket Type: {parts[0].socket}
                        </p>
                        <p className="text-center">
                          Motherboard Size: {parts[0].size}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p>{parts[0].manufacturer}</p>
                  <p>{parts[0].model}</p>
                </>
              )}
            </div>

            <div className="bg-white flex flex-col items-center justify-center">
              {parts.length > 0 && (
                <>
                  <div className="relative">
                    <img
                      src={parts[1].img}
                      alt={parts[1].title}
                      className="max-w-full h-auto"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bg-gray-800 text-white p-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <p className="text-center">
                          Socket Type: {parts[1].socket}
                        </p>
                        <p className="text-center">
                          Motherboard Size: {parts[1].size}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p>{parts[1].manufacturer}</p>
                  <p>{parts[1].model}</p>
                </>
              )}
            </div>

            <div className="bg-white flex flex-col items-center justify-center">
              {parts.length > 0 && (
                <>
                  <div className="relative">
                    <img
                      src={parts[2].img}
                      alt={parts[2].title}
                      className="max-w-full h-auto"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bg-gray-800 text-white p-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <p className="text-center">
                          Socket Type: {parts[2].socket}
                        </p>
                        <p className="text-center">
                          Motherboard Size: {parts[2].size}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p>{parts[2].manufacturer}</p>
                  <p>{parts[2].model}</p>
                </>
              )}
            </div>

            <div className="bg-white flex flex-col items-center justify-center">
              {parts.length > 0 && (
                <>
                  <div className="relative">
                    <img
                      src={parts[3].img}
                      alt={parts[3].title}
                      className="max-w-full h-auto"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bg-gray-800 text-white p-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <p className="text-center">
                          Socket Type: {parts[3].socket}
                        </p>
                        <p className="text-center">
                          Motherboard Size: {parts[3].size}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p>{parts[3].manufacturer}</p>
                  <p>{parts[3].model}</p>
                </>
              )}
            </div>

            <div className="bg-white">d</div>

            <div className="bg-white">aa</div>

            <div className="bg-white">adsa</div>

            <div className="bg-white">dsada</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Motherboards;
