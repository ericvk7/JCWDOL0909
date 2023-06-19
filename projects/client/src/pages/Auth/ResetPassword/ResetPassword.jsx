import React from "react";
import ResetPasswordForm from "./ResetPasswordForm";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../../features/users/userSlice";

function ResetPassword() {
  const dispatch = useDispatch();

  const handleResetPassword = async (value) => {
    dispatch(resetPassword(value));
  };

  return (
    <div>
      <ResetPasswordForm handleResetPassword={handleResetPassword} />
    </div>
  );
}

export default ResetPassword;
