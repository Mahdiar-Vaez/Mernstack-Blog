import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import './index.css';
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./Pages/Dashboard.jsx";
import Posts from "./Pages/posts/index.jsx";
import AuthPageChanger from "./Pages/Login-register/PageChanger.jsx";
import { AuthContext } from "./Context/authContext.jsx";
import Toast from "./components/Toast/Toast.jsx";
import GetAllPost from "./Pages/posts/GetAll/GetAllPost.jsx";
import UpdatePost from "./Pages/posts/Update/UpdatePost.jsx";
import GetAllUsers from "./Pages/Users/GetAllUsers/GetAllUsers.jsx";
import Users from "./Pages/Users/index.jsx";
import Comments from "./Pages/Comments/index.jsx";
import GetAllComments from "./Pages/Comments/GetAllCommetns/GetAllCommetn.jsx";
import PrivateRoute from "./components/Private/PrivateRoute.jsx";
import ClientApp from "./Client/ClientApp.jsx";

export default function App() {
  const { token, user } = useContext(AuthContext);
  console.log("🚀 ~ App ~ token:", token, user);

  const [darkMode, setDarkMode] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  };
  if(user?.role==="user"){
    return <ClientApp/>
  }
  else{
  return (
    <div className={`font-danalight ${darkMode ? 'dark' : ''}`}>
      {location.pathname !== "/auth"  && (
        <>
          <Header toggleSideBar={toggleSideBar} toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
          <Sidebar isSidebarOpen={isSideBarOpen} />
        </>
      )}
      <Routes>
        <Route exact path="/" element={<PrivateRoute><Dashboard darkMode={darkMode} /></PrivateRoute>} />
        <Route path="/posts" element={<PrivateRoute><Posts /></PrivateRoute>}>
          <Route path="" element={<GetAllPost />} /> {/* Matches /posts */}
          <Route path=":id" element={<UpdatePost />} />
        </Route>
        <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>}>
          <Route path="" element={<GetAllUsers />} /> {/* Matches /users */}
        </Route>
        <Route path="/comments" element={<PrivateRoute><Comments /></PrivateRoute>}>
          <Route path="" element={<GetAllComments />} /> {/* Matches /comments */}
        </Route>
        <Route path="/auth" element={<AuthPageChanger />} />
        <Route path="*" element={<Navigate to="/" />} />

     
      </Routes>
      <Toast />
    </div>
  );
}
}