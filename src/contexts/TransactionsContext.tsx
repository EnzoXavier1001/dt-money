import { createContext, ReactNode, useEffect, useState } from "react";
import { ITransaction } from "../@types/transaction";
import { api } from "../api";

interface TransactionContextType {
    transactions: ITransaction[]
}

export const TransactionContext = createContext({} as TransactionContextType)

interface TransactionsProviderProps {
    children: ReactNode;
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<ITransaction[]>([])
        
    useEffect(() => {
        loadTransactions()
    }, [])
    
    async function loadTransactions() {
        const { data } = await api.get('/transactions')
        setTransactions(data)
    }
    
    return (
        <TransactionContext.Provider value={{ transactions }}>
            {children}
        </TransactionContext.Provider>
    )
}