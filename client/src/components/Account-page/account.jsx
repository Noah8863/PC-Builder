import React from "react";
import { useLocation } from "react-router-dom";

function AccountComponent() {
  const location = useLocation();
  const userData = location.state;
  return (
    <div className="containermin-w-full mx-auto bg-blue-400 p-8 m-4">
        <p className="text-2xl p-4">My Account</p>
      <div className="grid grid-cols-2 ">
        <div className="bg-green-400 w-5/6">First container</div>
        <div className="bg-pink-400">Second container</div>
      </div>
    </div>
  );
}

export default AccountComponent;

{
  /* <p>This is the email: {userData.email}</p>
      <p>This is the password: {userData.password}</p>
      <p>This is the First Name: {userData.firstName}</p>
      <p>This is the Last Name: {userData.lastName}</p> */
}
