
import React, { useState, useEffect } from 'react';
import { getTransactions } from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const TransactionsTable = ({ selectedMonth, onMonthChange }) => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();


  useEffect(() => {
    fetchTransactions();
  }, [selectedMonth, searchTerm, page]);

  const fetchTransactions = async () => {
    try {
      const data = await getTransactions(selectedMonth, searchTerm, page);
      // Ensure data.transactions is an array before setting state
      if (Array.isArray(data.transactions)) {
        setTransactions(data.transactions);
        setTotalPages(data.totalPages);
      } else {
        console.error('Invalid transactions data:', data);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
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

  const handleStatistics = () => {
    navigate(`/api/statistics/${selectedMonth}`);
  };
  
  const handleChart = () => {
    navigate(`/api/chart-data/${selectedMonth}`);
  };
  return (
    <div>
        <h1>Transactions Dashboard</h1>
       <h1 style={{ textAlign: 'center' }}>Transactions Table</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} style={{marginLeft:'50px', height: '30px', width: '185px'}} />
        <select value={selectedMonth} onChange={handleMonthChange}  style={{ height: '30px', width: '175px', marginRight:'50px', border: '2px solid ', borderRadius: '5px' , fontSize:'18px' }} >
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
      <table className="table" style={{ border: '2px solid #ccc', borderRadius: '28px', marginTop: '40px', borderCollapse: 'collapse' }}>
      <colgroup>
    <col style={{ width: '20%' }} />
    <col style={{ width: '40%' }} />
    <col style={{ width: '10%' }} />
    <col style={{ width: '10%' }} />
    <col style={{ width: '10%' }} />
  </colgroup>
        <thead>
          <tr style={{fontSize:'20px'}}>
            <th>Title</th>
            <th>Description</th>
            <th style={{paddingLeft: '11px'}}>Price</th>
            <th>Category</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {/* Check if transactions is an array before mapping */}
          {Array.isArray(transactions) && transactions.map((transaction) => (
            <tr key={transaction.id} style={{fontSize:'17px'}}>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{transaction.category}</td>
              <td>
                {transaction.image ? (
                  <img src={transaction.image} alt="Transaction" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                ) : (
                  'No Image'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handlePrevPage} disabled={page <= 1} style={{fontSize:'20px'}}>Previous</button>&nbsp;&nbsp;
      <button onClick={handleNextPage} disabled={page >= totalPages} style={{fontSize:'20px'}}>Next</button>

      <button onClick={handleStatistics} disabled={!selectedMonth} style={{ marginLeft: '10px', fontSize:'20px' }}>Statistics</button>
      <button onClick={handleChart} disabled={!selectedMonth} style={{ marginLeft: '10px', fontSize:'20px' }}>Bar Chart</button>

    </div>
  );
};

export default TransactionsTable;
