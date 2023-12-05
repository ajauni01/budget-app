import express from "express";
import BudgetSchema from "../mongoDB/models/budgetModel.js";

const deleteRouter = express.Router();

deleteRouter.route("/:itemId").delete(async (req, res) => {
  try {
    const { itemId } = req.params;
    const deletedItem = await BudgetSchema.findOneAndDelete({ _id: itemId }); // Use _id instead of itemID
    if (deletedItem) {
      res.status(200).json({ success: true, data: deletedItem });
    } else {
      res.status(404).json({ success: false, message: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message }); // Return error message
  }
});

export default deleteRouter;
