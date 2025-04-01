import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import PostDetail from "./PostDetail";
import { AuthContext } from "../Context/authContext";
import Toast from "../components/Toast/Toast";
import Blog from "./Pages/Blog";
import fetchData from "../utils/useFetch";
import * as AiIcons from "react-icons/ai"; // Import Ant Design icons
import * as FaIcons from "react-icons/fa";
import Category from "./Pages/Category";
import { IoIosArrowDown } from "react-icons/io";

export default function ClientApp() {
  const { logout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility
  const [categories, setCategories] = useState([]);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  async function fetchCategories() {

    try {
      const response = await fetchData("categories", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      setCategories(response.data);

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchCategories()
    const handleClickOutside = (e) => {
      if (
        !e.target.closest(".btn-menu") && // Ensure the button is targeted correctly
        !e.target.closest(".list-items") // Ensure the dropdown list is targeted correctly
      ) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Toast />
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <nav className="container mx-auto flex gap-4 max-sm:flex-col justify-between items-center">
          <h1 className="text-3xl font-bold">وبلاگ من</h1>
          <ul className="flex space-x-6 relative">
            <li>
              <Link to="/" className="hover:underline">
                صفحه اصلی
              </Link>
            </li>
            <li>
              <Link to="/blogs" className="hover:underline">
                 بلاگ ما
              </Link>
            </li>
         
            <li className="relative btn-menu">
              <button
                onClick={()=>{
                  toggleDropdown()
                }}
                className="hover:underline flex items-center focus:outline-none btn-menu"
              >
                دسته‌بندی‌ها{<IoIosArrowDown className={`ml-2 transition-transform duration-300 ${isDropdownOpen?'rotate-180 ':"rotate-0"}`}/>}
              </button>
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <ul className="list-items right-0 text-end absolute mt-2 bg-white text-gray-800 shadow-lg rounded-md w-48 transition-all duration-300 ease-in-out">
                  {categories.length > 0 ? (
                    categories?.map((category, index) => {
                      const IconComponent =
                        AiIcons[category.icon] || FaIcons[category.icon];

                      return (
                        <li key={index} className="px-4 flex items-center justify-end  py-2 hover:bg-gray-100 hover:rounded-t-lg">
                          <Link className="flex items-center gap-2 p-1"
                         to={`/categories/${category.title}/${category._id}`
                        
                         }
>
                            {category.title} {IconComponent? <IconComponent className="text-md ml-2"/>:null}
                          </Link>
                        </li>
                      );
                    })
                  ) : (
                    <li className="px-4 py-2 hover:bg-gray-100">
                      ...در حال بارگذاری 
                    </li>
                  )}
               
                </ul>
              )}
            </li>
            <li>
              <button
                onClick={logout}
                className="hover:underline focus:outline-none"
              >
                خروج
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">به وبلاگ ما خوش آمدید</h2>
          <p className="text-lg text-gray-600 mb-6">
            بهترین مقالات و مطالب آموزشی را در اینجا پیدا کنید.
          </p>
          <Link
            to="/blogs"
            className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700"
          >
            مشاهده مقالات
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/blogs/:id" element={<PostDetail />} />
          <Route path="/blogs" element={<Blog />} />
          <Route
            path="*"
            element={
              <div className="h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold text-gray-600">
                  صفحه مورد نظر یافت نشد
                </h1>
              </div>
            }
          />
          <Route path="/categories/:name/:id" element={<Category/>}/>
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 وبلاگ من. تمامی حقوق محفوظ است.</p>
          <ul className="flex justify-center space-x-4 mt-4">
            <li>
              <a href="/privacy" className="hover:underline">
                حریم خصوصی
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:underline">
                شرایط استفاده
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                تماس با ما
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
