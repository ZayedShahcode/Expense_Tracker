import { Link } from 'react-router-dom';
import { ExpenseList } from '../components/ExpenseList';
import { ExpenseTracker } from '../components/ExpenseTracker';
import { useEffect } from 'react';
import { useExpense } from '../context/ExpenseContext';

export const Dashboard = () => {
  const { fetchExpenses } = useExpense();
  
  useEffect(() => {
    fetchExpenses();
  }, []);

  const date = new Date();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
              <p className="text-gray-600 mt-1">
                {date.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <Link to="/add">
              <button className="px-6 py-3 bg-[#0092FB] text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2 shadow-sm cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Expense
              </button>
            </Link>
          </div>
        </div>

        {/* Expense Tracker */}
        <div className="mb-8">
          <ExpenseTracker />
        </div>

        {/* Expense List */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <ExpenseList />
        </div>
      </div>
    </div>
  );
};