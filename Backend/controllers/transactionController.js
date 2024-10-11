import axios from "axios";
import Transaction from "../models/Transactions.js";

const getMonthNumber = (month) => {
  const months = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };
  return months[month];
};

export const initializeDatabase = async (req, res) => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );

    const transactions = response.data.map((transaction) => ({
      ...transaction,
      dateOfSale: new Date(transaction.dateOfSale),
    }));

    await Transaction.deleteMany();
    await Transaction.insertMany(transactions);

    res.status(200).send("Database initialized with seed data");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error initializing database");
  }
};

export const listTransactions = async (req, res) => {
  const { page = 1, perPage = 10, search = "" } = req.query;
  const { month } = req.query;
  const monthNumber = getMonthNumber(month);
  const regex = new RegExp(search, "i");
  const query = {
    $and: [
      monthNumber
        ? { $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] } }
        : {},
      {
        $or: [
          { title: { $regex: regex } },
          { description: { $regex: regex } },
          { category: { $regex: regex } },
          { price: parseFloat(search) || 0 },
        ],
      },
    ].filter((condition) => Object.keys(condition).length > 0),
  };

  console.log("Query:", query);

  try {
    const total = await Transaction.countDocuments(query);
    console.log("Total:", total);

    const totalPages = Math.ceil(total / perPage);
    console.log("Total Pages:", totalPages);

    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage));
    console.log("Transactions:", transactions);

    res.json({
      transactions,
      total,
      page: parseInt(page),
      perPage: parseInt(perPage),
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getStatistics = async (req, res) => {
  try {
    const { month } = req.query;
    console.log("Requested month:", month);

    const monthNumber = getMonthNumber(month);
    console.log("Month number:", monthNumber);

    const stats = await Transaction.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
        },
      },
      {
        $facet: {
          totalSales: [{ $group: { _id: null, total: { $sum: "$price" } } }],
          soldItems: [
            {
              $group: {
                _id: null,
                count: { $sum: { $cond: ["$sold", 1, 0] } },
              },
            },
          ],
          notSoldItems: [
            {
              $group: {
                _id: null,
                count: { $sum: { $cond: ["$sold", 0, 1] } },
              },
            },
          ],
        },
      },
    ]);

    console.log("Statistics:", stats);

    res.json({
      totalSales: stats[0].totalSales[0] ? stats[0].totalSales[0].total : 0,
      soldItems: stats[0].soldItems[0] ? stats[0].soldItems[0].count : 0,
      notSoldItems: stats[0].notSoldItems[0]
        ? stats[0].notSoldItems[0].count
        : 0,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getBarChartData = async (req, res) => {
  const { month } = req.query;
  console.log("Received request for month:", month);
  const monthNumber = getMonthNumber(month);
  console.log("Converted month to number:", monthNumber);
  const barChart = await Transaction.aggregate([
    {
      $match: {
        $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
      },
    },
    {
      $bucket: {
        groupBy: "$price",
        boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, Infinity],
        default: "901-above",
        output: {
          count: { $sum: 1 },
        },
      },
    },
  ]);
  console.log("Bar chart data:", barChart);
  res.json(barChart);
};

export const getPieChartData = async (req, res) => {
  const { month } = req.query;
  const monthNumber = getMonthNumber(month);
  const pieChart = await Transaction.aggregate([
    {
      $match: {
        $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
      },
    },
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 },
      },
    },
  ]);
  res.json(pieChart);
};

export const getCombinedData = async (req, res) => {
  const { month } = req.query;
  const [transactions, statistics, barChart, pieChart] = await Promise.all([
    listTransactions(req, res),
    getStatistics(req, res),
    getBarChartData(req, res),
    getPieChartData(req, res),
  ]);
  res.json({ transactions, statistics, barChart, pieChart });
};
