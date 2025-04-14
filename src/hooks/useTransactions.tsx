import { useContext } from "react";
import { TransactionContext } from "../contexts/TransactionsContext";

export function useTransactions() {
    const { transactions, fetchTransactions } = useContext(TransactionContext)

    return {
        transactions,
        fetchTransactions
    }
}