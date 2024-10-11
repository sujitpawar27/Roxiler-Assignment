import { Schema, model } from "mongoose";

const transactionSchema = new Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  sold: Boolean,
  dateOfSale: Date,
});

export default model("Transaction", transactionSchema);
