import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../features/users/userSlice";
import Axios from "axios";

function UpdateProfile() {
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [initialImagePath, setInitialImagePath] = useState("");
  const Token = localStorage.getItem("user_token");
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    if (user && user.imagePath) {
      setImageSrc(`http://localhost:8000/${user.imagePath}`);
      setInitialImagePath(user.imagePath);
    }
  }, [user]);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
    let preview = document.getElementById("imagepreview");
    preview.src = URL.createObjectURL(event.target.files[0]);
    setShowButtons(true);
  };

  const uploadImage = async () => {
    setIsLoading(true);

    if (file) {
      let formData = new FormData();
      formData.append("file", file);

      try {
        const response = await Axios.post(
          "http://localhost:8000/user/uploadProfilePicture",
          formData,
          {
            headers: {
              authorization: `Bearer ${Token}`,
            },
          }
        );
        if (!response.error) {
          setImageSrc(`http://localhost:8000/${response.data.filepath}`);
          alert("Upload success!");
          dispatch(setUser({ ...user, imagePath: response.data.filepath }));
        }
      } catch (error) {
        console.error(error);
        alert("Upload failed!");
      }
    } else {
      alert("Select an image first!");
    }

    setIsLoading(false);
  };

  const cancelUpload = () => {
    setShowButtons(false);

    setImageSrc(`http://localhost:8000${user.imagePath}`);
  };

  return (
    <div className="w-3/4 m-auto bg-blue-200">
      <div className="flex flex-col items-center">
        <div className="mb-4">
          <img
            id="imagepreview"
            className="w-40 h-40 rounded-full object-cover border-4 border-white"
            src={imageSrc}
            alt="Profile Avatar"
          />
        </div>

        <div>
          <label
            htmlFor="file"
            className="cursor-pointer inline-block bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            {isLoading ? "Cancel" : "Change Profile Photo"}
          </label>
          <input
            type="file"
            id="file"
            className="hidden"
            onChange={(event) => {
              onFileChange(event);
            }}
          />
        </div>

        {showButtons && (
          <div className="mt-4">
            <button
              className="bg-red-400 px-4 py-2 rounded-md hover:bg-red-500"
              onClick={cancelUpload}
            >
              Cancel
            </button>
            {isLoading ? (
              <button
                className="bg-green-400 px-4 py-2 rounded-md hover:bg-green-500"
                onClick={uploadImage}
                disabled
              >
                Upload
              </button>
            ) : (
              <button
                className="bg-green-400 px-4 py-2 rounded-md hover:bg-green-500"
                onClick={uploadImage}
              >
                Upload
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default UpdateProfile;
