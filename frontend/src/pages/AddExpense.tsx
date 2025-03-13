import { useState } from "react";
import { ExpenseType, useExpense } from "../context/ExpenseContext";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/helpers";

const initialState: ExpenseType = {
  name: "",
  category: "",
  amount: 0,
  date: ""
};

export const AddExpense = () => {
  const [expense, setExpense] = useState(initialState);
  const { setExpenses } = useExpense();
  const navigate = useNavigate();

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const updatedExpense = {
      ...expense,
      date: formatDate(expense.date)
    };

    setExpenses((prevState) => [...prevState, updatedExpense]);

    setExpense(initialState);

    navigate("/dashboard");
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let { name, value } = e.target;

    setExpense((prevExpense) => ({
      ...prevExpense,
      [name]: name === "amount" ? Number(value) : value
    }));
  };

  return (
    <div className="grid place-items-center h-[90vh]">
      <div className="flex flex-col items-center border min:h-[70%] w-[70vw] md:w-[30vw] rounded-3xl justify-between">
        <h1 className="text-3xl font-bold text-[#0092FB] my-8">Add Expense</h1>
        <form className="flex flex-col h-auto w-full gap-4 md:gap-4 m-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={expense.name}
            className="border p-2 m-4"
            onChange={handleOnChange}
          />
          <select
            name="category"
            className="border p-2 mx-4"
            value={expense.category}
            onChange={handleOnChange}
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Rent">Rent</option>
            <option value="Clothes">Clothes</option>
            <option value="Recreation">Recreation</option>
          </select>
          <input
            type="number"
            name="amount"
            className="border p-2 mx-4"
            value={expense.amount}
            onChange={handleOnChange}
            placeholder="Amount"
          />
          <input
            type="datetime-local"
            name="date"
            className="border p-2 mx-4"
            onChange={handleOnChange}
            value={expense.date}
          />
          <button
            type="submit"
            className="border p-2 mx-28 my-6 text-xl bg-[#0092FB] text-white font-bold rounded-3xl cursor-pointer min:w-32 "
            onClick={handleOnClick}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};
