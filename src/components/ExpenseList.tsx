import { useExpense } from "../context/ExpenseContext";
import { ExpenseItem } from "./ExpenseItem";
import { useState } from "react";
import {ToastContainer,toast} from "react-toastify"
import { subWeeks, subMonths, subYears, parseISO, isAfter, format } from "date-fns";
import * as XLSX from 'xlsx';

const categories = ["All", "Food", "Rent", "Clothes", "Recreation", "Transport", "Utilities", "Entertainment", "Healthcare", "Education", "Other"];

const downloadAsExcel = (expenses: any[]) => {
 
  if (expenses.length === 0) {
    toast.error("No data to export");
    return;
  }

  const excelData = expenses.map(expense => ({
    Date: format(parseISO(expense.date), "yyyy-MM-dd HH:mm:ss"),
    Name: expense.name,
    Category: expense.category,
    Amount: expense.amount
  }));

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(excelData);

  XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");

  XLSX.writeFile(workbook, `expenses_${format(new Date(), "yyyy-MM-dd")}.xlsx`);
};
const timePeriods = ["All Time", "Last Week", "Last Month", "Last Year"];

export const ExpenseList = () => {
  const { expenses, loading } = useExpense();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPeriod, setSelectedPeriod] = useState("All Time");

  const filterByDate = (expense: { date: string }) => {
    const expenseDate = parseISO(expense.date);
    const now = new Date();

    switch (selectedPeriod) {
      case "Last Week":
        return isAfter(expenseDate, subWeeks(now, 1));
      case "Last Month":
        return isAfter(expenseDate, subMonths(now, 1));
      case "Last Year":
        return isAfter(expenseDate, subYears(now, 1));
      default:
        return true;
    }
  };

  const filteredExpenses = expenses
    .filter(expense => selectedCategory === "All" ? true : expense.category === selectedCategory)
    .filter(filterByDate);

  return (
    <div>      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Recent Expenses</h2>
          <p className="text-sm text-gray-600 mt-1">{filteredExpenses.length} of {expenses.length} transactions</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-48 px-4 py-2 border border-gray-500 rounded-xl focus:ring-2 focus:ring-[#0092FB] focus:border-transparent transition-colors bg-white text-gray-900"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="w-full md:w-48 px-4 py-2 border border-gray-500 rounded-xl focus:ring-2 focus:ring-[#0092FB] focus:border-transparent transition-colors bg-white text-gray-900"
          >
            {timePeriods.map(period => (
              <option key={period} value={period}>{period}</option>
            ))}
          </select>
          <button            onClick={() => downloadAsExcel(filteredExpenses)}
            className="cursor-pointer w-full md:w-auto px-4 py-2 bg-[#0092FB] text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export Excel
          </button>
        </div>
      </div>

      <div className="p-4 bg-white text-black">
        {loading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Loading expenses...</h3>
            <p className="text-gray-600">Please wait while we fetch your data</p>
          </div>
        ) : filteredExpenses.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {selectedCategory === "All" ? "No expenses yet" : `No expenses in ${selectedCategory} category`}
            </h3>
            <p className="text-gray-600">
              {selectedCategory === "All" 
                ? "Add your first expense to get started" 
                : "Try selecting a different category or add a new expense"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredExpenses.map((expense) => (
              <ExpenseItem expense={expense} key={expense.id} />
            ))}
          </div>
        )}
      </div>
       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnFocusLoss  />
    </div>
  );
};
