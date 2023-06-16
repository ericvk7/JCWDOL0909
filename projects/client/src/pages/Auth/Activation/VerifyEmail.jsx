import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";

function Verification() {
  const navigate = useNavigate();
  const { token } = useParams();

  const tokenVerification = async () => {
    try {
      const response = await Axios.post(
        "http://localhost:8000/auth/verification",
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      debugger;
      if (response.data.success) {
        Swal.fire({
          text: response.data.message,
          icon: "success",
        }).then(() => {
          navigate("/user/login");
        });
      } else {
        Swal.fire({
          text: response.data.message,
          icon: "error",
        }).then(() => {
          navigate("/notfound");
        });
      }
    } catch (error) {
      Swal.fire({
        text: error.message,
        icon: "error",
      });
    }
  };

  useEffect(() => {
    tokenVerification();
  }, []);

  return (
    <div>
      <p>Your account is already verified</p>
    </div>
  );
}

export default Verification;
