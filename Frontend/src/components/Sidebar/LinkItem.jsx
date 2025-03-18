import React from "react";
import { BsBadgeHd } from "react-icons/bs";

export default function LinkItem({ href, icon: Icon, text, badge }) {
  return (
    <li className="">
      <a
        href={href}
        className="flex    items-center p-2 text-gray-900 gap-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <Icon className="mr-2 " />
        <span className="flex-1 mr-3 ">{text}</span>
        {badge && (
          <span
            className={`${badge.color} inline-flex items-center w-8 h-8 justify-center ml-3 text-sm     rounded-full ${badge.darkColor}`}
          >
            {badge.text}
          </span>
        )}
      </a>
    </li>
  );
}
