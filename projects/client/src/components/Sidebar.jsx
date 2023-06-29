import React from "react";
import logo from "../img/Logo-white.PNG";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetAdmin } from "../features/admins/adminSlice";
import Swal from "sweetalert2";
import {
  FaShieldAlt,
  FaCog,
  FaBell,
  FaLock,
  FaBullseye,
  FaChartBar,
  FaUserShield,
  FaSignOutAlt,
} from "react-icons/fa";
import { RiMessage2Line } from "react-icons/ri";

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const adminGlobal = useSelector((state) => state.admins.admin);
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user_token");
        dispatch(resetAdmin());
        Swal.fire(
          "Logged Out!",
          "You have been successfully logged out.",
          "success"
        ).then(() => {
          navigate("/admin/login");
        });
      }
    });
  };

  return (
    <div>
      <div
        id="Main"
        className="xl:rounded-r transform  xl:translate-x-0 h-screen ease-in-out transition duration-500 flex justify-start items-start w-80 bg-gray-900 flex-col py-14 px-8"
      >
        <div className="flex justify-between  items-center space-x-3 pl-4 mb-10">
          <img
            id="imagepreview"
            className="w-12 h-12 rounded-full object-cover border-4"
            src={logo}
            alt="Profile Avatar"
          />
          <p className="text-2xl leading-6 text-white">E-Grocery</p>
        </div>

        <div className="flex flex-col justify-start items-center px-6 border-t border-gray-600 w-full pt-10 ">
          <div
            id="menu1"
            className="flex justify-start  flex-col w-full md:w-auto items-start pb-1 pt-10"
          >
            <button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
              <RiMessage2Line className="text-xl" />
              <p className="text-2xl leading-8 ">Messages</p>
            </button>
            <button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
              <FaShieldAlt className="text-xl" />
              <p className="text-2xl leading-8   ">Security</p>
            </button>
            <button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2 w-full md:w-52">
              <FaCog className="text-xl" />
              <p className="text-2xl leading-8   ">Settings</p>
            </button>
            <button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2 w-full md:w-52">
              <FaBell className="text-xl" />
              <p className="text-2xl leading-8   ">Notifications</p>
            </button>
            <button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
              <FaLock className="text-xl" />
              <p className="text-2xl leading-8   ">Passwords</p>
            </button>
            <button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
              <FaBullseye className="text-xl" />
              <p className="text-2xl leading-8   ">Goals</p>
            </button>
            <button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
              <FaChartBar className="text-xl" />
              <p className="text-2xl leading-8   ">Dashboard</p>
            </button>
            <button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
              <FaUserShield className="text-xl" />
              <p className="text-2xl leading-8   ">Admins</p>
            </button>
            <button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2 w-full md:w-52">
              <FaSignOutAlt className="text-xl" />
              <p className="text-2xl leading-8" onClick={handleLogout}>
                Logout
              </p>
            </button>
          </div>
          <div class="flex justify-center items-center  space-x-2 my-32">
            <div>
              <img
                class="rounded-full"
                src="https://i.pinimg.com/474x/c6/e9/ed/c6e9ed167165ca99c4d428426e256fae.jpg"
                alt="avatar"
              />
            </div>
            <div class="flex justify-start flex-col items-start">
              <p class="cursor-pointer text-lg leading-5 text-white">
                {adminGlobal.name}
              </p>
              <p class="cursor-pointer text-base leading-3 text-gray-300">
                {adminGlobal.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
