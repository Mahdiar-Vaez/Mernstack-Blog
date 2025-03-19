import React from "react";
import { links } from "../../constants/index";
import LinkItem from "./LinkItem";
export default function Sidebar({ isSidebarOpen }) {
  return (
    <aside
      className={`fixed top-0 z-40 w-64 h-screen pt-20 bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 transition-colors transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="h-full  pb-4 px-6 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          {links.map((link, index) => (
            <LinkItem {...link}  key={index} />
          ))}
        </ul>
      </div>
    </aside>
  );
}
