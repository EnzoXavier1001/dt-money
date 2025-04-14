import { createContext, ReactNode, useEffect, useState } from "react";
import { ITransaction } from "../@types/transaction";
import { api } from "../lib/axios";

interface TransactionContextType {
    transactions: ITransaction[]
    fetchTransactions: (query?: string) => Promise<void>
}

export const TransactionContext = createContext({} as TransactionContextType)

interface TransactionsProviderProps {
    children: ReactNode;
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<ITransaction[]>([])
        
    useEffect(() => {
        fetchTransactions()
    }, [])
    
    async function fetchTransactions(query?: string) {
        console.log(query)
        const { data } = await api.get('/transactions', {
            params: {
                q: query
            }
        })
        console.log(data)
        setTransactions(data)
    }
    
    return (
        <TransactionContext.Provider value={{ transactions, fetchTransactions }}>
            {children}
        </TransactionContext.Provider>
    )
}