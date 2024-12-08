"use client";

import EmojiPicker from "emoji-picker-react";
import React, { useState } from "react";
import axios from "axios";
// CreateBudget Component
const CreateBudget = ({ refreshData,onNewBudget}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [budgetName, setBudgetName] = useState("");
  const [expenseLimit, setExpenseLimit] = useState("");
  const [emoji, setEmoji] = useState("😀");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    // Prepare data
    const budgetData = {
      budgetName,
      expenseLimit: parseFloat(expenseLimit),
      emoji,
    };
  
    try {
      // Send POST request
      const response = await axios.post("http://localhost:5000/api/budgets/create", budgetData);
      console.log("Budget created successfully:", response.data);
      onNewBudget(response.data); // Notify the parent to add the new budget first
      refreshData(); // Refresh data by calling the function passed via props
      setBudgetName("");
      setExpenseLimit("");
      setEmoji("😀");
      setIsPopupOpen(false);
    } catch (error) {
      console.error("Error creating budget:", error.response?.data || error.message);
    }
  };
  

  return (
    <div className="flex flex-col items-center">
      <div
        className="bg-slate-200 mt-10 w-[100%] ml-10 hover:shadow-md p-10 rounded-md flex items-center flex-col border-2 border-dashed cursor-pointer"
        onClick={() => setIsPopupOpen(true)}
      >
        <h1 className="text-xl">+</h1>
        <h2>Create Budget</h2>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-[30%] relative">
            <h2 className="text-lg font-bold mb-6">Create Budget</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">Pick Emoji</label>
                <div
                  className="flex items-center cursor-pointer space-x-4"
                  onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
                >
                  <span className="text-2xl">{emoji}</span>
                  {emojiPickerOpen && (
                    <div className="absolute z-10">
                      <EmojiPicker
                        onEmojiClick={(emojiObject) => {
                          setEmoji(emojiObject.emoji);
                          setEmojiPickerOpen(false);
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Budget Name</label>
                <input
                  type="text"
                  value={budgetName}
                  onChange={(e) => setBudgetName(e.target.value)}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                  placeholder="Enter budget name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Expense Limit</label>
                <input
                  type="number"
                  value={expenseLimit}
                  onChange={(e) => setExpenseLimit(e.target.value)}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                  placeholder="Enter expense limit"
                  required
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsPopupOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md"
                  disabled={!(budgetName && expenseLimit)}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default CreateBudget;
