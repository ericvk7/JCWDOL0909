import React, { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";

function EditCategory() {
  const [categories, setCategories] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [editCategoryId, setEditCategoryId] = useState(null);

  const adminToken = localStorage.getItem("admin_token");

  const dispatch = useDispatch();

  const handleDeleteCategory = async (categoryId) => {
    try {
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

  const handleEditCategory = (categoryId, categoryName) => {
    setEditMode(true);
    setEditValue(editValue);
    setEditCategoryId(categoryId);
  };

  const handleSaveEdit = async (categoryId) => {
    try {
      // Make the API call to update the category with the new name
      const response = await Axios.patch(
        `http://localhost:8000/admin/editCategory/${categoryId}`,
        {
          categoryName: editValue,
        },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      if (response.data.success) {
        Swal.fire("Error", response.data, "error");
      } else {
        setEditMode(false); // Exit edit mode
        Swal.fire("Success", response.data, "success");
      }
      fetchCategoryData(); // Refresh the category data
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
          {editMode && category.id_category === editCategoryId ? (
            <input
              type="text"
              onChange={(e) => setEditValue(e.target.value)}
              value={editValue || ""}
              onBlur={() => setEditMode(false)}
              className={
                editMode && category.id_category === editCategoryId
                  ? "text-black"
                  : ""
              }
            />
          ) : (
            <span>{category.category_name}</span>
          )}
        </td>

        <td className="flex items-center px-6 py-4 space-x-3">
          {editMode && category.id_category === editCategoryId ? (
            <>
              <button
                className="flex p-2.5 bg-green-500 rounded-xl hover:rounded-3xl hover:bg-green-600 transition-all duration-300 text-white"
                onClick={() => handleSaveEdit(category.id_category)}
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
                <span className="ml-2">Save</span>
              </button>

              <button
                className="flex p-2.5 bg-red-500 rounded-xl hover:rounded-3xl hover:bg-red-600 transition-all duration-300 text-white"
                onClick={() => setEditMode(false)}
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span className="ml-2">Cancel</span>
              </button>
            </>
          ) : (
            <>
              <button
                className="flex p-2.5 bg-yellow-500 rounded-xl hover:rounded-3xl hover:bg-yellow-600 transition-all duration-300 text-white"
                onClick={() =>
                  handleEditCategory(
                    category.id_category,
                    category.category_name
                  )
                }
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
                <span className="ml-2">Edit</span>
              </button>

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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span className="ml-2">Delete</span>
              </button>
            </>
          )}
        </td>
      </tr>
    ));
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
