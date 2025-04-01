import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fetchData from "../../utils/useFetch";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../Context/authContext";

const LandingPage = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const response = await fetchData("posts?populate=categoryId");
      if (response.success) {
        setPosts(response.data);
        console.log(response.data)
      } else {
        toast.error("مشکلی پیش آمده است");
      }
    })();
  }, []);

  return (
    <div>
 
      <main className="container min-h-screen mx-auto p-4">
        <section className="hero bg-gray-100 p-8 rounded-lg shadow-md text-center mb-8">
          <h2 className="text-4xl font-bold mb-4">خیلی خوش اومدی کاربر گرامی {user?.username}</h2>
          <p className="text-lg mb-4">این یک برنامه وبلاگ ساده است که در آن می‌توانید پست‌ها را بخوانید , کامنت بزارید در نقش ادمین میتوانید به همه چیز دسترسی داشته باشید  </p>
        </section>
        <section className="posts grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div key={post._id} className="bg-white p-4 flex justify-center flex-col rounded shadow-md">
                <img className="rounded-xl" src={import.meta.env.VITE_BASE_FILE+post?.images} alt="عکس پست" />
              <span className="text-end">
                دسته بندی:
                {post.categoryId.title}
              </span>
              <h3 className="text-xl font-bold mb-2">{post.title}</h3>
              <p className="text-gray-700 mb-4 break-all">{post.description.slice(0, 100)}...</p>
              <Link to={`/blogs/${post._id}`} className="text-blue-500 hover:underline">
                ادامه مطلب
              </Link>
            </div>
          ))}
        </section>
      </main>
    
    </div>
  );
};

export default LandingPage;