import { useContext } from "react";
import { TransactionContext } from "../contexts/TransactionsContext";

export function useTransactions() {
    const { transactions } = useContext(TransactionContext)

    return {
        transactions
    }
}