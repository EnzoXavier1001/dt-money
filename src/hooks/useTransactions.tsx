import { useContext } from "react";
import { TransactionContext } from "../contexts/TransactionsContext";

export function useTransactions() {
    const { transactions, fetchTransactions, createTransaction } = useContext(TransactionContext)

    return {
        transactions,
        fetchTransactions,
        createTransaction
    }
}