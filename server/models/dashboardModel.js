const mongoose = require('mongoose');

const appointmentDashboardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: String, required: true },
});

// Prevent OverwriteModelError
const Dashboard = mongoose.models.Dashboard || mongoose.model('Dashboard', appointmentDashboardSchema);

module.exports = Dashboard;
