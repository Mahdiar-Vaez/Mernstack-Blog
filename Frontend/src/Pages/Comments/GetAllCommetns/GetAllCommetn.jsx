import React, { useContext, useEffect, useState } from "react";
import fetchData from "../../../utils/useFetch";
import { AuthContext } from "../../../Context/authContext";
import { toast } from "react-toastify";

export default function GetAllComments() {
  const [comments, setComments] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const res = await fetchData("comments?populate=userId,postId", {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setComments(res.data);
    })();
  }, [token]);

  const handleRemove = async (id) => {
    const res = await fetchData(`comments/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (res.success) {
        toast.success("نظر با موفقیت حذف شد")
        const newComments = comments?.filter((e) => e._id !== id);
      setComments(newComments);
    } else {
      toast.error("حذف نظر ناموفق بود", "error");
    }
  };

  const handleActivies = async (id, isActive) => {
    const res = await fetchData(`comments/${id}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ isActive: !isActive }),
    });
    if (res.success) {
      notify("نظر با موفقیت بروزرسانی شد", "success");
      const newComments = comments?.map((e) => {
        if (e._id === id) {
          e.isActive = !isActive;
        }
        return e;
      });
      setComments(newComments);
    } else {
      notify("بروزرسانی نظر ناموفق بود", "error");
    }
  };

  const items = comments?.map((e, index) => {
    return (
      <tr key={e._id} className="hover:bg-gray-50 transition-colors">
        <td className="px-4 py-2 border text-center">{index + 1}</td>
        <td className="px-4 py-2 border text-center">{e?.userId?.username}</td>
        <td className="px-4 py-2 border text-center">{e?.content}</td>
        <td className="px-4 py-2 border text-center">{e?.postId?.title}</td>
        <td className="px-4 py-2 border text-center">{e?.createdAt.split('T')[0]}</td>
        <td className="px-4 py-2 border text-center">
          <span
            className={`px-2 py-1 rounded text-sm font-semibold ${
              e?.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {e?.isActive ? "فعال" : "غیرفعال"}
          </span>
        </td>
        <td className="px-4 py-2 border text-center space-x-2">
          <button
            onClick={() => handleActivies(e._id, e.isActive)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            تغییر وضعیت
          </button>
          <button
            onClick={() => handleRemove(e._id)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            حذف
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">نظرات</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">شماره</th>
            <th className="px-4 py-2 border">کاربر</th>
            <th className="px-4 py-2 border">نظر</th>
            <th className="px-4 py-2 border">پست</th>
            <th className="px-4 py-2 border">تاریخ</th>
            <th className="px-4 py-2 border">وضعیت</th>
            <th className="px-4 py-2 border">عملیات</th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
      </table>
    </div>
  );
}