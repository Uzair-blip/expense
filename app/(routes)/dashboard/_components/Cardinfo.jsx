"use client";
import { PiggyBank, ReceiptText, Wallet } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const Cardinfo = ({ budgets = [] }) => {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state

  const calculateCardInfo = () => {
    let totalBudget_ = 0;
    let totalSpent_ = 0;

    budgets.forEach((element) => {
      totalBudget_ += element.expenseLimit;
      totalSpent_ += element.totalSpent;
    });

    setTotalBudget(totalBudget_);
    setTotalSpent(totalSpent_);
    setLoading(false); // Turn off loading once data is calculated
  };

  useEffect(() => {
    if (budgets.length > 0) {
      setLoading(true); // Enable loading when budgets are updated
      calculateCardInfo();
    }
  }, [budgets]);

  return (
    <div className="m-10 grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-3">
      {/* Total Budget Card */}
      <div
        className={`border p-7 rounded-lg flex justify-between items-center transition-all duration-300 ${
          loading ? 'shadow-lg shadow-blue-400' : ''
        }`}
      >
        <div>
          <h1 className="text-sm">Total Budget</h1>
          <h1 className="text-2xl font-bold">
            {loading ? 'Loading...' : `$${totalBudget.toLocaleString()}`}
          </h1>
        </div>
        <PiggyBank className="p-2 w-12 h-12 rounded-full bg-blue-600 text-white" />
      </div>

      {/* Total Spent Card */}
      <div  
        className={`border p-7 rounded-lg flex justify-between items-center transition-all duration-300 ${
          loading ? 'shadow-lg shadow-blue-400' : ''
        }`}
      >
        <div>
          <h1 className="text-sm">Total Spent</h1>
          <h1 className="text-2xl font-bold">
            {loading ? 'Loading...' : `$${totalSpent.toLocaleString()}`}
          </h1>
        </div>
        <ReceiptText className="p-2 w-12 h-12 rounded-full bg-blue-600 text-white" />
      </div>

      {/* Number of Budgets Card */}
      <div
        className={`border p-7 rounded-lg flex justify-between items-center transition-all duration-300 ${
          loading ? 'shadow-lg shadow-blue-400' : ''
        }`}
      >
        <div>
          <h1 className="text-sm">Number of Budgets</h1>
          <h1 className="text-2xl font-bold">
            {loading ? 'Loading...' : budgets.length}
          </h1>
        </div>
        <Wallet className="p-2 w-12 h-12 rounded-full bg-blue-600 text-white" />
      </div>
    </div>
  );
};

export default Cardinfo;
