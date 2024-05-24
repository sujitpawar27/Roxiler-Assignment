
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStatistics } from '../services/api'; // Adjust the import path as necessary
import 'bootstrap/dist/css/bootstrap.min.css';

const TransactionsStatistics = () => {
  const { month } = useParams();
  const navigate = useNavigate();
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    if (month) {
      fetchStatistics(month);
    }
  }, [month]);

  const fetchStatistics = async (selectedMonth) => {
    try {
      const data = await getStatistics(selectedMonth);
      setStatistics(data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const handleBarChart = () => {
    navigate(`/api/chart-data/${month}`);
  };
   console.log('Statistics state:', statistics);

  return (
    <div style={{ marginTop: '50px' }}>
      <h1 style={{marginLeft:'50px'}}> Statistics - {month}</h1>
     <div style={{ width: '500px', margin: '0 auto', marginTop:'50px' }}>
  <div className="card" style={{ marginTop: '50px' }}>
    <div className="card-body" style={{ backgroundColor: 'rgba(255, 165, 0, 0.1)', height:'250px', paddingTop:'70px', paddingLeft:'65px' }}>
      <p style={{ fontWeight: '700', fontSize:'20px' }}>Total sale: <span style={{ marginLeft: '159px' }}>{statistics.totalSales}</span></p>
      <p style={{ fontWeight: '700', fontSize:'20px' }}>Total sold items: <span style={{ marginLeft: '99px' }}>{statistics.soldItems}</span></p>
      <p style={{ fontWeight: '700', fontSize:'20px' }}>Total not sold items: <span style={{ marginLeft: '62px' }}>{statistics.notSoldItems}</span></p>
    </div>
  </div>
  <div style={{ marginTop: '13px', textAlign: 'center' }}>
    <button onClick={() => navigate(-1)} style={{ width: '76px', borderRadius: '8px', fontSize:'20px' }}>Back</button>&nbsp;&nbsp;
    <button onClick={handleBarChart} style={{ width: '126px', borderRadius: '8px', fontSize:'20px' }}>Bar Chart</button>
  </div>
</div>
    </div>
  );
};

export default TransactionsStatistics;
