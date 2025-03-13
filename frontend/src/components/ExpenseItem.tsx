import { MdDeleteOutline } from "react-icons/md";
import {  ExpenseType, useExpense } from "../context/ExpenseContext";

interface ExpenseItemProps {
    expense: ExpenseType;
}


export const ExpenseItem: React.FC<ExpenseItemProps> = ({expense}) => {
    const {expenses,setExpenses} = useExpense()
    const handleOnDelete = ()=>{
        const filteredExpenses = expenses.filter((item)=> item.date !=expense.date)
        setExpenses(filteredExpenses);
    }

  return (
    <div className="flex items-center gap-4  m-4 lg:mx-24 lg:text-lg" key={expense.date} >
              <div className="  font-bold w-[40%]">{expense.name}</div>
              <div className=" text-red-800 font-bold w-[30%]">{"₹"+expense.amount}</div>
              <div className="text-[#685D5D]">{expense.date}</div>
              {/* <button onClick={handleOnEdit}><CiEdit size={20} color="blue" className="cursor-pointer"/></button> */}
              <button onClick={handleOnDelete} className="cursor-pointer"><MdDeleteOutline size={20} color="red"/></button>
    </div>
  )
}
