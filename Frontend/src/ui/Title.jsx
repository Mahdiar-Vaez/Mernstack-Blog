import React from "react";

export default function Title({ children }) {
  return (
    <div className="font-bold  flex w-full justify-end  text-gray-700 text-2xl dark:text-gray-200 ">
      {children}
    </div>
  );
}
