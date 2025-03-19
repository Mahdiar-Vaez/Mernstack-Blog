import React, { useContext } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";

import PostDetail from "./PostDetail";
import { AuthContext } from "../Context/authContext";
import Toast from "../components/Toast/Toast";
export default function ClientApp() {

    const {logout}=useContext(AuthContext)
  return (
    <div>
        <Toast/>
           <header className="bg-blue-600 text-white p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">بلاگ</h1>
          <ul className="flex space-x-4">
       
            <li>
            
            </li>
            <li onClick={logout}>
              <button  className="hover:underline">
                خروج
              </button>
            </li>
          </ul>
        </nav>
      </header>
  
    
     
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/blogs/:id" element={<PostDetail />} />
        <Route path="*" element={<div className="h-screen">
            <h1>صفحه مورد نظر یافت نشد</h1>
        </div>} />
      </Routes>
      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 وبلاگ من. تمامی حقوق محفوظ است.</p>
        </div>
      </footer>
    </div>
  );
}
