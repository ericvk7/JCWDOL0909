import React from "react";

function ProfileForm() {
  return (
    <>
      <section className=" p-6 mx-4 bg-white border-2 rounded-lg shadow-md mt-4">
        <h1 className="text-xl font-bold text-black capitalize">
          User Profile
        </h1>
        <form>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-1 mx">
            <div>
              <label className="text-black" for="emailAddress">
                Email Address
              </label>
              <input
                id="emailAddress"
                type="email"
                className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-400 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-black" for="fullName">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-400 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-black" for="phoneNumber">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-400 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <span className="text-black">Gender</span>
              <div className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-400 rounded-md focus:outline-none focus:ring">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    name="accountType"
                    value="male"
                  />
                  <span className="ml-2">Male</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    className="form-radio"
                    name="accountType"
                    value="female"
                  />
                  <span className="ml-2">Female</span>
                </label>
              </div>
            </div>

            <div>
              <label className="text-black" for="passwordConfirmation">
                Date
              </label>
              <input
                id="date"
                type="date"
                className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-400 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
              Save
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default ProfileForm;
