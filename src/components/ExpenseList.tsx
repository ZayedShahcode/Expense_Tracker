import { useExpense } from "../context/ExpenseContext"
import { ExpenseItem } from "./ExpenseItem"
// import { CiEdit } from "react-icons/ci";

export const ExpenseList = () => {
    const {expenses} = useExpense()
  
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Expenses</h2>
          <p className="text-sm text-gray-600">{expenses.length} transactions</p>
        </div>
        
        {expenses.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No expenses yet</h3>
            <p className="text-gray-600">Add your first expense to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {expenses.map((expense) => (
              <ExpenseItem expense={expense} key={expense.id} />
            ))}
          </div>
        )}
      </div>
    );
}
