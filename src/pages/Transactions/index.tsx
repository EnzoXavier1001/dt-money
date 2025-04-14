import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PriceHighlight, TransactionsContainer, TransactionsTable, TransactionsWrapper } from "./styles";
import { api } from "../../api";
import { ITransaction } from "../../@types/transaction";

export function Transactions() {
    const [transactions, setTransactions] = useState<ITransaction[]>([])
    
    useEffect(() => {
        loadTransactions()
    }, [])

    async function loadTransactions() {
        const { data } = await api.get('/transactions')

        setTransactions(data)
    }

    return (
        <div>
            <Header />
            <Summary />

            <TransactionsContainer>
                    <SearchForm />
                    <TransactionsWrapper>
                        <TransactionsTable>
                            <tbody>
                                {transactions.map((transaction, index) => (
                                    <tr key={index}>
                                        <td width="50%">{transaction.description}</td>
                                        <td>
                                            <PriceHighlight variant={transaction.type}>
                                                {transaction.price}
                                            </PriceHighlight>
                                        </td>
                                        <td>{transaction.category}</td>
                                        <td>{transaction.createdAt}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </TransactionsTable>
                    </TransactionsWrapper>
            </TransactionsContainer>
        </div>
    )
}