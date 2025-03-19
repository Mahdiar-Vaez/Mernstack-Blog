import React, { useState, useContext, useEffect } from "react";
import fetchData from "../../../utils/useFetch";
import { AuthContext } from "../../../Context/authContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

 const UpdatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: "",
    images: [],
  });
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id: postId } = useParams();
  const [categories, setCategories] = useState([]);

  // Fetch post data and categories
  useEffect(() => {
    (async () => {
      // Fetch categories
      const categoriesResponse = await fetchData("categories");
      if (!categoriesResponse.success) {
        toast.error("مشکلی پیش آمده است");
      }
      setCategories(categoriesResponse.data);

      // Fetch post data
      const postResponse = await fetchData(`posts/${postId}`);
      if (!postResponse.success) {
        toast.error("مشکلی پیش آمده است");
        navigate("/posts"); // Redirect if post not found
      } else {
        setFormData({
          title: postResponse.data.title,
          description: postResponse.data.description,
          categoryId: postResponse.data.categoryId,
          images: postResponse.data.images,
        });
      }
    })();
  }, [postId, navigate]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);

    const response = await fetchData("upload", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: uploadFormData,
    });

    if (!response.success) {
      toast.error("آپلود تصویر ناموفق بود!");
      setUploading(false);
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, response.file.filename],
    }));
    toast.success("تصویر با موفقیت آپلود شد!");
    setUploading(false);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "عنوان الزامی است";
    if (!formData.description.trim())
      newErrors.description = "توضیحات الزامی است";
    if (!formData.categoryId) newErrors.categoryId = "دسته‌بندی الزامی است";
    if (formData.images.length === 0)
      newErrors.images = "حداقل یک تصویر الزامی است";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const response = await fetchData(`posts/${postId}`, {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.success) {
        throw new Error(response.message || "بروزرسانی پست ناموفق بود");
      }

      toast.success("پست با موفقیت بروزرسانی شد!");
      navigate("/posts"); // Redirect to posts list
    } catch (error) {
      toast.error(error.message);
    }
  };

  const catItems = categories?.map((e, index) => (
    <option value={e._id} key={index}>
      {e.title}
    </option>
  ));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">بروزرسانی پست</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            عنوان *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            توضیحات *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="categoryId"
            className="block text-sm font-medium text-gray-700"
          >
            دسته‌بندی *
          </label>
          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">انتخاب دسته‌بندی</option>
            {catItems}
          </select>
          {errors.categoryId && (
            <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="images"
            className="block text-sm font-medium text-gray-700"
          >
            تصاویر *
          </label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleImageUpload}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            disabled={uploading}
          />
          {errors.images && (
            <p className="text-red-500 text-sm mt-1">{errors.images}</p>
          )}
          {formData.images.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-medium text-gray-700">
                تصاویر آپلود شده:
              </p>
              <div className="flex space-x-2 mt-1">
                {formData.images.map((image, index) => (
                  <img
                    key={index}
                    src={`${import.meta.env.VITE_BASE_FILE}${image}`}
                    alt={`Uploaded ${index + 1}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={uploading}
          >
            {uploading ? "در حال آپلود..." : "بروزرسانی پست"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePost;