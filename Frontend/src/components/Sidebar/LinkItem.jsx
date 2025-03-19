import React, { useContext } from "react";
import { BsBadgeHd } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/authContext";
import Swal from "sweetalert2";

export default function LinkItem({ href, icon: Icon, text, badge , handleClick }) {
  const {logout}=useContext(AuthContext)
  const Navigate=useNavigate()
  return (
    <li className="" onClick={()=>{
      handleClick&& 
      Swal.fire({
        title: "آیا میخواهید خارج شوید?",
        
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "بله!",
        cancelButtonText:"خیر",
        
        
        
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "شما با موفقیت خارج شدید!",
            icon: "success",
            showConfirmButton:false
            
          });
          logout()
        
          Navigate('/auth')
          
        }
      });

    } }>
      <Link
        to={href}
        className="flex    items-center p-2 text-gray-900 gap-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <Icon className="mr-2 " />
        <span className="flex-1 mr-3 ">{text}</span>
        {badge && (
          <span
            className={`${badge.color} inline-flex items-center w-8 h-8 justify-center ml-3 text-sm     rounded-full ${badge.darkColor}`}
          >
            {badge.text}
          </span>
        )}
      </Link>
    </li>
  );
}
