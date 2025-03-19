import React from "react";

export default function Main({ children }) {
  return (
    <div className="text-gray-500  bg-gray-100 p-4 sm:ml-64 flex flex-col-reverse xl:flex-row translate-all duration-300  dark:bg-gray-800 mt-18">
      {children}
    </div>
  );
}
