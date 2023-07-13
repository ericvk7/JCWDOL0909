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
    totalRevenueByBranch: [],
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
    setTotalRevenueByBranch: (state, action) => {
      state.totalRevenueByBranch = action.payload;
    },
  },
});

export const { setAdmin, resetAdmin, setTotalRevenueByBranch } =
  adminSlice.actions;
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
        localStorage.setItem("admin_token", response.data.token);
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
      if (response.status === 200) {
        dispatch(setAdmin(response.data.data));
      } else {
        throw new Error("Failed to check login status.");
      }
    } catch (error) {
      // Error handling
      console.log("Error checking login status:", error.message);
      // Tambahkan kode untuk memberikan umpan balik yang sesuai kepada pengguna
    }
  };
}

export function fetchTotalRevenueByBranch() {
  return async (dispatch) => {
    try {
      const response = await Axios.get(
        "http://localhost:8000/admin/totalrevenuebybranch"
      );
      dispatch(setTotalRevenueByBranch(response.data));
      console.log("fetchTotalRevenueByBranch successful");
    } catch (error) {
      console.log(
        "Failed to fetch Total Products Sold by Branch: ",
        error.message
      );
    }
  };
}
