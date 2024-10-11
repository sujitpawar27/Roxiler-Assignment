import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";


const handleAxiosError = (error) => {
  if (error.response) {
    console.error("Response error:", error.response.data);
    console.error("Status code:", error.response.status);
  } else if (error.request) {
    console.error("Request error:", error.request);
  } else {
    console.error("Error:", error.message);
  }
  console.error("Config:", error.config);
};

export const getTransactions = async (month, searchTerm, page = 1) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/transactions`, {
      params: {
        month,
        search: searchTerm,
        page,
      },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const getStatistics = async (month) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/statistics/${month}`, {
      params: { month },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const getBarChartData = async (month) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/chart-data/${month}`, {
      params: { month },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};
