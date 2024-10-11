import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getBarChartData } from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TransactionsBarChart = ({ selectedMonth }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Number of Items",
        data: [],
        borderWidth: 1,
      },
    ],
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        console.log("Fetching chart data for month:", selectedMonth);
        const data = await getBarChartData(selectedMonth);
        console.log("Received chart data:", data);

        setChartData({
          labels: data.map((item) => item._id.toString()),
          datasets: [
            {
              label: "Number of Items",
              data: data.map((item) => item.count),
              backgroundColor: "rgba(27, 174, 218, 0.44)",
              borderWidth: 1,
            },
          ],
        });
        setError(null);
      } catch (error) {
        console.error("Error fetching chart data:", error);
        setError("Failed to fetch chart data");
      }
    };

    fetchChartData();
  }, [selectedMonth]);

  const options = {
    scales: {
      x: {
        ticks: {
          callback: function (value, index, ticks) {
            const ranges = [
              '0-100', '101-200', '201-300', '301-400', '401-500',
              '501-600', '601-700', '701-800', '801-900', '900 and above'
            ];
            return ranges[index] || ''; 
          },
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="container" style={{marginTop:"70px", textAlign:"center"}}>
      <h2>Bar Chart Stats - {selectedMonth}</h2>
      {error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <Bar data={chartData} options={options} />
      )}
    </div>
  );
};

export default TransactionsBarChart;
