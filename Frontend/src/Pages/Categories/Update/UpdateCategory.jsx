import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import fetchData from "../../../utils/useFetch";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../../Context/authContext";

export default function UpdateCategory() {
  const { id } = useParams(); // Get the category ID from the URL
  const navigate = useNavigate();
  const [category, setCategory] = useState({ title: "", description: "", icon: "" });
  const [loading, setLoading] = useState(false);
    const {token} =useContext(AuthContext)
  // Fetch the category details
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetchData(`categories/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            
          },
        });

        if (response.success) {
          setCategory(response.data);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error("خطایی رخ داده است");
      }
    };

    fetchCategory();
  }, [id]);

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetchData(`categories/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${token}`,        },
        body: JSON.stringify(category),
      });

      if (response.success) {
        
  if (!toast.isActive("success-toast")) {
          toast.success("دسته‌بندی‌ها با موفقیت بروزرسانی  شدند",{toastId:'success-toast'});
        }        navigate("/categories"); // Redirect to the categories list
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("خطایی رخ داده است");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ویرایش دسته‌بندی</h1>
      <form onSubmit={handleUpdateCategory} className="bg-white p-6 rounded shadow-md w-full max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">نام دسته‌بندی</label>
          <input
            type="text"
            value={category.title}
            onChange={(e) => setCategory({ ...category, title: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="نام دسته‌بندی"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">توضیحات</label>
          <textarea
            value={category.description}
            onChange={(e) => setCategory({ ...category, description: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="توضیحات دسته‌بندی"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">آیکون</label>
          <input
            type="text"
            value={category.icon}
            onChange={(e) => setCategory({ ...category, icon: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="آیکون (مثال: AiFillAlert)"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate("/categories")}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
          >
            انصراف
          </button>
          <button
            type="submit"
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "در حال به‌روزرسانی..." : "به‌روزرسانی"}
          </button>
        </div>
      </form>
    </div>
  );
}