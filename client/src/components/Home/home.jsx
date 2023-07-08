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


  const findMostExpensiveItem = (partCategory) => {
    const filteredParts = allParts.filter((part) => partCategory.some((prefix) => part.id.startsWith(prefix)));
    if (filteredParts.length > 0) {
      const mostExpensiveItem = filteredParts.reduce((maxPriceItem, currentItem) => {
        return currentItem.price > maxPriceItem.price ? currentItem : maxPriceItem;
      });
      return mostExpensiveItem;
    }
    return null;
  };

  const partCategories = {
    Motherboard: ["MB"],
    CPU: ["CPU"],
    GPU: ["GPU"],
    RAM: ["RAM"],
    FANS : ["FAN"],
    CASES : ["CASE"],
    POWERSUPPLY: ["POWER"],
    // Add more categories as needed
  };

  const findCheapestItem = (partCategory) => {
    const filteredParts = allParts.filter((part) => partCategory.some((prefix) => part.id.startsWith(prefix)));
    if (filteredParts.length > 0) {
      const cheapestItem = filteredParts.reduce((minPriceItem, currentItem) => {
        return currentItem.price < minPriceItem.price ? currentItem : minPriceItem;
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
    FANS : ["FAN"],
    CASES : ["CASE"],
    POWERSUPPLY: ["POWER"],
    // Add more categories as needed
  };

  return (
    <main>
      <h2>Most Expensive Items</h2>
      {Object.entries(partCategories).map(([category, prefixes]) => {
        const mostExpensiveItem = findMostExpensiveItem(prefixes);
        return (
          <div key={category}>
            <h3>{category}</h3>
            {mostExpensiveItem ? (
              <>
                <img src={mostExpensiveItem.img} alt={mostExpensiveItem.title} className="w-80 h-auto p-2 z-1"/>
                <p>Title: {mostExpensiveItem.title}</p>
                <p>Price: {mostExpensiveItem.price}</p>
              </>
            ) : (
              <p>No item found</p>
            )}
          </div>
        );
      })}
      <h2>Cheapest Items</h2>
      {Object.entries(partCategorie).map(([category, prefixes]) => {
        const cheapestItem = findCheapestItem(prefixes);
        return (
          <div key={category}>
            <h3>{category}</h3>
            {cheapestItem ? (
              <>
                <img src={cheapestItem.img} alt={cheapestItem.title} className="w-80 h-auto p-2 z-1"/>
                <p>Title: {cheapestItem.title}</p>
                <p>Price: {cheapestItem.price}</p>
              </>
            ) : (
              <p>No item found</p>
            )}
          </div>
        );
      })}
    </main>
  );
}

export default Home;
