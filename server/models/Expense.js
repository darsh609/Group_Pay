const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
    {
  description: String,
  amount: Number,
  paidBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  group: { type: mongoose.Schema.Types.ObjectId, 
    ref: "Group"
   },

  splitType: {
    type: String,
    enum: ["EQUAL", "EXACT", "PERCENTAGE"]
  },

  splits: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      amount: Number
    }
  ],
  createdAt: { type: Date, default: Date.now }

},
  

);

module.exports = mongoose.model("Expense", expenseSchema);
