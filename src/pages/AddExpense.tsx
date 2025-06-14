import { useState } from "react";
import { ExpenseType, useExpense } from "../context/ExpenseContext";
import { useNavigate } from "react-router-dom";
// import { formatDate } from "../utils/helpers";
import {ToastContainer, toast} from 'react-toastify';
const API_URL = import.meta.env.VITE_BACKEND_URL;

const initialState: ExpenseType = {
  name: "",
  category: "",
  amount: 0,
  date: ""
};

export const categories = [
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

export const AddExpense = () => {
  const [expense, setExpense] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  const { setExpenses } = useExpense();
  const navigate = useNavigate();
  

  const addExpense = async (updatedExpense: ExpenseType) => {
    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token");
      // console.log("Token being sent:", token);
      if (!token) {
        toast.error("Login to add an expense");
        return;
      }
      // console.log(expense.date)
      const response = await fetch(`${API_URL}/api/expense/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({...updatedExpense, amount: (updatedExpense.amount)})
      });
  
      if (!response.ok) {
        const errorData = await response.text();
        toast.error(errorData);
        setError(`Failed to add expense: ${response.status} - ${errorData}`);
        throw new Error(`Failed to add expense: ${response.status} - ${errorData}`);
      }
  
      const data = await response.json();
      toast.success("Expense added successfully:" + data.name);
      setExpenses((prevState) => [...prevState, data]);
      setExpense(initialState);
      setTimeout(() => {
        navigate("/dashboard");
      },1000);
    } catch (error : any) {
      toast.error("Error adding expense:", error);
      setError(error.message || "Failed to add expense");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOnClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!expense.name || !expense.category || !expense.amount || !expense.date) {
      alert("Please fill in all fields");
      return;
    }
    const enteredDate = new Date(expense.date);
    const now = new Date();
    const twentyYearsAgo = new Date();
    twentyYearsAgo.setFullYear(now.getFullYear() - 20);

    if (enteredDate < twentyYearsAgo) {
      alert("Date cannot be older than 20 years.");
      return;
    }

    if (enteredDate > now) {
      alert("Date cannot be in the future.");
      return;
    }
  
    const updatedExpense: ExpenseType = {
      ...expense,
      date: new Date(expense.date).toISOString().slice(0, 16) // Format as "YYYY-MM-DDTHH:mm"
    };
  
    await addExpense(updatedExpense);
  };

  // const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  //   let { name, value } = e.target;
  //
  //   setExpense((prevExpense) => ({
  //     ...prevExpense,
  //     [name]: name === "amount" ? Number(value) : value
  //   }));
  // };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto px-4 ">
        <div className="bg-white rounded-2xl shadow-md border border-gray-300 p-8 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center gap-2 mb-8 justify-center">
            <div className="w-2 h-2 rounded-full bg-[#0092FB]"></div>
            <h1 className="text-2xl font-semibold text-gray-900 text-center">Add New Expense</h1>
          </div>
          {error!=""?
              <p className="text-red-600">{error}</p>
              :
              <></>
          }

          <form className="space-y-6">
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
                onChange={(e) => setExpense({...expense, name : e.target.value})}
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
                onChange={(e) => setExpense({...expense, category : e.target.value})}
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
                  min={1}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0092FB] focus:border-transparent transition-colors"
                  onChange={(e) => setExpense({...expense, amount : Number(e.target.value)})}
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
                max={new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16)}
                onChange={(e) => setExpense({...expense, date : e.target.value})}
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
                onClick={handleOnClick}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-[#0092FB] text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Adding..." : "Add Expense"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnFocusLoss  />
    </div>
  );
};

