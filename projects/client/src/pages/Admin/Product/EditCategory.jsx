import React, { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";

function EditCategory() {
  const [categories, setCategories] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editValue, setEditValue] = useState("");

  const adminToken = localStorage.getItem("admin_token");

  const dispatch = useDispatch();

  const handleDeleteCategory = async (categoryId) => {
    try {
      console.log(categoryId);

      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This category will be deleted.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        const response = await Axios.delete(
          `http://localhost:8000/admin/deleteCategory/${categoryId}`,
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          }
        );
        fetchCategoryData();
        if (!response.data.success) {
          Swal.fire(response.data);
        } else {
          Swal.fire("Success", response.data.message, "success");
        }
      }
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const fetchCategoryData = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:8000/admin/getCategory"
      );
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderList = () => {
    if (categories.length === 0) {
      return (
        <tr>
          <td colSpan="3" className="px-6 py-4 text-center">
            There's no category, please add first.
          </td>
        </tr>
      );
    }

    return categories.map((category) => (
      <tr
        key={category.id_category}
        className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600 lg:text-lg"
      >
        <td className="px-6 py-4 text-white">{category.id_category}</td>
        <td
          scope="row"
          className="px-6 py-4 font-medium whitespace-nowrap text-white"
        >
          {editMode && category.id_category === editValue ? (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            />
          ) : (
            category.category_name
          )}
        </td>
        <td className="flex items-center px-6 py-4 space-x-3">
          {editMode && category.id_category === editValue ? (
            <button
              className="flex p-2.5 bg-green-500 rounded-xl hover:rounded-3xl hover:bg-green-600 transition-all duration-300 text-white"
              onClick={() => saveEdit(category.id_category)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
          ) : (
            <button
              className="flex p-2.5 bg-yellow-500 rounded-xl hover:rounded-3xl hover:bg-yellow-600 transition-all duration-300 text-white"
              onClick={() => {
                setEditMode(true);
                setEditValue(category.id_category);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
          )}
          <button
            className="flex p-2.5 bg-red-500 rounded-xl hover:rounded-3xl hover:bg-red-600 transition-all duration-300 text-white"
            onClick={() => handleDeleteCategory(category.id_category)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 6l12 12M6 18L18 6"
              />
            </svg>
          </button>
        </td>
      </tr>
    ));
  };

  const saveEdit = (categoryId) => {
    setEditMode(false);
    // Lakukan pengiriman data ke server atau simpan ke state sesuai kebutuhan Anda
    // Setelah pengiriman atau penyimpanan selesai, setEditMode(false) dapat dipanggil untuk keluar dari mode edit
  };

  return (
    <>
      <div className="overflow-x-auto p-6 mx-4 bg-white border-2 rounded-lg shadow-md mt-2">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-300 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                Category Id
              </th>
              <th scope="col" className="px-6 py-3">
                Category Name
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>{renderList()}</tbody>
        </table>
      </div>
    </>
  );
}

export default EditCategory;
