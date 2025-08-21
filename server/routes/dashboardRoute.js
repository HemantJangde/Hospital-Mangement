const express = require("express");
const dashboardRoute = express.Router();
const { totalShow, upcomingShow } = require("../controllers/dashboardControllers.js");

// Base route for checking
dashboardRoute.get("/", (req, res) => {
  res.send("Hello Dashboard");
});

// Stats route
dashboardRoute.get("/stats", totalShow);

// Upcoming appointments (optional date via query)
dashboardRoute.get("/upcoming", upcomingShow);

module.exports = dashboardRoute;
