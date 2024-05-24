
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getBarChartData } from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

// Register the necessary components with Chart.js
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TransactionsBarChart = () => {
  const { month } = useParams();
  const navigate = useNavigate();
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Number of Items',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        console.log("Fetching chart data for month:", month);
        const data = await getBarChartData(month);
        console.log("Received chart data:", data);

        setChartData({
            labels: data.map(item => item._id.toString()),
          datasets: [
            {
              label: 'Number of Items',
              data: data.map(item => item.count),
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        });
        setError(null); // Reset error state if the fetch is successful
      } catch (error) {
        console.error('Error fetching chart data:', error);
        setError('Failed to fetch chart data');
      }
    };

    fetchChartData();
  }, [month]);

  const options = {
    scales: {
        x: {
            beginAtZero: true,
        },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="container">
      <h2>Bar Chart Stats - {month}</h2>
      {error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <Bar data={chartData} options={options} />
      )}
          <button onClick={() => navigate(-1)} style={{ width: '96px', borderRadius: '8px', fontSize:'20px' }}>Back</button>&nbsp;&nbsp;

    </div>
  );
};

export default TransactionsBarChart;
