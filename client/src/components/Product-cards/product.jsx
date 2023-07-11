import React, { useState, useEffect } from "react";
import PCImage3 from "../../images/custom-PC-3.jpg";
import PCImage2 from "../../images/custom-PC-2.webp";
import PCImage1 from "../../images/custom-PC.jpg";
import "./styles.css";

function Product() {
  const [allParts, setAllParts] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [carouselData, setCarouselData] = useState([]);

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
        setCarouselData(partList);
        setDataLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const findMostExpensiveItem = (category) => {
    const filteredParts = carouselData.filter((part) =>
      part.id.startsWith(category)
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
      <div className="carousel-container">
        <h2>slider</h2>
        <div className="carousel my-carousel carousel--translate">
          <input
            className="carousel__activator"
            type="radio"
            name="carousel"
            id="F"
            defaultChecked
          />
          <input
            className="carousel__activator"
            type="radio"
            name="carousel"
            id="G"
          />
          <input
            className="carousel__activator"
            type="radio"
            name="carousel"
            id="H"
          />
          <input
            className="carousel__activator"
            type="radio"
            name="carousel"
            id="I"
          />
          <input
            className="carousel__activator"
            type="radio"
            name="carousel"
            id="J"
          />
          <div className="carousel__controls">
            <label
              className="carousel__control carousel__control--backward"
              htmlFor="J"
            ></label>
            <label
              className="carousel__control carousel__control--forward"
              htmlFor="G"
            ></label>
          </div>
          <div className="carousel__controls">
            <label
              className="carousel__control carousel__control--backward"
              htmlFor="F"
            ></label>
            <label
              className="carousel__control carousel__control--forward"
              htmlFor="H"
            ></label>
          </div>
          <div className="carousel__controls">
            <label
              className="carousel__control carousel__control--backward"
              htmlFor="G"
            ></label>
            <label
              className="carousel__control carousel__control--forward"
              htmlFor="I"
            ></label>
          </div>
          <div className="carousel__controls">
            <label
              className="carousel__control carousel__control--backward"
              htmlFor="H"
            ></label>
            <label
              className="carousel__control carousel__control--forward"
              htmlFor="J"
            ></label>
          </div>
          <div className="carousel__controls">
            <label
              className="carousel__control carousel__control--backward"
              htmlFor="I"
            ></label>
            <label
              className="carousel__control carousel__control--forward"
              htmlFor="F"
            ></label>
          </div>
          <div className="carousel__track">
            {Object.entries(partCategories).map(([category, prefixes]) => {
              const mostExpensiveItem = findMostExpensiveItem(category);
              return (
                <div key={category}>
                  <div className="p-6 m-4 items-center text-center text-xl justify-center">
                    <h3>{category}</h3>
                    {mostExpensiveItem && (
                      <>
                        <img
                          src={mostExpensiveItem.img}
                          alt={mostExpensiveItem.title}
                        />
                        <p>Title: {mostExpensiveItem.title}</p>
                        <p>Price: {mostExpensiveItem.price}</p>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="carousel__indicators">
            <label className="carousel__indicator" htmlFor="F"></label>
            <label className="carousel__indicator" htmlFor="G"></label>
            <label className="carousel__indicator" htmlFor="H"></label>
            <label className="carousel__indicator" htmlFor="I"></label>
            <label className="carousel__indicator" htmlFor="J"></label>
          </div>
        </div>
      </div>

      {/* Best of the best section */}
      {/* <div className="bg-gray-100 py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">
            You want the best of the best? We got it
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            
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
      </div> */}
    </div>
  );
}

export default Product;
