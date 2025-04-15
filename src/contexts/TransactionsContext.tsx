import { createContext, ReactNode, useEffect, useState } from "react";
import { ITransaction } from "../@types/transaction";
import { api } from "../lib/axios";

interface TransactionContextType {
    transactions: ITransaction[]
    fetchTransactions: (query?: string) => Promise<void>
    createTransaction: (data: CreateTransactionInput) => Promise<void>
}

interface CreateTransactionInput {
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
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
        const { data } = await api.get('/transactions', {
            params: {
                _sort: 'createdAt',
                _order: 'desc',
                q: query
            }
        })
        setTransactions(data)
    }

    async function createTransaction(data: CreateTransactionInput) {
       const { description, price, category, type} = data
        
       const response = await api.post('/transactions', {
            description,
            price,
            category,
            type,
            createdAt: new Date()
        })

        setTransactions(state => [response.data, ...state])
    }
    
    return (
        <TransactionContext.Provider value={{ transactions, fetchTransactions, createTransaction }}>
            {children}
        </TransactionContext.Provider>
    )
}