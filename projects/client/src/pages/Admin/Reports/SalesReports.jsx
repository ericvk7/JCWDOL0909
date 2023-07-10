import React from "react";
import AddCategory from "../../Category/addCategory";
import AdminLayout from "../../../components/AdminLayout";
import TransactionsTab from "./SalesReportsTab";

function AdminTransactions() {
  return (
    <AdminLayout>
      <div>
        <TransactionsTab />
      </div>
    </AdminLayout>
  );
}

export default AdminTransactions;
