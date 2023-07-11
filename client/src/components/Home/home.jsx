import React, { useEffect, useState } from "react";

function Home() {
  const [allParts, setAllParts] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  
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
        setDataLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const findMostExpensiveItem = (partCategory) => {
    const filteredParts = allParts.filter((part) =>
      partCategory.some((prefix) => part.id.startsWith(prefix))
    );
    if (filteredParts.length > 0) {
      const mostExpensiveItem = filteredParts.reduce(
        (maxPriceItem, currentItem) => {
          return currentItem.price > maxPriceItem.price
            ? currentItem
            : maxPriceItem;
        }
      );
      return mostExpensiveItem;
    }
    return null;
  };

  const partCategories = {
    Motherboard: ["MB"],
    CPU: ["CPU"],
    GPU: ["GPU"],
    RAM: ["RAM"],
    FANS: ["FAN"],
    CASES: ["CASE"],
    POWERSUPPLY: ["POWER"],
    // Add more categories as needed
  };

  const findCheapestItem = (partCategory) => {
    const filteredParts = allParts.filter((part) =>
      partCategory.some((prefix) => part.id.startsWith(prefix))
    );
    if (filteredParts.length > 0) {
      const cheapestItem = filteredParts.reduce((minPriceItem, currentItem) => {
        return currentItem.price < minPriceItem.price
          ? currentItem
          : minPriceItem;
      });
      return cheapestItem;
    }
    return null;
  };

  const partCategorie = {
    Motherboard: ["MB"],
    CPU: ["CPU"],
    GPU: ["GPU"],
    RAM: ["RAM"],
    FANS: ["FAN"],
    CASES: ["CASE"],
    POWERSUPPLY: ["POWER"],
    // Add more categories as needed
  };

  if (!dataLoaded) {
    return <div>Loading...</div>; // Render a loading message until data is loaded
  }

  return (
    <main>
      <div className="">
        <h2>Most Expensive Items</h2>
        <div className="bg-blue-300 grid grid-cols-7">
          {Object.entries(partCategories).map(([category, prefixes]) => {
            const mostExpensiveItem = findMostExpensiveItem(prefixes);
            return (
              <div key={category} className="bg-blue-300 grid">
                <div className="grid">
                  <h3>{category}</h3>
                  <img
                    src={mostExpensiveItem.img}
                    alt={mostExpensiveItem.title}
                    className="w-60 max-h-60 p-2 z-1"
                  />
                  <p>Title: {mostExpensiveItem.title}</p>
                  <p>Price: {mostExpensiveItem.price}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <h2>Cheapest Items</h2>
      <div className="bg-blue-300 grid grid-cols-7">
        {Object.entries(partCategorie).map(([category, prefixes]) => {
          const cheapestItem = findCheapestItem(prefixes);
          return (
            <div key={category} className="bg-blue-300 grid">
              <div className="grid">
                <h3>{category}</h3>
                <img
                  src={cheapestItem.img}
                  alt={cheapestItem.title}
                  className="w-60 max-h-60 p-2 z-1"
                />
                <p>Title: {cheapestItem.title}</p>
                <p>Price: {cheapestItem.price}</p>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default Home;
