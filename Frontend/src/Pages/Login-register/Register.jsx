import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Context/authContext.jsx';
import useFormFields from '../../utils/handleFormFields.js';
import fetchData from '../../utils/useFetch.js';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';

export default function Register({ handlePageType }) {
  const Navigate=useNavigate()

  const { register } = useContext(AuthContext);
  const [fields, handleFields] = useFormFields();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
    const {token,user}=useContext(AuthContext)
    console.log("🚀 ~ Register ~ token:", token)
    
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await fetchData('auth/register', {
        method: 'POST',
        body: JSON.stringify(fields),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (data.success) {
        toast.success("ورود موفقیت آمیز!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setTimeout(()=>{register(data.data.token, {
          username: data.data.username,
          email: data.data.email,
          role:data.data.role

      });
      Navigate('/', { replace: true });},1500)
        
      } else {
        toast.error(data.message)
        setError(data.message);
      }
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error)
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">ثبت نام</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="username">
              نام کاربری
            </label>
            <input
            required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              name="username"
              onChange={handleFields}
              type="text"
              placeholder="نام کاربری"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">
              ایمیل
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              onChange={handleFields}
              type="email"
              placeholder="ایمیل"
            />
          </div>
          <div className="mb-6 ">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="password">
              رمز عبور
            </label>
            <div className='relative'> <input
            required
              className="shadow relative appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              onChange={handleFields}
              type={showPassword ? "text" : "password"}
              placeholder='رمز عبور'
            />
            <div
              className="absolute translate-y-[-80%] top-1/2  right-0 pr-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash className="text-gray-700 dark:text-gray-300" /> : <FaEye className="text-gray-700 dark:text-gray-300" />}
            </div></div>
           
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading}
            >              ثبت نام
            </button>
            <button
              onClick={handlePageType}
              className="inline-block  align-baseline cursor-pointer font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              حساب کاربری دارید؟
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}