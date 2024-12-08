"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import BudgetItem from "../../budget/_components/BudgetItem";
import AddExpense from "./_components/AddExpense";
import ExpenseListTable from "./_components/ExpenseListTable";
import { Pen, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import EmojiPicker from "emoji-picker-react";

const Expense = () => {
  const { id } = useParams();
  const router = useRouter();

  // State management
  const [budget, setBudget] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [budgetName, setBudgetName] = useState("");
  const [expenseLimit, setExpenseLimit] = useState("");
  const [emoji, setEmoji] = useState("💰");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  // Fetch budget data
  const fetchBudget = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:5000/api/budgets/${id}`);
      setBudget(response.data);
      setBudgetName(response.data.budgetName || ""); // Set budget name, fallback to empty string
      setExpenseLimit(response.data.expenseLimit || "");
    } catch (error) {
      setError(error.response ? error.response.data.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Delete budget handler
  const handleBudgetDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/budgets/${id}`);
      toast.success("Budget deleted successfully!");
      setShowDeleteModal(false);
      router.push("/dashboard/budget");
    } catch (error) {
      toast.error("Failed to delete the budget. Please try again.");
    }
  };

  // Update budget handler
  const handleBudgetUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/budgets/${id}`, {
       budgetName,
       expenseLimit,
        emoji,
      });
      toast.success("Budget updated successfully!");
      setShowEditModal(false);
      fetchBudget(); // Refresh budget data
      console.log(response.data); // Log updated data
    } catch (error) {
      toast.error("Failed to update the budget. Please try again.");
    }
  };
  
  // Fetch budget on component load
  useEffect(() => {
    if (id) {
      fetchBudget();
    }
  }, [id]);

  if (isLoading) return <div>Loading budget data...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">My Expenses</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowDeleteModal(true)}
            className="text-white p-3 bg-red-500 rounded-md flex items-center gap-1"
          >
            <Trash />
            Delete
          </button>
          <button
            onClick={() => setShowEditModal(true)}
            className="text-white p-3 bg-blue-500 rounded-md flex items-center gap-1"
          >
            <Pen />
            Edit
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6">
        <BudgetItem budget={budget} />
        <AddExpense budgetId={id} onExpenseAdded={fetchBudget} />
        <ExpenseListTable  budgetId={id} />
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this budget?</p>
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={handleBudgetDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Budget Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-[30%] relative">
            <h2 className="text-lg font-bold mb-6">Edit Budget</h2>
            <form onSubmit={handleBudgetUpdate} className="space-y-4">
              {/* Emoji Picker */}
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

              {/* Budget Name */}
              <div>
                <label className="block text-sm font-bold mb-2">Budget Name</label>
                <input
                  type="text"
                  value={budgetName}
                  onChange={(e) => setBudgetName(e.target.value)}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
              </div>

              {/* Expense Limit */}
              <div>
                <label className="block text-sm font-bold mb-2">Expense Limit</label>
                <input
                  type="number"
                  value={expenseLimit}
                  onChange={(e) => setExpenseLimit(e.target.value)}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expense;
