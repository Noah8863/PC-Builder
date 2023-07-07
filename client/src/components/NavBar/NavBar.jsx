import React, { useState } from "react";
import "../../index.css";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <header className="bg-gray-800">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-white font-bold text-xxl">PC Builder</h1>
        </div>
        <div>
          <a href="/"><button className="px-4 py-2 text-white text-xl hover:underline">Home</button></a>
          
          <div className="relative inline-block text-left ">
            <div>
              <button
                type="button"
                className="inline-flex justify-center items-center w-full px-4 py-2 text-lg font-medium text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={toggleDropdown}
              >
                {selectedOption ? selectedOption : "Parts"}
                <svg
                  className="-mr-1 ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M6 8l4 4 4-4H6z" />
                </svg>
              </button>
              
            </div>
            {isOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <a href="/motherboards">
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    role="menuitem"
                    onClick={() => handleOptionSelect("Motherboards")}
                  >
                    Motherboards
                  </button></a>
                  <a href="/CPU"><button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    role="menuitem"
                    onClick={() => handleOptionSelect("CPUs")}
                  >
                    CPUs
                  </button></a>
                  <a href="/GPU"><button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    role="menuitem"
                    onClick={() => handleOptionSelect("GPUs")}
                  >
                    GPUs
                  </button></a>
                  <a href="/RAM"><button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    role="menuitem"
                    onClick={() => handleOptionSelect("RAM")}
                  >
                    RAM
                  </button></a>
                  <a href="/Cases"><button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    role="menuitem"
                    onClick={() => handleOptionSelect("Cases")}
                  >
                    Cases
                  </button></a>
                  <a href="/Fans"><button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    role="menuitem"
                    onClick={() => handleOptionSelect("Fans")}
                  >
                    Fans
                  </button></a>
                  <a href="/PowerSupply"><button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    role="menuitem"
                    onClick={() => handleOptionSelect("Water Cooling Accessories")}
                  >
                    Power Supplies
                  </button></a>
                </div>
              </div>
            )}
          </div>
          <button className="px-4 py-2 text-white text-xl hover:underline">Login</button>
        </div>
      </div>
    </header>
  );
}

export { NavBar };
