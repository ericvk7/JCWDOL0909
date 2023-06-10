import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmEmailForm from "./ResetPasswordForm";
import { resetPassword } from "../../../features/users/userSlice";

function ConfirmEmail() {
  const dispatch = useDispatch();

  const handleConfirmEmail = async (value) => {
    dispatch(confirmEmail(value));
  };
  return (
    <div>
      <ConfirmEmailForm handleConfirmEmail={handleConfirmEmail} />
    </div>
  );
}

export default ConfirmEmail;
