import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import TestImage from "../../images/custom-PC-3.jpg";

function AccountComponent() {
  const location = useLocation();
  const userData = location.state;
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="container xl:w-3/4 lg:w-full md:w-full sm:w-full mx-auto bg-blue-400 p-8 m-4">
      <p className="text-2xl p-2 text-center">My Account</p>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-green-400 h-full grid col-span-1 justify-left p-4 m-4 ">
          <img className="w-2/3" src={TestImage} alt="profilePicture"></img>
          <p className="text-xl p-4">Welcome, {userData.firstName} </p>
        </div>
        <div className="bg-pink-400 col-span-2 h-full p-4 m-4">
          <p className="text-2xl py-2 text-left">
            {userData.firstName} {userData.lastName}
          </p>
          <div className="border-t border-gray-500 py-2"></div>
          <div className="text-blue-600 text-lg flex">
            Email: <p className="text-black pl-2">{userData.email}</p>
          </div>
          <div className="text-blue-600 text-lg flex">
            Password:{" "}
            {showPassword ? (
              <p className="text-black pl-2">{userData.password}</p>
            ) : (
              <p className="text-black pl-2">*****</p>
            )}
          </div>
          <button onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide Password" : "Show Password"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountComponent;
