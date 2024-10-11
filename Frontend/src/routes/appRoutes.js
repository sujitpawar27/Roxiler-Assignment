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
    <>
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
    </>
  );
};

export default AppRoutes;
