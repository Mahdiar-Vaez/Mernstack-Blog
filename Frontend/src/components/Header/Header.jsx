import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

export default function Header({ darkMode, toggleSideBar, toggleDarkMode }) {
  return (
    <nav className="fixed top-0 p-2 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center w-full justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button onClick={toggleSideBar} className="flex cursor-pointer text-gray-500 p-2 sm:hidden focus:ring-2 focus:ring-gray-200 dark:hover:bg-gray-700 dark:focus:ring-gray-600 dark:text-gray-400 hover:bg-gray-100 rounded-lg text-sm gap-1 items-center">
              <HiOutlineMenuAlt2 className="text-2xl" size={24} />
            </button>
            <a href="#" className="flex ms-2 md:me-24">
              <MdSpaceDashboard className="h-8 me-3 text-xl text-violet-500" />
              <span className="self-center tex-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                بلاگ
              </span>
            </a>
          </div>
          <button onClick={toggleDarkMode} className="dark:bg-slate-50 cursor-pointer dark:text-slate-700 rounded-full p-2">
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>
    </nav>
  );
}