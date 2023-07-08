import React, { useEffect, useState } from "react";

function Home() {
  const [allParts, setAllParts] = useState([]);

  useEffect(() => {
    fetch("/parts/")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Error fetching parts data");
        }
      })
      .then((jsonResult) => {
        const partList = [
          ...jsonResult.motherboards,
          ...jsonResult.cpus,
          ...jsonResult.gpus,
          ...jsonResult.ram,
          ...jsonResult.cases,
          ...jsonResult.fans,
          ...jsonResult.powerSupply,
        ];
        setAllParts(partList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <main>
      {allParts && allParts.map((part) => <li key={part.id}>{part.price}</li>)}
    </main>
  );
}

export default Home;
