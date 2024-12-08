"use client";
import React, { useState, useEffect } from "react";
import CreateBudget from "./CreateBudget";
import axios from "axios";
import BudgetItem from "./BudgetItem";

const BudgetList = () => {
  const [budgets, setBudgets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBudgets = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:5000/api/budgets");
      console.log("API Response Data:", response.data);
      if (Array.isArray(response.data)) {
        setBudgets(response.data); // Set the budgets correctly
      } else {
        console.error("API response is not an array:", response.data);
      }
    } catch (error) {
      console.error("Error fetching budgets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewBudget = (newBudget) => {
    setBudgets((prevBudgets) => [newBudget, ...prevBudgets]);
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <CreateBudget refreshData={fetchBudgets} onNewBudget={handleNewBudget} />

        {isLoading ? (
          <div className="col-span-full text-center text-gray-500 p-10 shadow-lg bg-gray-100 rounded-md">
            Loading budgets...
          </div>
        ) : budgets.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No budgets found. Create one!
          </p>
        ) : (
          budgets.map((budget) => (
            <BudgetItem key={budget._id}  budget={budget} /> // Pass individual budget object
          ))
        )}
      </div>
    </div>
  );
};

export default BudgetList;
