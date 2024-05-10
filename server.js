const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 4000;
dotenv.config();

//DB connection
connectDB();
//middleware
app.use(cors());
app.use(express.json());

//route
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/resturant", require("./routes/resturantRoutes"));
app.use("/api/v1/category",require('./routes/categoryRoutes'));

app.get("/", (req, res) => {
  res.send("Welcome to food app");
});
app.listen(PORT, () => console.log("port running on", PORT));
