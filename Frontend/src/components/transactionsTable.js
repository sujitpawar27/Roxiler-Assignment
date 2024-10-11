import React, { useState, useEffect } from "react";
import { getTransactions } from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/TransactionTable.css";
import TransactionsStatistics from "./transactionsStatistics";
import TransactionsBarChart from "./transactionsBarChart";

const TransactionsTable = ({ selectedMonth, onMonthChange }) => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchTransactions();
  }, [selectedMonth, searchTerm, page]);

  const fetchTransactions = async () => {
    try {
      const data = await getTransactions(selectedMonth, searchTerm, page);
      if (Array.isArray(data.transactions)) {
        setTransactions(data.transactions);
        setTotalPages(data.totalPages);
        console.log(data);
      } else {
        console.error("Invalid transactions data:", data);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleMonthChange = (e) => {
    const selectedMonth = e.target.value;
    onMonthChange(selectedMonth);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div>
      <h1 className="circle">Transactions Dashboard</h1>
      <div className="tableContainer">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="Search transaction"
            value={searchTerm}
            onChange={handleSearch}
          />

          <select
            className="monthselection"
            value={selectedMonth}
            onChange={handleMonthChange}
          >
            <option value="">All Transactions</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>

        <table className="table">
          <colgroup>
            <col style={{ width: "20%" }} />
            <col style={{ width: "40%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "10%" }} />
          </colgroup>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Sold</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(transactions) &&
              transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.title}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.price}</td>
                  <td>{transaction.category}</td>
                  <td>{transaction.sold ? "Sold" : "Available"}</td>
                  <td>
                    {transaction.image ? (
                      <img
                        src={transaction.image}
                        alt="Transaction"
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          <div style={{ flex: 1 }}>Page No : {page}</div>

          <div style={{ display: "flex", justifyContent: "center", flex: 2 }}>
            <button
              onClick={handlePrevPage}
              disabled={page <= 1}
              style={{
                fontSize: "20px",
                border: "none",
                backgroundColor: "transparent",
                cursor: page > 1 ? "pointer" : "not-allowed",
              }}
            >
              Previous
            </button>
            &nbsp;&nbsp;
            <button
              onClick={handleNextPage}
              disabled={page >= totalPages}
              style={{
                fontSize: "20px",
                border: "none",
                backgroundColor: "transparent",
                cursor: page < totalPages ? "pointer" : "not-allowed",
              }}
            >
              Next
            </button>
          </div>

          <div style={{ flex: 1, textAlign: "right" }}>Per Page : 10</div>
        </div>
      </div>
      <div>
        <TransactionsStatistics selectedMonth={selectedMonth} />
      </div>
      <div>
        <TransactionsBarChart selectedMonth={selectedMonth} />
      </div>
    </div>
  );
};

export default TransactionsTable;
