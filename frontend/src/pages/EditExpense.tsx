import { useState } from "react";
import { ExpenseType, useExpense } from "../context/ExpenseContext";
import { useNavigate } from "react-router-dom";

const categories = [
  "Food",
  "Rent",
  "Clothes",
  "Recreation",
  "Transport",
  "Utilities",
  "Entertainment",
  "Healthcare",
  "Education",
  "Other"
];

export const EditExpense = () => {
  const { selectExpense, expenses, setExpenses } = useExpense();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [expense, setExpense] = useState<ExpenseType>(
    selectExpense.current || { id: "", name: "", category: "", amount: 0, date: "" }
  );

 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!expense.name || !expense.category || !expense.amount || !expense.date) {
      setError("Please fill in all fields.");
      return;
    }

    setError(""); 
    await editExpense(expense);
  };

  const editExpense = async (updatedExpense: ExpenseType) => {
    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token");
  
      const response = await fetch(`http://localhost:8080/api/expense/update/${updatedExpense.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedExpense)
      });
  
      if (!response.ok) {
        throw new Error("Failed to update expense");
      }
  
      
      let data;
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text(); 
      }
  
      console.log("Updated:", data);
  
      setExpenses(expenses.map(exp => (exp.id === updatedExpense.id ? updatedExpense : exp)));
  
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to update expense. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center gap-2 mb-8 justify-center">
            <div className="w-2 h-2 rounded-full bg-[#0092FB]"></div>
            <h1 className="text-2xl font-semibold text-gray-900 text-center">Edit Expense</h1>
          </div>

          {error && <p className="text-red-600">{error}</p>}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Expense Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="e.g., Groceries, Movie Tickets"
                value={expense.name}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0092FB] focus:border-transparent transition-colors"
                onChange={(e) => setExpense({ ...expense, name: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0092FB] focus:border-transparent transition-colors"
                value={expense.category}
                onChange={(e) => setExpense({ ...expense, category: e.target.value })}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                <input
                  id="amount"
                  type="number"
                  name="amount"
                  placeholder="0.00"
                  value={expense.amount}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0092FB] focus:border-transparent transition-colors"
                  onChange={(e) => setExpense({ ...expense, amount: Number(e.target.value) })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date & Time
              </label>
              <input
                id="date"
                type="datetime-local"
                name="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0092FB] focus:border-transparent transition-colors"
                value={expense.date}
                onChange={(e) => setExpense({ ...expense, date: e.target.value })}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-[#0092FB] text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Editing..." : "Edit Expense"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
