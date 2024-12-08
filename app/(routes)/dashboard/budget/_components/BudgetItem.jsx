"use client";
import React from "react";
import Link from "next/link";
import axios from "axios";

const BudgetItem = ({ budget, refreshData }) => {

  const handleAddExpense = async (expense) => {
    try {
      const response = await axios.post("http://localhost:5000/api/expenses/add-expense", {
        ...expense,
        budgetId: budget._id,
      });
  
      refreshData(); // Refresh budgets after expense addition
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };
  
  if (!budget) return null; // Safeguard for empty data

  return (
    <Link
      href={`/dashboard/expense/${budget._id}`}
    >
      <div  className="m-10 w-[90%] ml-10 hover:shadow-md p-10 rounded-md border-2 border-dashed cursor-pointer h-[200px]"
      >

      
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <span className="text-2xl p-3 rounded-full px-4 bg-slate-100">
            {budget.emoji || "💰"}
          </span>
          <h3 className="text-lg font-bold">{budget.budgetName || "Untitled"}</h3>
        </div>
        <h3 className="text-2xl text-blue-600">${budget.expenseLimit || 0}</h3>
      </div>
      <h3 className="mt-3">{(budget.expenses && budget.expenses.length) || 0} item</h3>
      <div className="flex justify-between items-center">
        <h2 className="text-xl text-gray-500">Spent: ${budget.totalSpent || 0}</h2>
        <h2 className="text-xl text-gray-500">
          Remaining: ${(budget.expenseLimit || 0) - (budget.totalSpent || 0)}
        </h2>
      </div>
      <div className="mt-3 w-full bg-slate-300 h-3 rounded-sm">
        <div
          className="mt-3 bg-blue-600 h-3 rounded-sm"
          style={{
            width: budget.expenseLimit > 0
              ? `${(budget.totalSpent / budget.expenseLimit) * 100}%`
              : "0%",
          }}
        ></div>
      </div>

      </div>
    </Link>
  );
};

export default BudgetItem;
