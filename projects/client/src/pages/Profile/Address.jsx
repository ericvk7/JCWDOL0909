import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import address from "../../img/address.png";
import { useSelector } from "react-redux";
import Axios from "axios";

function Address() {
  const userGlobal = useSelector((state) => state.users.user);
  const [addressList, setAddressList] = useState([]);
  const userToken = localStorage.getItem("user_token");

  useEffect(() => {
    fetchAddressData();
  }, []);

  const fetchAddressData = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:8000/user/fetchAddress",
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setAddressList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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

          {userGlobal.address > 0 ? (
            <div>
              {addressList.map((address) => (
                <div key={address.id}>
                  <div className="flex  justify-between items-center py-4">
                    <div className="flex items-center space-x-2 justify-start">
                      <div className="text-base">{address.name}</div>
                      <div>{`(+62) ${address.phoneNumber.substring(1)}`}</div>
                    </div>
                  </div>
                  <div className="py-2">
                    <div className="text-sm mb-2">{address.address}</div>
                    <div className="text-sm">
                      {address.city.toUpperCase()},{" "}
                      {address.province.toUpperCase()}, {address.postalCode}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-4 mb-4">
                    <button className="px-5 py-2 hover:bg-yellow-400 bg-blue-900  text-white rounded-md transition duration-300">
                      Edit
                    </button>
                    <button className="px-5 py-2 hover:bg-yellow-400 bg-blue-900 text-white rounded-md transition duration-300">
                      Delete
                    </button>
                  </div>
                  <hr />
                </div>
              ))}
            </div>
          ) : (
            <div>
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
          )}
        </div>
      </section>
    </div>
  );
}

export default Address;
