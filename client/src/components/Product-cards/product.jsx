import React, { useState, useEffect } from "react";
import PCImage3 from "../../images/custom-PC-3.jpg";
function Product() {
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
    return (
      <div className="text-superText flex justify-center items-center m-auto h-screen">
        Loading...
      </div>
    ); // Render a loading message until data is loaded
  }

  return (
    <div>
      {/* Banner section */}
      <div className="relative">
        <img src={PCImage3} alt="Banner" className="w-4/6 h-auto flex m-auto" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="text-superText font-bold text-white">
            Welcome to the PC Builder Community
          </h1>
        </div>
      </div>

      {/* Hot deals section */}
      <div className="container mx-auto py-16">
        {/* Product cards section */}
        <div className="container mx-auto py-16">
          <h2 className="text-3xl font-bold mb-8">
            Check out these hot deals!
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(partCategories).map(([category, prefixes]) => {
              const mostExpensiveItem = findMostExpensiveItem(prefixes);
              return (
                <div key={category} className="bg-white rounded-lg shadow-lg">
                  <img
                    src={mostExpensiveItem.img}
                    alt={mostExpensiveItem.title}
                    className="w-5/6 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">
                      {mostExpensiveItem.title}
                    </h3>
                    <p className="text-gray-600">{mostExpensiveItem.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Best of the best section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">
            You want the best of the best? We got it
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Product card 1 */}
            <div className="bg-white rounded-lg shadow-lg">
              <img
                src="/path/to/product4-image.jpg"
                alt="Product 4"
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Product 4</h3>
                <p className="text-gray-600">$299.99</p>
              </div>
            </div>

            {/* Product card 2 */}
            <div className="bg-white rounded-lg shadow-lg">
              <img
                src="/path/to/product5-image.jpg"
                alt="Product 5"
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Product 5</h3>
                <p className="text-gray-600">$399.99</p>
              </div>
            </div>

            {/* Product card 3 */}
            <div className="bg-white rounded-lg shadow-lg">
              <img
                src="/path/to/product6-image.jpg"
                alt="Product 6"
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Product 6</h3>
                <p className="text-gray-600">$499.99</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
