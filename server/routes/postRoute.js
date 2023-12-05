import express from "express";
import BudgetSchema from "../mongoDB/models/budgetModel.js";

const postRouter = express.Router();

postRouter.route("/").post(async (req, res) => {
  try {
    const { item, price } = req.body;
    const newPost = await BudgetSchema.create({ item, price });
    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

export default postRouter;