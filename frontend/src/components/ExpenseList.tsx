import { useExpense } from "../context/ExpenseContext"
import { ExpenseItem } from "./ExpenseItem"
// import { CiEdit } from "react-icons/ci";

export const ExpenseList = () => {
    const {expenses} = useExpense()
  return (
    <div>
        <h1 className="ml-4 lg:ml-24 mt-8 text-[#685D5D] font-bold text-xl">List of Expenses</h1>
        {expenses.map((expense)=>(
            <ExpenseItem expense={expense} key={expense.date}/>
        ))}
    </div>
  )
}
