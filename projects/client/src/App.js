import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Register from "./pages/Auth/Register/Register";
import Products from "./pages/Products/Product";
import Login from "./pages/Auth/Login/Login";
import { checkLogin } from "./features/users/userSlice";
import { checkLoginAdmin } from "./features/admins/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import AddProduct from "./pages/Products/addProduct";
import AddCategory from "./pages/Category/addCategory";
import Cart from "./pages/Cart/Cart";
import NotFound from "./pages/Error/NotFound";
import Navbar from "./components/Navbar";
import ProductDetailPage from "./pages/Products/ProductDetail";
import VerifyEmail from "./pages/Auth/Activation/VerifyEmail";
import ChangePassword from "./pages/Auth/ChangePassword/ChangePassword";
import ConfirmEmail from "./pages/Auth/ResetPassword/ConfirmEmail";
import ResetPassword from "./pages/Auth/ResetPassword/ResetPassword";
import BeforeLoginNavbar from "./components/BeforeLoginNavbar";
import Profile from "./pages/Profile/Profile";
import ProfilePictureUpload from "./pages/Profile/ProfilePicture";
import LoginAdmin from "./pages/Admin/LoginAdmin/LoginAdmin";
import CreateAdmin from "./pages/Admin/CreateAdmin/CreateAdmin";
import BlankPage from "./pages/Error/BlankPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddProductForm from "./pages/Admin/Product/AddProductForm";
import AddCategoryForm from "./pages/Admin/Product/AddCategoryForm";
import ProductForm from "./pages/Admin/Product/ProductForm";
import EditProductForm from "./pages/Admin/Product/EditProductForm";

function App() {
  const userGlobal = useSelector((state) => state.users.user);
  const adminGlobal = useSelector((state) => state.admins.admin);
  const dispatch = useDispatch();
  const userToken = localStorage.getItem("user_token");
  const adminToken = localStorage.getItem("admin_token");
  const location = useLocation();

  const shouldShowNavbar =
    location.pathname !== "/user/register" &&
    location.pathname !== "/user/login" &&
    location.pathname.toLowerCase() !== "/notfound" &&
    location.pathname !== "/user/verifyEmail/:token" &&
    location.pathname !== "/blankPage" &&
    location.pathname !== "/dashboard" &&
    !location.pathname.startsWith("/admin"); // Menambahkan kondisi untuk routes admin

  useEffect(() => {
    if (userToken) {
      dispatch(checkLogin(userToken));
    } else if (adminToken) {
      dispatch(checkLoginAdmin(adminToken));
    }
  }, [userToken, adminToken]); // Menambahkan dependensi userToken

  console.log(userGlobal.id > 0);
  console.log(userGlobal, "userGlobal");

  return (
    <div>
      {shouldShowNavbar &&
        (userGlobal.id > 0 ? <Navbar /> : <BeforeLoginNavbar />)}

      <Routes>
        {/* {!adminGlobal.id && ( */}
        <>
          <Route path="/user/register" element={<Register />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/verifyEmail/:token" element={<VerifyEmail />} />
          <Route path="/user/confirmEmail" element={<ConfirmEmail />} />
          <Route
            path="/user/resetPassword/:token"
            element={<ResetPassword />}
          />
        </>
        {/* )} */}

        {/* {userGlobal.id > 0 && ( */}
        <>
          <Route path="/product" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/" element={<Products />} />
          <Route path="/user/changePassword" element={<ChangePassword />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route
            path="/user/profilePicture"
            element={<ProfilePictureUpload />}
          />
        </>
        {/* // )} */}
        {adminGlobal.id_role === 1 && (
          <Route path="/admin/createAdmin" element={<CreateAdmin />} />
        )}
        {/* Routes for admin  */}
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/blankPage" element={<BlankPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/addProduct" element={<AddProductForm />} />
        <Route path="/admin/Product" element={<ProductForm />} />
        <Route path="/admin/edit-product/:id" element={<EditProductForm />} />
        <Route path="/admin/addCategory" element={<AddCategoryForm />} />
        <Route path="/category/addCategory" element={<AddCategory />} />
        {/* Routes for super admin  */}

        <Route path="/notfound" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
