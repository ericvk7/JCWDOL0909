import React, { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";

function SalesReportsList() {
  const adminToken = localStorage.getItem("admin_token");
  const dispatch = useDispatch();
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [sortType, setSortType] = useState("");

  const fetchTransactionsData = async () => {
    try {
      const response = await Axios.get("");
      setTransactions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTransactionsData();
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortType(event.target.value);
  };

  const renderProductTable = () => {
    let filteredTransactions = transactions.filter(
      (transaction) => transaction.category === "product"
    );

    if (selectedDate) {
      filteredTransactions = filteredTransactions.filter(
        (transaction) => transaction.date === selectedDate
      );
    }

    if (sortType === "date") {
      filteredTransactions.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
      });
    } else if (sortType === "sales") {
      filteredTransactions.sort((a, b) => b.totalSales - a.totalSales);
    }

    if (filteredTransactions.length === 0) {
      return (
        <tr>
          <td colSpan="5" className="px-6 py-4 text-center">
            There are no product transactions matching the selected filters.
          </td>
        </tr>
      );
    }

    return filteredTransactions.map((transaction) => (
      <tr
        key={transaction.id_transaction}
        className="border-b bg-blue-200 border-gray-700 hover:bg-blue-300 lg:text-lg"
      >
        <td className="px-6 py-4">{transaction.productName}</td>
        <td className="px-6 py-4">{transaction.price}</td>
        <td className="px-6 py-4">{transaction.quantitySold}</td>
        <td className="px-6 py-4">{transaction.totalSales}</td>
        <td className="px-6 py-4">{transaction.lastPurchaseDate}</td>
      </tr>
    ));
  };

  const renderTransactionTable = () => {
   {/*  let filteredTransactions = transactions.filter(
      (transaction) => transaction.category === "transaction"
    );

    if (selectedDate) {
      filteredTransactions = filteredTransactions.filter(
        (transaction) => transaction.date === selectedDate
      );
    }

    if (sortType === "date") {
      filteredTransactions.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
      });
    } else if (sortType === "sales") {
      filteredTransactions.sort((a, b) => b.totalSales - a.totalSales);
    }

    if (filteredTransactions.length === 0) {
      return (
        <tr>
          <td colSpan="4" className="px-6 py-4 text-center">
            There are no transaction records matching the selected filters.
          </td>
        </tr>
      );
    }

    return filteredTransactions.map((transaction) => (
      <tr
        key={transaction.id_transaction}
        className="border-b bg-yellow-200 border-gray-700 hover:bg-yellow-300 lg:text-lg"
      >
        <td className="px-6 py-4">{transaction.invoice}</td>
        <td className="px-6 py-4">{transaction.itemCount}</td>
        <td className="px-6 py-4">{transaction.totalSales}</td>
        <td className="px-6 py-4">{transaction.transactionDate}</td>
      </tr>
    )); */}
  };

  const renderUserTable = () => {
    {/* let filteredTransactions = transactions.filter(
      (transaction) => transaction.category === "user"
    );

    if (selectedDate) {
      filteredTransactions = filteredTransactions.filter(
        (transaction) => transaction.date === selectedDate
      );
    }

    if (sortType === "date") {
      filteredTransactions.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
      });
    } else if (sortType === "sales") {
      filteredTransactions.sort((a, b) => b.totalSales - a.totalSales);
    }

    if (filteredTransactions.length === 0) {
      return (
        <tr>
          <td colSpan="5" className="px-6 py-4 text-center">
            There are no user transactions matching the selected filters.
          </td>
        </tr>
      );
    }

    return filteredTransactions.map((transaction) => (
      <tr
        key={transaction.id_transaction}
        className="border-b bg-green-200 border-gray-700 hover:bg-green-300 lg:text-lg"
      >
        <td className="px-6 py-4">{transaction.userName}</td>
        <td className="px-6 py-4">{transaction.itemCount}</td>
        <td className="px-6 py-4">{transaction.orderCount}</td>
        <td className="px-6 py-4">{transaction.totalSales}</td>
        <td className="px-6 py-4">{transaction.lastOrderDate}</td>
      </tr>
    )); */}
  };

  return (
    <>
      {/* Filter, Date, and Sort Controls */}
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <label className="mr-2">Filter:</label>
          <select
            className="border border-gray-300 rounded px-3 py-1"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="product">Product</option>
            <option value="transaction">Transaction</option>
            <option value="user">User</option>
          </select>
        </div>
        <div className="flex items-center">
          <label className="mr-2">Date:</label>
          <input
            type="date"
            className="border border-gray-300 rounded px-3 py-1"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
        <div className="flex items-center">
          <label className="mr-2">Sort:</label>
          <select
            className="border border-gray-300 rounded px-3 py-1"
            value={sortType}
            onChange={handleSortChange}
          >
            <option value="">None</option>
            <option value="date">Date</option>
            <option value="sales">Total Sales</option>
          </select>
        </div>
      </div>

      {/* Product Table */}
      {filter === "product" && (
        <div className="overflow-x-auto p-6 mx-4 bg-white border-2 rounded-lg shadow-md mt-2">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            {/* Table Header */}
            <thead className="text-xs text-gray-300 uppercase bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nama Produk
                </th>
                <th scope="col" className="px-6 py-3">
                  Harga Barang
                </th>
                <th scope="col" className="px-6 py-3">
                  Jumlah Terjual
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Penjualan
                </th>
                <th scope="col" className="px-6 py-3">
                  Tanggal Pembelian Terakhir
                </th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>{renderProductTable()}</tbody>
          </table>
        </div>
      )}

      {/* Transaction Table */}
      {filter === "transaction" && (
        <div className="overflow-x-auto p-6 mx-4 bg-white border-2 rounded-lg shadow-md mt-2">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            {/* Table Header */}
            <thead className="text-xs text-gray-300 uppercase bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Invoice
                </th>
                <th scope="col" className="px-6 py-3">
                  Jumlah Item
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Penjualan
                </th>
                <th scope="col" className="px-6 py-3">
                  Tanggal Transaksi
                </th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>{renderTransactionTable()}</tbody>
          </table>
        </div>
      )}

      {/* User Table */}
      {filter === "user" && (
        <div className="overflow-x-auto p-6 mx-4 bg-white border-2 rounded-lg shadow-md mt-2">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            {/* Table Header */}
            <thead className="text-xs text-gray-300 uppercase bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nama User
                </th>
                <th scope="col" className="px-6 py-3">
                  Jumlah Item
                </th>
                <th scope="col" className="px-6 py-3">
                  Jumlah Order
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Transaksi
                </th>
                <th scope="col" className="px-6 py-3">
                  Tanggal Order Terakhir
                </th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>{renderUserTable()}</tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default SalesReportsList;
