import React from "react";
import AddCategory from "../../Category/addCategory";
import AdminLayout from "../../../components/AdminLayout";
import TransactionTab from "./TransactionTab";

function AdminTransactions() {
  return (
    <AdminLayout>
      <div>
        <TransactionTab />
      </div>
    </AdminLayout>
  );
}

export default AdminTransactions;
