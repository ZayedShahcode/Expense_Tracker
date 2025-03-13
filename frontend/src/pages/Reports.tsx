import { DateExpense } from "../components/DateExpense"
import { ExpenseChart } from "../components/ExpenseChart"
import { useExpense } from "../context/ExpenseContext"

export const Reports = () => {
  const {expenses} = useExpense();
  if(expenses.length===0){
    return (
      <div className="h-full w-full grid place-items-center">
        Add Expenses to generate report.
      </div>
    )
  }
  return (
    <>
    <ExpenseChart/>
    <DateExpense/>
    </>
  )
}
