import React, { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";

function TransactionsList() {
  const adminToken = localStorage.getItem("admin_token");
  const dispatch = useDispatch();
  const [transactions, setTransactions] = useState([])
  
  const fetchTransactionsData = async () => {
    try {
      const response = await Axios.get(
        ""
      );
      setTransactions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTransactionsData();
  }, []);


  const renderList = () => {
    if (transactions.length === 0) {
      return (
        <tr>
          <td colSpan="3" className="px-6 py-4 text-center">
            There's no transactions, please wait.
          </td>
        </tr>
      );
    }
  
    return transactions.map((transaction) => (
      <tr
        key={transaction.id_transaction}
        className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600 lg:text-lg"
      >
        <td className="px-6 py-4 text-white">{transaction.id_transaction}</td>
        <td
          className="px-6 py-4 font-medium whitespace-nowrap text-white"
        >
          
            <span>{transaction.product}</span>
        </td>
  
        <td className="flex items-center px-6 py-4 space-x-3">
              <button
                className="flex p-2.5 bg-yellow-500 rounded-xl hover:rounded-3xl hover:bg-yellow-600 transition-all duration-300 text-white"
                onClick={() => console.log("Edit clicked")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                <span className="ml-2">Detail</span>
              </button>
        </td>
      </tr>
    ));
  };
  

  return (
    <>
      <div className="overflow-x-auto p-6 mx-4 bg-white border-2 rounded-lg shadow-md mt-2">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-300 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                Invoice
              </th>
              <th scope="col" className="px-6 py-3">
                Products
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>{renderList()}</tbody>
        </table>
      </div>
    </>
  );
}

export default TransactionsList;
