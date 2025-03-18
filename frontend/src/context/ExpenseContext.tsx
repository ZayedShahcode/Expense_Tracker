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
    fetchExpenses: ()=>Promise<void>
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);


export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [expenses, setExpenses] = useState<ExpenseType[]>([]);

    const fetchExpenses = async()=>{
        const response = await fetch("http://localhost:8080/getExpenses",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        if(response.ok){
            console.log("Fetched expenses successfully");
            setExpenses(await response.json());
        }
    }

    
    const totalExpense: number = expenses.reduce((sum,expense)=>sum+expense.amount , 0);

    return (
        <ExpenseContext.Provider value={{ expenses, setExpenses,totalExpense,fetchExpenses }}>
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
