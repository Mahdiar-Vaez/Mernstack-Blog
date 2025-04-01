import React, { useState, useEffect, useContext } from "react";
import fetchData from "../../../utils/useFetch";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Context/authContext";
import 'react-toastify/dist/ReactToastify.css';

export default function GetAllUsers() {
  const [users, setUsers] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = async () => {
    try {
      const response = await fetchData("users", {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      });
      if (response?.success) {
        setUsers(response.data);
      if (!toast.isActive("success-toast")) {
                 toast.success("کاربران با موفقیت دریافت شدند", { toastId: "success-toast" });
               }
      } else {
        console.log("🚀 ~ handleFetch ~ response:", response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">لیست کاربران</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-md">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="py-2 px-4 border-b dark:border-gray-700">نام کاربری</th>
              <th className="py-2 px-4 border-b dark:border-gray-700">ایمیل</th>
              <th className="py-2 px-4 border-b dark:border-gray-700">نقش</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index} className="hover:bg-gray-200 dark:hover:bg-gray-600 even:bg-gray-50 dark:even:bg-gray-800">
                  <td className="py-2 px-4 text-center border-b dark:border-gray-700">{user.username}</td>
                  <td className="py-2 px-4 text-center border-b dark:border-gray-700">{!user?.email ? "ایمیل ندارد":user.email}</td>
                  <td className="py-2 px-4 text-center border-b dark:border-gray-700">{user.role}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  کاربری پیدا نشد
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}