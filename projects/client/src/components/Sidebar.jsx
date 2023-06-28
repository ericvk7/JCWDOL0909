import React from "react";
import logo from "../img/Logo-white.PNG";
import {
  FaEnvelope,
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
  return (
    <div>
      <div
        id="Main"
        className="xl:rounded-r transform  xl:translate-x-0  ease-in-out transition duration-500 flex justify-start items-start w-80 bg-gray-900 flex-col py-14 px-8"
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
              <p className="text-2xl leading-8">Logout</p>
            </button>
          </div>
          <div class="flex justify-center items-center  space-x-2 my-11">
            <div>
              <img
                class="rounded-full"
                src="https://i.ibb.co/L1LQtBm/Ellipse-1.png"
                alt="avatar"
              />
            </div>
            <div class="flex justify-start flex-col items-start">
              <p class="cursor-pointer text-lg leading-5 text-white">
                Alexis Enache
              </p>
              <p class="cursor-pointer text-base leading-3 text-gray-300">
                alexis81@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
