import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useExpense } from "../context/ExpenseContext";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export const ExpenseChart = () => {
  const { expenses } = useExpense();

  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(categoryTotals).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Expense Breakdown</h2>
      <PieChart width={400} height={400}>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
          {data.map((entry, index) => (
            <Cell key={index}  fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};
