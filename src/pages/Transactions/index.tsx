import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { useTransactions } from "../../hooks/useTransactions";
import { SearchForm } from "./components/SearchForm";
import { PriceHighlight, TransactionsContainer, TransactionsTable, TransactionsWrapper } from "./styles";

export function Transactions() {
   const { transactions } = useTransactions()

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