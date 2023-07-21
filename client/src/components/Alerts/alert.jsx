import React from "react";

const Alert = ({ message }) => {
  return (
    <div
      class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
      role="alert"
    >
      <p class="font-bold">Error!</p>
      <p>{message}</p>
    </div>
  );
};

export default Alert;
