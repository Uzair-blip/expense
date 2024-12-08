"use client";
import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../../../lib/firebase"; // Ensure Firebase is initialized properly
import Cardinfo from "./_components/Cardinfo";
import axios from "axios";
import BarChartComponent from "./_components/BarChartComponent";
import BudgetItem from "./budget/_components/BudgetItem";
import ExpenseListTable from "./expense/[id]/_components/ExpenseListTable";

const Page = () => {
  const [user, setUser] = useState(null);
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
   
  try { const response = await axios.get("http://localhost:5000/api/expenses/");
    console.log("Fetched expenses:", response.data);
    
    if (response.data.success && Array.isArray(response.data.expenses)) {
      setExpenses(response.data.expenses); // Ensure correct key
    } else {
     
      setExpenses([]);
    }
  }    
  catch (err) {
      console.error(err);
      setExpenses([]);
    }
  };
  
  const fetchBudgets = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/budgets");
      if (Array.isArray(response.data)) {
        setBudgets(response.data);
      } else {
        console.error("API response is not an array:", response.data);
        setBudgets([]); // Default to empty array if invalid
      }
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

  useEffect(() => {
    fetchBudgets();
    fetchExpenses();
  }, []);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup on component unmount
  }, []);

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold m-10">
          Hi <span className="text-blue-600">{user ? user.email : "Guest"}</span>{" "}
          <span className="text-yellow-500">✌</span>
        </h1>
        <p className="text-xl text-gray-500 ml-10">
          Here what's happening with your budget. Let's manage your expenses.
        </p>
            <Cardinfo budgets={budgets} />
            <div className="grid grid-cols-1 md:grid-cols-3 ">
              <div className="md:col-span-2">
                <BarChartComponent budgets={budgets} />
                <div>
                  <ExpenseListTable expenses={expenses}  />
                </div>
              </div>
              <div className="">
                <h2 className="ml-10 font-bold text-xl">Latest Budgets</h2>
                {budgets.map((budget, index) => (
                  <BudgetItem budget={budget} key={index} />
                ))}
              </div>
            </div>
       
      </div>
    </div>
  );
};

export default Page;
