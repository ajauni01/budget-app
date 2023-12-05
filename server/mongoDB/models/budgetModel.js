
import mongoose from "mongoose";

const Post = new mongoose.Schema({
  item: { type: String, required: true },
  price: { type: Number, required: true },
});

const BudgetSchema = mongoose.model("Budget", Post);

export default BudgetSchema;