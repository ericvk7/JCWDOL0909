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
    }
  }, [user]);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
    setImageSrc(URL.createObjectURL(event.target.files[0]));
    // let preview = document.getElementById("imagepreview");
    // preview.src = URL.createObjectURL(event.target.files[0]);
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
          setShowButtons(false);
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
    setFile(null);

    setShowButtons(false);

    setImageSrc(`http://localhost:8000${user.imagePath}`);
  };

  return (
    <div className="w-1/4 m-auto bg-white">
      <div className="flex flex-col items-center py-10 border-dashed border-2 border-slate-400">
        <div className="mb-4">
          <img
            id="imagepreview"
            className="w-32 h-32 rounded-full object-cover border-4"
            src={imageSrc}
            alt="Profile Avatar"
          />
        </div>

        {!showButtons && (
          <div>
            <label
              htmlFor="file"
              className="cursor-pointer inline-block py-2 bg-sky-950 text-white px-4 rounded-md hover:bg-[#EDA415]"
            >
              Change Profile Photo
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
        )}

        {showButtons && (
          <div>
            <button
              className="bg-red-400 mr-4 px-4 py-2 rounded-md hover:bg-red-200"
              onClick={cancelUpload}
            >
              Cancel
            </button>
            {isLoading ? (
              <button
                className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-[#EDA415]"
                onClick={uploadImage}
                disabled
              >
                Upload
              </button>
            ) : (
              <button
                className="bg-sky-800 px-4 text-white py-2 rounded-md hover:bg-[#EDA415]"
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
