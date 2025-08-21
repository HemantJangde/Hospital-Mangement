import React, { useState, useEffect } from "react";
import axios from "axios";
const DashboardLayout = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState({
    todaysAppointments: 0,
    totalPatients: 0,
    completedAppointments: 0,
    cancellations: 0,
  });
  const [upcoming, setUpcoming] = useState([]);

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      const resStats = await axios.get("http://localhost:8000/dashboard/stats");
      setStats(resStats.data);

      const today = new Date().toISOString().split("T")[0];
      const resUpcoming = await axios.get(
        `http://localhost:8000/dashboard/upcoming/${today}`
      );
      setUpcoming(resUpcoming.data);
    } catch (err) {
      console.error("Error fetching dashboard data", err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 3000);
    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="container-fluid">
            <h2 className="h3 mb-3">📊 Dashboard Overview</h2>
            <p className="text-muted">
              Welcome back! Here’s a summary of your appointment activity.
            </p>

            {/* Stats */}
            <div className="row g-3 my-3">
              <div className="col-md-3">
                <div className="card text-center">
                  <div className="card-body">
                    <h6>📅 Today’s Appointments</h6>
                    <h3 className="text-primary">{stats.todaysAppointments}</h3>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-center">
                  <div className="card-body">
                    <h6>👥 Total Patients</h6>
                    <h3 className="text-success">{stats.totalPatients}</h3>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-center">
                  <div className="card-body">
                    <h6>✅ Completed</h6>
                    <h3 className="text-info">{stats.completedAppointments}</h3>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-center">
                  <div className="card-body">
                    <h6>❌ Cancellations</h6>
                    <h3 className="text-danger">{stats.cancellations}</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Table */}
            <div className="card mt-4">
              <div className="card-header fw-bold">📌 Upcoming Appointments</div>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Patient</th>
                      <th>Date</th>
                      <th>Slot</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {upcoming.length > 0 ? (
                      upcoming.map((appt, i) => (
                        <tr key={i}>
                          <td>{appt.userName}</td>
                          <td>{appt.date}</td>
                          <td>{appt.slot}</td>
                          <td>
                            <span
                              className={`badge ${
                                appt.status === "Confirmed"
                                  ? "bg-success"
                                  : appt.status === "Completed"
                                  ? "bg-primary"
                                  : "bg-warning text-dark"
                              }`}
                            >
                              {appt.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center text-muted">
                          No upcoming appointments
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case "register":
        return <Register />;
      case "schedule":
        return <AppointScheduling />;
      case "manage":
        return <ManageAppointment />;
      default:
        return null;
    }
  };

  return (
    <div className="d-flex">
    

      {/* Main Content */}
      <main className="flex-grow-1 p-4">{renderContent()}</main>
    </div>
  );
};

export default DashboardLayout;
