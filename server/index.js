const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

// Routes
const authRoutes = require("./routes/auth.js");
const registerRoute = require("./routes/registerRoute.js");
const appoinmentRoute = require("./routes/appoinmentRoute.js");
const dashboardRoute = require("./routes/dashboardRoute.js");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Use routes with prefix
app.use("/api/auth", authRoutes);
app.use("/registerUser", registerRoute);
app.use("/appoinmentUser", appoinmentRoute);
app.use("/dashboard", dashboardRoute);

// Root route
app.get("/", (req, res) => {
  res.send("Server is live and running!");
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err));

// Use Render’s dynamic port or default to 8000 for local
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
