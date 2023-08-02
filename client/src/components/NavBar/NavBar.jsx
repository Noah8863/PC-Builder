import React, { useState, useEffect } from "react";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import Icon from "../../images/pc-builder-icon.png";
import "../../index.css";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for changes in the authentication state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // Update the user state when the authentication state changes
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="bg-gray-800 z-3">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div>
          <a href="/">
            <img src={Icon} alt="pc-buildericon" className="w-40"></img>
          </a>
        </div>
        <div>
          <a href="/">
            <button className="px-4 py-2 text-white text-xl hover:underline">
              Home
            </button>
          </a>

          <div className="relative inline-block text-left z-3">
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
              <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white z-10 ring-1 ring-black ring-opacity-5">
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
                    </button>
                  </a>
                  <a href="/CPU">
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                      role="menuitem"
                      onClick={() => handleOptionSelect("CPUs")}
                    >
                      CPUs
                    </button>
                  </a>
                  <a href="/GPU">
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                      role="menuitem"
                      onClick={() => handleOptionSelect("GPUs")}
                    >
                      GPUs
                    </button>
                  </a>
                  <a href="/RAM">
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                      role="menuitem"
                      onClick={() => handleOptionSelect("RAM")}
                    >
                      RAM
                    </button>
                  </a>
                  <a href="/Cases">
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                      role="menuitem"
                      onClick={() => handleOptionSelect("Cases")}
                    >
                      Cases
                    </button>
                  </a>
                  <a href="/Fans">
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                      role="menuitem"
                      onClick={() => handleOptionSelect("Fans")}
                    >
                      Fans
                    </button>
                  </a>
                  <a href="/PowerSupply">
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                      role="menuitem"
                      onClick={() =>
                        handleOptionSelect("Water Cooling Accessories")
                      }
                    >
                      Power Supplies
                    </button>
                  </a>
                </div>
              </div>
            )}
          </div>
          <a href="/Blog">
            <button className="px-4 py-2 text-white text-xl hover:underline">
              Blog
            </button>
          </a>
          {/* Conditionally render "Account" and "Logout" if the user is signed in */}
          {user ? (
            <>
              <a href="/Account">
                <button className="px-4 py-2 text-white text-xl hover:underline">
                  Account
                </button>
              </a>
              <button
                className="px-4 py-2 text-white text-xl hover:underline"
                onClick={logOut}
              >
                Logout
              </button>
            </>
          ) : (
            <a href="/Login">
              <button className="px-4 py-2 text-white text-xl hover:underline">
                Sign In
              </button>
            </a>
          )}
        </div>
      </div>
    </header>
  );
}

export { NavBar };
