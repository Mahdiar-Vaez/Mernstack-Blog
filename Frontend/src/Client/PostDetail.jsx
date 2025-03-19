import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import fetchData from "../utils/useFetch";
import { AuthContext } from "../Context/authContext";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { token, user } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const postResponse = await fetchData(`posts/${id}`);
      if (postResponse.success) {
        setPost(postResponse.data);
      } else {
        toast.error("مشکلی پیش آمده است");
      }

      const commentsResponse = await fetchData(`comments?postId=${id}`);
      if (commentsResponse.success) {
        setComments(commentsResponse.data);
      } else {
        toast.error("مشکلی پیش آمده است");
      }
    })();
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      toast.error("نظر نمی‌تواند خالی باشد");
      return;
    }

    const response = await fetchData("comments", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ postId: id, userId: user._id, content: newComment }),
    });

    if (response.success) {
      setComments([...comments, response.data]);
      setNewComment("");
      toast.success("نظر با موفقیت اضافه شد");
    } else {
      toast.error("مشکلی پیش آمده است");
    }
  };

  return (
    <div className="container flex  flex-col p-4 items-start max-md:items-center max-md:text-center mx-auto ">
      {post ? (
        <>
          <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
          {post?.images[0] && (
            <img  src={`${import.meta.env.VITE_BASE_FILE}${post?.images[0]}`} alt={post.title} className="max-w-[500px] max-md:w-[340px] h-auto mb-4 rounded " />
          )}
          <p>{post.description}</p>
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">نظرات</h2>
            {comments.map((comment) => (
              <div key={comment._id} className="bg-gray-100 p-2 rounded mb-2">
                <div className="flex items-center mb-2">
                  {comment.userId?.avatar && (
                    <img  src={`${import.meta.env.VITE_BASE_FILE}${comment.userId.avatar}`} alt={comment.userId.username} className="w-8 h-8 rounded-full mr-2" />
                  )}
                  <p className="font-bold">{comment.userId?.username}</p>
                </div>
                <p>{comment.content}</p>
              </div>
            ))}
            <div className="mt-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="نظر خود را بنویسید"
              />
              <button
                onClick={handleAddComment}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                ارسال نظر
              </button>
            </div>
          </div>
        </>
      ) : (
        <p>در حال بارگذاری...</p>
      )}
    </div>
  );
}