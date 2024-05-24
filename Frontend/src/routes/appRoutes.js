import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import TransactionsTable from '../components/transactionsTable';
import TransactionsStatistics from '../components/transactionsStatistics';
import TransactionsBarChart from '../components/transactionsBarChart';


const AppRoutes = () => {
const [selectedMonth, setSelectedMonth] = useState("March"); // State for selected month

const handleMonthChange = (selectedMonth) => {
    setSelectedMonth(selectedMonth);
};
    return (
      <Router>
      <div style={{ backgroundColor: 'rgba(0, 0, 255, 0.1)', padding: '20px', borderRadius: '10px', minHeight: '100vh' }}>
          
          <Routes>
            <Route path="/api/transactions" element={<TransactionsTable selectedMonth={selectedMonth} onMonthChange={handleMonthChange} />}/>
            <Route path="/api/statistics/:month" element={<TransactionsStatistics />} />
            <Route path="/api/chart-data/:month" element={<TransactionsBarChart />} />

          </Routes>
        </div>
      </Router>
    );
  };
  
  export default AppRoutes;