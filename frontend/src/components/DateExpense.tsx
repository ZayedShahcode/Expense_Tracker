import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useExpense } from "../context/ExpenseContext";
import { format, isValid, parse } from "date-fns"; // Import parse for custom formats

const COLORS: Record<string, string> = {
  Food: "#0088FE",
  Rent: "#00C49F",
  Clothes: "#FFBB28",
  Recreation: "#FF8042",
};

const parseCustomDate = (customDate: string) => {
  try {
    const [timePart, datePart] = customDate.split(" , ");
    
    if (!timePart || !datePart) return null; 

    const parsedDate = parse(datePart, "d/M/yyyy", new Date());

    if (!isValid(parsedDate)) return null;

    return parsedDate;
  } catch (error) {
    console.error("Error parsing date:", customDate, error);
    return null;
  }
};

export const DateExpense = () => {
  const { expenses } = useExpense();

  // Group expenses by date and category
  const groupedData: Record<string, Record<string, number>> = {};

  expenses.forEach(({ date, amount, category }) => {
    const parsedDate = parseCustomDate(date);

    if (!parsedDate) {
      console.warn("Skipping invalid date:", date);
      return;
    }

    const formattedDate = format(parsedDate, "dd/MM/yyyy"); // Format to dd/MM/yyyy

    if (!groupedData[formattedDate]) {
      groupedData[formattedDate] = { date: formattedDate };
    }
    groupedData[formattedDate][category] = (groupedData[formattedDate][category] || 0) + amount;
  });

  // Convert to Recharts data format
  const data = Object.values(groupedData);

  return (
    <div className="flex flex-col items-center my-8 pb-4">
      <h2 className="text-2xl font-bold mb-4">Daily Expense Trend (Stacked)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} barSize={30}>
          <XAxis dataKey="date" stroke="#555" />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.keys(COLORS).map((category) => (
            <Bar key={category} dataKey={category} stackId="a" fill={COLORS[category]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
