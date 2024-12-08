"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Trash } from "lucide-react";

const ExpenseListTable = ({ budgetId}) => {
  const [expenses, setExpenses] = useState([]); // Default as empty array
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch expenses
  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);
      setError(null); // Reset error state

      try {
        const endpoint = budgetId
          ? `http://localhost:5000/api/expenses/${budgetId}`
          : `http://localhost:5000/api/expenses/`;

        const response = await axios.get(endpoint);
        console.log("Fetched expenses:", response.data);

        if (response.data.success) {
          setExpenses(Array.isArray(response.data.expenses) ? response.data.expenses : []);
        } else {
          setError("No expenses found.");
          setExpenses([]); // Clear state if API response fails
        }
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching expenses.");
        console.error(err);
        setExpenses([]); // Clear state in case of error
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, [budgetId]);

  // Handle delete expense
  const handleDeleteExpense = useCallback(
    async (expenseId) => {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/expenses/delete-expense/${budgetId}/${expenseId}`
        );

        if (response.data.success) {
          setExpenses((prevExpenses) =>
            prevExpenses.filter((expense) => expense._id !== expenseId)
          );
        } else {
          setError("Failed to delete expense.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Error deleting expense.");
        console.error("Error deleting expense:", err);
      }
    },
    [budgetId]
  );

  return (
    <div className="mt-5 w-full max-w-4xl mx-auto">
      <h1 className="font-bold text-2xl text-gray-800 mb-5 px-4">Expenses</h1>

      {/* Header row */}
      <div className="grid grid-cols-4 bg-gray-100 p-4 border rounded-t-lg">
        <h2 className="font-bold text-gray-600">Name</h2>
        <h2 className="font-bold text-gray-600">Amount</h2>
        <h2 className="font-bold text-gray-600">Date</h2>
        <h2 className="font-bold text-gray-600 text-center">Action</h2>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 mt-4">Loading expenses...</p>
      ) : error ? (
        <p className="text-red-500 mt-2 px-4">{error}</p>
      ) : expenses.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">No expenses found</p>
      ) : (
        expenses.map((expense) => (
          <div
            key={expense._id}
            className="grid grid-cols-4 bg-white p-4 border-b border-gray-200 hover:bg-gray-50 transition"
          >
            <span className="font-medium text-gray-800">{expense.expenseName}</span>
            <span className="text-green-600 font-bold">${expense.amount}</span>
            <span className="text-gray-500">
              {expense.date ? new Date(expense.date).toLocaleDateString() : "No date"}
            </span>
            <button
              className="text-red-600 hover:text-red-800 flex justify-center"
              onClick={() => handleDeleteExpense(expense._id)}
            >
              <Trash />
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ExpenseListTable;
