import { useExpense } from "../context/ExpenseContext";

export const ExpenseTracker = () => {
  const { totalExpense, expenses } = useExpense();

  return (
    <div className="border border-black px-4 py-6 mx-2 lg:mx-24 flex flex-wrap flex-col lg:flex-row items-center justify-between rounded-3xl shadow-md bg-white  w-auto max-w-6xl">
      {/* Heading */}
      <h1 className="text-[#0092FB] font-bold text-3xl lg:text-5xl w-full lg:w-auto text-center lg:text-left">
        Your Expenses
      </h1>

      {/* Expense Details */}
      <div className="text-lg font-medium flex flex-col gap-2 lg:gap-3 text-center lg:text-right mt-4 lg:mt-0">
        <p className="text-[#685D5D]">Transactions: {expenses.length}</p>
        <p>
          Amount:{" "}
          <span className="text-red-800 font-bold tracking-wider">₹ {totalExpense}</span>
        </p>
      </div>
    </div>
  );
};
