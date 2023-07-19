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
      id_branch: "",
    },
    report: [],
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
        id_branch: "",
      };
    },
    setReport: (state, action) => {
      state.report = action.payload;
    },
  },
});

export const { setAdmin, resetAdmin, setReport } = adminSlice.actions;
export default adminSlice.reducer;
const userToken = localStorage.getItem("admin_token");

export function loginAdmin(data) {
  return async (dispatch) => {
    try {
      const response = await Axios.post(
        "http://localhost:8000/admin/login",
        data
      );
      if (response.data.success) {
        dispatch(setAdmin(response.data.data));
        localStorage.setItem("admin_token", response.data.token);
        if (response) {
          Swal.fire(response.data.message);
        }
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };
}

export function checkLoginAdmin(token) {
  return async (dispatch) => {
    try {
      let response = await Axios.post(
        "http://localhost:8000/admin/check-login",
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response, "RESPONSE");
      if (response) {
        dispatch(setAdmin(response.data.data));
      } else {
        throw new Error("Failed to check login status.");
      }
    } catch (error) {
      console.log("Error checking login status:", error.message);
    }
  };
}

export function fetchReport() {
  return async (dispatch) => {
    try {
      const response = await Axios.get(
        "http://localhost:8000/admin/fetchreports"
      );
      dispatch(setReport(response.data));
      console.log("fetchReport successful");
      return response.data;
    } catch (error) {
      console.log("Failed to fetch Report: ", error.message);
    }
  };
}
