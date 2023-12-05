import express from "express";
import budgetSchema from "../mongoDB/models/budgetModel.js";

// create a new postRouter object in Express.js
const getRouter = express.Router();
// GET ALL POSTS
getRouter.route("/").get(async (req, res) => {
  try {
    const posts = await budgetSchema.find({});
    // console.log("all items", posts);
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});
export default getRouter;
