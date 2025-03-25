import React, { JSX } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { ExpenseType, useExpense } from "../context/ExpenseContext";
import { 
  FaUtensils, 
  FaHome, 
  FaTshirt, 
  FaGamepad, 
  FaBus, 
  FaBolt, 
  FaFilm, 
  FaHeartbeat, 
  FaGraduationCap, 
  FaEllipsisH 
} from "react-icons/fa";

interface ExpenseItemProps {
  expense: ExpenseType;
}

const categoryIcons: Record<string, { icon: JSX.Element; color: string }> = {
  Food: { icon: <FaUtensils />, color: "bg-orange-50 text-orange-500" },
  Rent: { icon: <FaHome />, color: "bg-blue-50 text-blue-500" },
  Clothes: { icon: <FaTshirt />, color: "bg-purple-50 text-purple-500" },
  Recreation: { icon: <FaGamepad />, color: "bg-green-50 text-green-500" },
  Transport: { icon: <FaBus />, color: "bg-yellow-50 text-yellow-500" },
  Utilities: { icon: <FaBolt />, color: "bg-red-50 text-red-500" },
  Entertainment: { icon: <FaFilm />, color: "bg-pink-50 text-pink-500" },
  Healthcare: { icon: <FaHeartbeat />, color: "bg-rose-50 text-rose-500" },
  Education: { icon: <FaGraduationCap />, color: "bg-indigo-50 text-indigo-500" },
  Other: { icon: <FaEllipsisH />, color: "bg-gray-50 text-gray-500" }
};

export const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense }) => {
  const { expenses, setExpenses } = useExpense();

  const deleteExpense = async(id: number | undefined)=>{
    const response = await fetch(`http://localhost:8080/deleteExpense/${id}`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json"
      }
    })
    if(response.ok){
      const filteredExpenses = expenses.filter((item) => item.id !== id);
      setExpenses(filteredExpenses);
    }
    else{
      console.log("Failed to delete expense");
    }
  }
  
  const handleOnDelete = () => {
    deleteExpense(expense.id);
  };

  const categoryIcon = categoryIcons[expense.category] || categoryIcons.Other;

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 hover:border-blue-100 hover:shadow-sm transition-all">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-lg ${categoryIcon.color} flex items-center justify-center text-lg`}>
          {categoryIcon.icon}
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{expense.name}</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">{expense.date}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
              {expense.category}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <span className="text-lg font-semibold text-red-600">₹{expense.amount}</span>
        <button 
          onClick={handleOnDelete} 
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
          title="Delete expense"
        >
          <MdDeleteOutline size={20} />
        </button>
      </div>
    </div>
  );
};
