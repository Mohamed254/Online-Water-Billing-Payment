const express = require("express");
const connectDB = require("./config/db");

const app = express();

//Connect Database
connectDB();

//init middleware
app.use(express.json({ extended: false}));

app.get("/", (req, res) =>
  res.json({ msg: "Welcome to the WaterBilling API..." })
);

//Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/payments", require("./routes/payments"));
// app.use("/api/waterprice", require("./routes/waterprice"));
app.use("/api/reports", require("./routes/reports"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
