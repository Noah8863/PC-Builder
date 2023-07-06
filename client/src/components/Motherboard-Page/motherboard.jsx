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
            <div className="bg-white">
              {parts.length > 0 && (
                <>
                  <img src={parts[0].img} alt={parts[0].title} />
                  <p>{parts[0].manufacturer}</p>
                  <p>{parts[0].model}</p>
                </>
              )}
            </div>

            <div className="bg-white">
            {parts.length > 0 && (
                <>
                  <img src={parts[1].img} alt={parts[1].title} />
                  <p>{parts[1].manufacturer}</p>
                  <p>{parts[1].model}</p>
                </>
              )}
            </div>

            <div className="bg-white">
            {parts.length > 0 && (
                <>
                  <img src={parts[2].img} alt={parts[2].title} />
                  <p>{parts[2].manufacturer}</p>
                  <p>{parts[2].model}</p>
                </>
              )}
            </div>

            <div className="bg-white">
            {parts.length > 0 && (
                <>
                  <img src={parts[3].img} alt={parts[3].title} />
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
