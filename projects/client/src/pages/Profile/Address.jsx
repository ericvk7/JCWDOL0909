import React from "react";
import { FaPlus } from "react-icons/fa";
import address from "../../img/address.png";

function Address() {
  return (
    <div>
      <section className="p-6 mx-3 bg-white border-2 rounded-md shadow-md mt-4">
        <h2 className="text-lg font-semibold text-gray-700 capitalize ml-4">
          My Address
        </h2>
        <div className="bg-white border-2 justify-center rounded-md shadow-md p-6 mx-3 mt-4">
          <div className="flex justify-end">
            <button className="flex items-center justify-center bg-sky-700 hover:bg-yellow-500 text-white rounded-sm p-2 mt-4">
              <FaPlus className="mr-3" />
              Add a new address
            </button>
          </div>
          <div className="flex items-center justify-center mt-20">
            <img
              src={address}
              alt="Address"
              className="w-52 h-40 text-gray-600 mb-4"
            />
          </div>
          <div className="text-gray-700 text-center mb-32">
            You don't have any address
          </div>
        </div>
      </section>
    </div>
  );
}

export default Address;