const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
dotenv.config();
const userRoutes = require("./routes/user.routes");
const groupRoutes = require("./routes/group.routes");
const expenseRoutes = require("./routes/expense.routes");
const PORT = process.env.PORT || 4000;
const app = express();
const cors = require("cors");

app.use(cors({
  origin: "*", // or your frontend URL
  credentials: true
}));

connectDB();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/expenses", expenseRoutes);
const settlementRoutes = require("./routes/settlement.routes");

app.use("/api/settlements", settlementRoutes);

app.listen(PORT, () => {
  console.log(`Server running on porttt ${PORT}`);
});
module.exports = app;
