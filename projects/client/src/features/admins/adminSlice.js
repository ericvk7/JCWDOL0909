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
<<<<<<< HEAD
    totalProductsSoldBranch: [],
    totalTransactionBranch: [],
    totalUsersBranch: [],
=======
>>>>>>> Features-FP-22
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
<<<<<<< HEAD
    setTotalProductsSoldBranch: (state, action) => {
      state.totalProductsSoldBranch = action.payload;
    },
    setTotalTransactionBranch: (state, action) => {
      state.totalTransactionBranch = action.payload;
    },
    setTotalUsersBranch: (state, action) => {
      state.totalUsersBranch = action.payload;
    },
  },
});

export const {
  setAdmin,
  resetAdmin,
  setTotalProductsSoldBranch,
  setTotalTransactionBranch,
  setTotalUsersBranch,
} = adminSlice.actions;
=======
  },
});

export const { setAdmin, resetAdmin } = adminSlice.actions;
>>>>>>> Features-FP-22
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
<<<<<<< HEAD
      console.log(response, "RESPONSE");
=======

>>>>>>> Features-FP-22
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
<<<<<<< HEAD

export function fetchTotalProductsSoldBranch() {
  return async (dispatch) => {
    try {
      const response = await Axios.get(
        "http://localhost:8000/admin/totalproductssoldbranch"
      );
      dispatch(setTotalProductsSoldBranch(response.data));
      console.log("fetchTotalProductsSoldBranch successful");
    } catch (error) {
      console.log(
        "Failed to fetch Total Products Sold by Branch: ",
        error.message
      );
    }
  };
}

export function fetchTotalTransactionBranch() {
  return async (dispatch) => {
    try {
      const response = await Axios.get(
        "http://localhost:8000/admin/totaltransactionsbranch"
      );
      dispatch(setTotalTransactionBranch(response.data));
    } catch (error) {
      console.log(
        "Failed to fetch Total Transactions by Branch: ",
        error.message
      );
    }
  };
}

export function fetchTotalUsersBranch() {
  return async (dispatch) => {
    try {
      const response = await Axios.get(
        "http://localhost:8000/admin/totalusersbranch"
      );
      dispatch(setTotalUsersBranch(response.data));
    } catch (error) {
      console.log("Failed to fetch Total Users by Branch: ", error.message);
    }
  };
}
=======
>>>>>>> Features-FP-22
