import { GoGoal } from "react-icons/go";
import { GrPlan } from "react-icons/gr";
import {
  IoIosStats,
  IoIosSettings,
  IoIosPerson,
  IoIosPersonAdd,
  IoIosEyeOff,
  IoIosLogIn,
  IoIosLogOut,
} from "react-icons/io";
import {
  FaChartBar,
  FaCalendarAlt,
  FaFacebookMessenger,
  FaUsersCog,
  FaListAlt,FaComment
} from "react-icons/fa";

import user01 from "../../public/assets/user01.png";
import user02 from "../../public/assets/user02.png";
import user03 from "../../public/assets/user03.png";
import { href } from "react-router-dom";
import Swal from "sweetalert2";

export const links = [
  {
    href: "/dashboard",
    icon: FaChartBar,
    text: "داشبورد",
  },

  {
    href: "/posts",
    icon: FaFacebookMessenger,
    text: " پست ها",
    
  },
  {
    href: "/users",
    icon: FaUsersCog,
    text: "کاربران",
  },
  {
    href: "/comments",
    icon: FaComment,
    text: " کامنت ها",
  },

  {
    handleClick(){


    },
    icon: IoIosLogOut,
    text: "خروج",
  },
];

export const empolyeesData = [
  {
    title:  "کارمندان",
    icon: IoIosPerson,
    count: 200,
    bgColor: "bg-gray-100",
  },
  {
    title:  "حقوق بگیر",
    icon: IoIosPerson,
    count: 200,
    bgColor: "bg-gray-100",
  },
  {
    title: "در مرخصی",
    icon: IoIosEyeOff,
    count: 15,
    bgColor: "bg-blue-100",
  },
  {
    title: "جدیدالورود",
    icon: IoIosPersonAdd,
    count: 25,
    bgColor: "bg-yellow-100",
  },
];


export const shortcutLink = [
  {
    title: "Goals",
    icon: GoGoal,
  },
  {
    title: "Plan",
    icon: GrPlan,
  },
  {
    title: "Stats",
    icon: IoIosStats,
  },
  {
    title: "Setting",
    icon: IoIosSettings,
  },
];

export const users = [
  {
    name: "علی رضایی",
    country: "ایران",
    role: "توسعه‌دهنده پایتون",
    image: user01,
    bgColor: "bg-yellow-100",
  },
  {
    name: "زهرا محمدی",
    country: "ایران",
    role: "توسعه‌دهنده فرانت‌اند",
    image: user02,
    bgColor: "bg-blue-100",
  },
  {
    name: "محمد احمدی",
    country: "ایران",
    role: "توسعه‌دهنده بک‌اند",
    image: user03,
    bgColor: "bg-gray-100",
  },
  {
    name: "فاطمه حسینی",
    country: "ایران",
    role: "توسعه‌دهنده فول‌استک",
    image: user01,
    bgColor: "bg-slate-100",
  },
];

export const events = [
  {
    date: "01 مرداد",
    title: "رویداد آینده",
    description: "لورم ایپسوم متن ساختگی با تولید سادگی",
  },
  {
    date: "15 شهریور",
    title: "کنفرانس سالانه",
    description: "به کنفرانس سالانه ما بپیوندید",
  },
  {
    date: "20 شهریور",
    title: "ملاقات شبکه‌سازی",
    description: "با حرفه‌ای‌های حوزه خود ارتباط برقرار کنید",
  },
];

// ------- ==



