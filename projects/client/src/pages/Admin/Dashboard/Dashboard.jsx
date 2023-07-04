import React from "react";
import Sidebar from "../../../components/Sidebar";
import AdminLayout from "../../../components/AdminLayout";
import { useSelector } from "react-redux";
import SuperAdminCard from "./dashboardCard/SuperAdminCard";

function Dashboard() {
  const adminGlobal = useSelector((state) => state.admins.admin);

  return (
    <AdminLayout>
      {adminGlobal.id_role === 2 ? (
        <div>Ini Dashboard Branch Admin</div>
      ) : (
        <SuperAdminCard />
      )}
    </AdminLayout>
  );
}

export default Dashboard;
