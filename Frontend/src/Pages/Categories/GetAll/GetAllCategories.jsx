import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchData from "../../../utils/useFetch";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../../Context/authContext";
import Modal from "react-modal";
import * as AiIcons from "react-icons/ai"; // Import Ant Design icons
import * as FaIcons from "react-icons/fa"; // Import Font Awesome icons
import useFormFields from "../../../utils/handleFormFields";

Modal.setAppElement("#root");

export default function GetAllCategories() {
  const [fields, handleFields] = useFormFields(); 
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const handleGetCategories = async () => {
    try {
      const data = await fetchData("categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.success) {
        setCategories(data.data);
        if (!toast.isActive("success-toast")) {
          toast.success("دسته‌بندی‌ها با موفقیت دریافت شدند", { toastId: "success-toast" });
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("خطایی رخ داده است");
    }
  };

  const handleCreateCategory = async () => {
    try {
      const response = await fetchData("categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${token}`,
        },
        body: JSON.stringify(fields), // Use the fields state from the custom hook
      });

      if (response.success) {
        setCategories([...categories, response.data]);
        toast.success("دسته‌بندی با موفقیت ایجاد شد");
        setIsModalOpen(false);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("خطایی رخ داده است");
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      const response = await fetchData(`categories/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${token}`,
        },
      });

      if (response.success) {
        setCategories(categories.filter((category) => category._id !== id));
        toast.success("دسته‌بندی با موفقیت حذف شد");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("خطایی رخ داده است");
    }
  };

  const handleUpdateCategory = (id) => {
    navigate(`/categories/${id}`);
  };

  useEffect(() => {
    handleGetCategories();
  }, []);

  return (
    <div className="flex overflow-x-auto w-full items-center m-4 flex-col p-4">
      <h1 className="text-2xl font-bold mb-4">دسته‌بندی‌ها</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-gray-700 bg-gray-400 my-4 p-2 rounded-md cursor-pointer hover:bg-gray-600"
      >
        اضافه کردن دسته بندی
      </button>
      <table className="w-full bg-white border border-gray-200 rounded-lg !overflow-x-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">شماره</th>
            <th className="px-4 py-2 border">نام دسته‌بندی</th>
            <th className="px-4 py-2 border">توضیحات</th>
            <th className="px-4 py-2 border">آیکون</th>
            <th className="px-4 py-2 border">اکشن</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => {
            const IconComponent = AiIcons[category.icon] || FaIcons[category.icon];

            return (
              <tr key={category._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2 border text-center">{index + 1}</td>
                <td className="px-4 py-2 border text-center">{category.title}</td>
                <td className="px-4 py-2 border text-center">{category.description || "بدون توضیحات"}</td>
                <td className="px-4 py-2 border text-center">
                  {IconComponent ? <IconComponent className="text-xl" /> : "بدون آیکون"}
                </td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => handleUpdateCategory(category._id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mr-2"
                  >
                    ویرایش
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Modal for Creating Category */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="اضافه کردن دسته‌بندی"
        className="bg-white fixed p-6 rounded shadow-lg w-96 mx-auto"
        overlayClassName="fixed w-screen z-1000 inset-0 bg-[rgba(0,0,0,0.2)] flex justify-center items-center"
      >
        <h2 className="text-xl font-bold mb-4">اضافه کردن دسته‌بندی</h2>
        <input
          type="text"
          name="title"
          placeholder="نام دسته‌بندی"
          value={fields.title || ""}
          onChange={handleFields}
          className="w-full p-2 border rounded mb-4"
        />
    
        <input
          type="text"
          name="icon"
          placeholder="آیکون (مثال: AiFillAlert)"
          value={fields.icon || ""}
          onChange={handleFields}
          className="w-full p-2 border rounded mb-4"
        />
        <div className="flex justify-end">
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
          >
            انصراف
          </button>
          <button
            onClick={handleCreateCategory}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            اضافه کردن
          </button>
        </div>
      </Modal>
    </div>
  );
}