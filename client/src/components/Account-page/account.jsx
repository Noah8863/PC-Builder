import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { auth } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import TestImage from "../../images/custom-PC-3.jpg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ConstructionIcon from '@mui/icons-material/Construction';
import LogoutIcon from '@mui/icons-material/Logout';

function AccountComponent() {
  const location = useLocation();
  const userData = location.state;
  const [showPassword, setShowPassword] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="container xl:w-3/4 lg:w-full md:w-full sm:w-full mx-auto bg-blue-400 p-8 m-4">
      <p className="text-2xl p-2 text-center">My Account</p>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-green-400 h-full grid col-span-1 justify-left p-4 m-4 ">
          <img className="w-2/3" src={TestImage} alt="profilePicture"></img>
          {currentUser ? (
            <div>
              <p className="text-xl p-4">Welcome, {currentUser.firstName}</p>
              <div className="space-y-2 bg-blue-400">
                <button className="block w-full flex items-center justify-between">
                  <span className="ml-2">Profile <AccountCircleIcon /> </span>
                </button>
                <button className="block w-full flex items-center justify-between">
                  <span className="ml-2">Builds <ConstructionIcon /> </span>
                </button>
                <button className="block w-full flex items-center justify-between">
                  <span className="ml-2">Builds <LogoutIcon /> </span>
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xl p-4">Welcome, Guest</p>
          )}
        </div>
        {currentUser ? (
          <div className="bg-pink-400 col-span-2 h-full p-4 m-4">
            <p className="text-2xl py-2 text-left">{currentUser.displayName}</p>
            <div className="border-t border-gray-500 py-2"></div>
            <div className="text-blue-600 text-lg flex">
              Email: <p className="text-black pl-2">{currentUser.email}</p>
            </div>
            {/* Display other user data here */}
            <button onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide Password" : "Show Password"}
            </button>
          </div>
        ) : (
          <div className="bg-pink-400 col-span-2 h-full p-4 m-4">
            {/* Show a message or redirect to the login page if no user is signed in */}
            <p className="text-xl py-2 text-left">
              Please sign in to view your account
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountComponent;
