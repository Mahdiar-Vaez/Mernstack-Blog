import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchData from "../../utils/useFetch";
import {Link} from "react-router-dom";
export default function Category() {
  const { id } = useParams(); // Extract the category id from the URL parameters
  const [posts, setPosts] = useState([]); // State to store the posts
  const [loading, setLoading] = useState(true); // State to track loading status
  console.log(id)
  useEffect(() => {
    // Fetch posts by category id
    const fetchPosts = async () => {
      try {
        const response = await fetchData(`posts?categoryId=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("🚀 ~ fetchPosts ~ response: categroy", response);

        if (response.success) {
          setPosts(response.data); // Set the fetched posts
        } else {
          console.error("Failed to fetch posts:", response.message);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchPosts();
  }, [id]);

  if (loading) {
    return <div className="text-center py-10">در حال بارگذاری...</div>;
  }

  if (posts.length === 0) {
    return <div className="text-center py-10">هیچ مقاله‌ای یافت نشد</div>;
  }

  return (
    <div className="container mx-auto py-10 lg:px-16 px-8 max-sm:px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <img
              src={import.meta.env.VITE_BASE_FILE + post?.images[0]}
              alt={post.title}
            />
            <h3 className="text-xl font-bold mb-2">{post.title}</h3>
            <p className="text-gray-600 mb-4 break-words">
              {post.description.slice(0,105) || "بدون توضیحات"}
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
    </div>
  );
}
