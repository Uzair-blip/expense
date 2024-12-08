"use client";
import React, { useState } from "react";
import axios from "axios";

const AddExpense = ({ budgetId, onExpenseAdded }) => {
    const [expenseName, setExpenseName] = useState("");
    const [amount, setAmount] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!expenseName || !amount) {
        setError("All fields are required.");
        return;
      }
  
      try {
        setIsLoading(true);
        const response = await axios.post("http://localhost:5000/api/expenses/add-expense", {
          budgetId,
          expenseName,
          amount: parseFloat(amount),
        });
  
        console.log("Expense added:", response.data);
        setExpenseName("");
        setAmount("");
        onExpenseAdded(); // Notify parent component to refresh budget data
      } catch (err) {
        console.error("Error adding expense:", err);
        setError("Failed to add expense.");
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div className="p-5 bg-gray-100 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4">Add New Expense</h2>
  
        {error && <div className="text-red-500 mb-2">{error}</div>}
  
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Expense Name</label>
            <input
              type="text"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter expense name"
            />
          </div>
  
          <div>
            <label className="block font-medium mb-1">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter amount"
            />
          </div>
  
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? "Adding..." : "Add Expense"}
          </button>
        </form>
      </div>
    );
  };
  
  export default AddExpense;
  
