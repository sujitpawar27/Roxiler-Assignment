import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/routes.js";
import { initializeDatabase } from "./controllers/transactionController.js";

const app = express();
const { json } = bodyParser;
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(json());

const PORT = process.env.PORT || 5000;

const connectDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    const conn = await mongoose.connect(
      "mongodb://127.0.0.1:27017/transactions"
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    await initializeDatabase(); 
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

connectDB();
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
