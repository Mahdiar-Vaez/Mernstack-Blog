import React, { useContext, useEffect, useState } from "react";
import fetchData from "../../../utils/useFetch";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AiTwotoneDelete } from "react-icons/ai";
import { AuthContext } from "../../../Context/authContext";

export default function GetAllPost() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const {token} =useContext(AuthContext)
  useEffect(() => {
    (async () => {
      const response = await fetchData("posts?populate=categoryId");
      setPosts(response.data);
    })();
  }, []);

  const handleDelete = async (id) => {
    const response = await fetchData(`posts/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    });
    if (response.success) {
      toast.success(response.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      const newPost = posts.filter((e) => e._id !== id);
      setPosts(newPost);
    } else {
      toast.error(response.message);
    }
  };

  const items = posts?.map((post, index) => (
    <tr
      key={index}
      onClick={(e) => {
        if (!e.target.closest(".deleteBtn")) {
          navigate(`/posts/${post._id}`);
        }
      }}
      className="hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 even:bg-gray-50"
    >
      <td className="py-2 px-4 text-center border-b">{post?.title.slice(0,20)}</td>
      <td className="py-2 px-4 text-center  border-b">
        <img
          src={import.meta.env.VITE_BASE_FILE + post?.images[0]}
          alt={post.title.slice(0,10)}
          className="w-[60px] block mx-auto h-[60px]  rounded"
        />
      </td>
      <td className="py-2 px-4 text-center border-b">{post?.categoryId?.title}</td>
      <td className="py-2 px-4 text-center border-b">
        <button
          onClick={() => handleDelete(post?._id)}
          className="deleteBtn py-1 px-3 rounded hover:bg-gray-300 focus:outline-none transform hover:scale-105 transition-transform"
        >
            <AiTwotoneDelete/>
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">لیست پست ها</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">نام</th>
              <th className="py-2 px-4 border-b">عنوان تصویر</th>
              <th className="py-2 px-4 border-b">نام دسته‌بندی</th>
              <th className="py-2 px-4 border-b">عملیات</th>
            </tr>
          </thead>
          {posts ?  <tbody>{items}</tbody>:<h3 className="">
              پستی پیدا نشد 
            </h3>}
        
        </table>
      </div>
    </div>
  );
}