import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getStatistics } from "../services/api"; // Adjust the import path as necessary
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/TransactionStatics.css"

const TransactionsStatistics = ({ selectedMonth }) => {
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    console.log("Selected month from URL:", selectedMonth);
    if (selectedMonth) {
      fetchStatistics(selectedMonth);
    }
  }, [selectedMonth]);

  const fetchStatistics = async (selectedMonth) => {
    try {
      const data = await getStatistics(selectedMonth);
      setStatistics(data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <h1 style={{ textAlign: "center" }}> Statistics - {selectedMonth}</h1>
      <div className="card-body">
        <p>
          Total sale: <span>{statistics.totalSales}</span>
        </p>
        <p>
          Total sold items: <span>{statistics.soldItems}</span>
        </p>
        <p>
          Total not sold items: <span>{statistics.notSoldItems}</span>
        </p>
      </div>
    </div>
  );
};

export default TransactionsStatistics;
