// import React from 'react'
// import { useNavigate } from 'react-router-dom'

// function VerifyEmail() {
// const navigate = useNavigate();

//   return (
//     <div className="bg-sky-950 relative overflow-hidden min-h-screen">
//       <img
//         src="https://c4.wallpaperflare.com/wallpaper/12/998/379/blue-neon-pastel-blur-wallpaper-thumb.jpg"
//         alt=""
//         className="absolute h-full w-full object-cover"
//       />
//       <div className="inset-0 bg-black opacity-25 absolute"></div>
//       <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
//         <div className="w-full font-mono flex flex-col items-center relative z-10">
//           <h5 className="text-xs md:text-xl lg:text-2xl text-center text-white leading-tight mt-4">
//             Click This Button to Activate your Account
//           </h5>
//           <button className="bt-1 text-xs md:text-xl lg:text-2xl text-center text-white leading-tight mt-4">
//             Activate
//           </button>
//           <p className="font-extrabold text-4xl md:text-6xl lg:text-8xl my-44 text-white animate-bounce">
//             404
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default VerifyEmail

import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";

function Verification() {
  const navigate = useNavigate();

  let { token } = useParams();

  const tokenVerification = async () => {
    try {
      if (token) {
        const response = await Axios.post(
          "http://localhost:8000/auth/verification",
          {},
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          alert(response.data.message);
          navigate("/user/login");
        } else {
          alert(response.data.message || "Link expired or invalid");
navigate("/notfound")
        }
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    tokenVerification();
  }, []);

  return (
    <div>
      <p>Your account already verified</p>
    </div>
  );
}

export default Verification;