import { createContext, useContext, useState } from "react";

export interface ExpenseType {
    id?: number;
    name: string;
    category: string,
    amount: number;
    date: string;
}

interface ExpenseContextType {
    expenses: ExpenseType[];
    setExpenses: React.Dispatch<React.SetStateAction<ExpenseType[]>>;
    totalExpense: number;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);


export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [expenses, setExpenses] = useState<ExpenseType[]>([]);

    const totalExpense: number = expenses.reduce((sum,expense)=>sum+expense.amount , 0);

    return (
        <ExpenseContext.Provider value={{ expenses, setExpenses,totalExpense }}>
            {children}
        </ExpenseContext.Provider>
    );
};

export const useExpense = () => {
    const context = useContext(ExpenseContext);
    if (!context) {
        throw new Error("useExpense must be used within an ExpenseProvider");
    }
    return context;
};
