import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
import Swal from "sweetalert2";

export const adminSlice = createSlice({
  name: "admins",
  initialState: {
    admin: {
      id: "",
      name: "",
      email: "",
      id_role: "",
    },
  },
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
    resetAdmin: (state) => {
      state.admin = {
        id: "",
        name: "",
        email: "",
        id_role: "",
      };
    },
  },
});

export const { setAdmin, resetAdmin } = adminSlice.actions;
export default adminSlice.reducer;
const userToken = localStorage.getItem("user_token");

export function loginAdmin(data) {
  return async (dispatch) => {
    try {
      const response = await Axios.post(
        "http://localhost:8000/admin/login",
        data
      );
      if (response.data.success) {
        dispatch(setAdmin(response.data.data));
        localStorage.setItem("user_token", response.data.token);
        if (response) {
          Swal.fire(response.data.message);
        }
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };
}

export function checkLoginAdmin(token) {
  return async (dispatch) => {
    // console.log(token)
    let response = await Axios.post(
      "http://localhost:8000/admin/check-login",
      {},
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    if (response) {
      dispatch(setAdmin(response.data.data));
    }
  };
}
