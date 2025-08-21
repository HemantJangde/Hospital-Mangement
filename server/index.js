
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth.js");
  // Routes
  const registerRoute = require("./routes/registerRoute.js");
  const appoinmentRoute=require("./routes/appoinmentRoute.js");
  const dashboardRoute=require("./routes/dashboardRoute.js")


dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());


// Use routes with prefix
app.use("/api/auth", authRoutes);
app.use("/registerUser", registerRoute);
app.use("/appoinmentUser",appoinmentRoute);
app.use("/dashboard",dashboardRoute)


app.get("/", (req, res) => {
  res.send("Hello World!");
});

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
