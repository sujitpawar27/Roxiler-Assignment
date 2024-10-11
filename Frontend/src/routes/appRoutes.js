import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import TransactionsTable from "../components/transactionsTable";

const AppRoutes = () => {
  const [selectedMonth, setSelectedMonth] = useState("March"); 

  const handleMonthChange = (selectedMonth) => {
    setSelectedMonth(selectedMonth);
  };
  return (
    <div
        style={{
          display: "flex",
          backgroundColor: "rgba(50, 156, 147, 0.1)",
          padding: "20px",
          borderRadius: "10px",
          minHeight: "100vh",
        }}
      >
    <Router>
      
        <Routes>
          <Route
            path="/"
            element={
              <TransactionsTable
                selectedMonth={selectedMonth}
                onMonthChange={handleMonthChange}
              />
            }
          />
        </Routes>
    </Router>
      </div>
  );
};

export default AppRoutes;
