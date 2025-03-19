import React from "react";
import Title from "../../ui/Title";
import { shortcutLink } from "../../constants";
import { IoIosArrowForward } from "react-icons/io";

export default function ShortCuts() {
  return (
    <div className="flex gap-4 flex-col bg-white rounded-lg p-4 dark:bg-gray-600 ">
      <Title>دسترسی سریع</Title>
      {shortcutLink?.map((item, index) => {
        return <div
          key={index}
          className="flex justify-between items-center cursor-pointer rounded-sm "
        >
          <div className="flex gap-4 items-center">
            <span className="bg-blue-100 p-2 rounded-full w-8 h-8 flex items-center justify-center dark:bg-gray-800 dark:text-gray-300">
              <item.icon/>
            </span>
            <h3 className="font-medium dark:text-gray-300">{item.title}</h3>
          </div>
          <span className=" rounded-sm p-3 bg-gray-300 dark:bg-gray-700 dark:text-gray-300 hover:mr-3 transition-all duration-500 ">
            <IoIosArrowForward />
          </span>
        </div>;
      })}
    </div>
  );
}
