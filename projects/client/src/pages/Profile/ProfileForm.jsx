import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function ProfileForm() {
  const user = useSelector((state) => state.users.user);
  const [isEditing, setIsEditing] = useState(false); // State variable for editing mode

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    fullName: Yup.string().required("Required"),
    phoneNumber: Yup.string().required("Required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    // Handle form submission here
    console.log(values);
    setSubmitting(false);
    setIsEditing(false); // Disable editing mode after form submission
  };

  const handleEditClick = () => {
    setIsEditing(true); // Enable editing mode when the edit button is clicked
  };

  return (
    <section className="p-6 mx-4 bg-white border-2 rounded-lg shadow-md mt-4">
      <h1 className="text-xl font-bold text-black capitalize">User Profile</h1>
      <Formik
        initialValues={{
          email: user.email,
          fullName: user.name || "",
          phoneNumber: user.phoneNumber || "",
          gender: user.gender || "",
          date: user.birthday || "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, handleChange }) => (
          <Form>
            {JSON.stringify(user)}
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-1 mx">
              <div>
                <label className="text-black" htmlFor="emailAddress">
                  Email Address
                </label>
                <Field
                  id="email"
                  type="email"
                  name="email"
                  Value={user.email}
                  // onChange={handleChange}
                  className={`block w-full px-4 py-2 mt-2 text-black bg-white border ${
                    isEditing ? "border-gray-400" : "border-gray-200"
                  } rounded-md focus:border-blue-500 focus:outline-none focus:ring`}
                />

                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div>
                <label className="text-black" htmlFor="fullName">
                  Full Name
                </label>
                <Field
                  id="fullName"
                  type="text"
                  name="fullName"
                  className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-400 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div>
                <label className="text-black" htmlFor="phoneNumber">
                  Phone Number
                </label>
                <Field
                  id="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  value={user.phone}
                  className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-400 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div>
                <span className="text-black">Gender</span>
                <div className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-400 rounded-md focus:outline-none focus:ring">
                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="gender"
                      value="male"
                      className="form-radio"
                    />
                    <span className="ml-2">Male</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <Field
                      type="radio"
                      name="gender"
                      value="female"
                      className="form-radio"
                    />
                    <span className="ml-2">Female</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="text-black" htmlFor="date">
                  Date
                </label>
                <Field
                  id="date"
                  type="date"
                  name="date"
                  className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-400 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                />
                <ErrorMessage
                  name="date"
                  component="div"
                  className="text-red-500"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={handleEditClick}
                  className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                >
                  Edit
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-400 focus:outline-none focus:bg-green-400"
                >
                  Save
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
}

export default ProfileForm;
