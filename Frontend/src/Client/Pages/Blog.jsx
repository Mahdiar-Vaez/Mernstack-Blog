import React, { useEffect, useState } from "react";
import fetchData from "../../utils/useFetch";
import { Link } from "react-router-dom";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      const response = await fetchData("posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.success) {
        setPosts(response.data);
      } else {
        console.error("Failed to fetch posts:", response.message);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <div className="text-center py-10">در حال بارگذاری...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">مقالات</h1>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white flex flex-col items-end  shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <img
                src={import.meta.env.VITE_BASE_FILE + post?.images[0]}
                alt={post.title}
              />
              <span className="text-gray-400 flex items-center gap-4 ">{post.categoryId.title}</span>

              <h3 className="text-xl font-bold mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-4 break-words ">
                {"..."+post.description.slice(0,25) || "بدون توضیحات"}
              </p>
              <Link
                to={`/blogs/${post._id}`}
                className="text-blue-600 hover:underline"
              >
                ادامه مطلب
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">هیچ مقاله‌ای یافت نشد.</p>
      )}
    </div>
  );
}
