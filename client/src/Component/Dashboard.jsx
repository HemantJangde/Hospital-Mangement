import React, { useState, useEffect } from "react";
import axios from "axios";
import { format, parseISO, isToday } from "date-fns";
import AOS from "aos";
import "aos/dist/aos.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    todaysAppointments: 0,
    totalPatients: 0,
    completedAppointments: 0,
    cancellations: 0,
  });
  const [upcoming, setUpcoming] = useState([]);

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get(
        "https://hospital-mangement-bzp1.onrender.com/appoinmentUser/appointments/bookedShow"
      );

      const todayStr = new Date().toISOString().split("T")[0];

      const upcomingAppointments = res.data.userRes
        .filter((appt) => appt.date >= todayStr)
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      setUpcoming(upcomingAppointments);

      const totalPatients = res.data.userRes.length;
      const todaysAppointments = res.data.userRes.filter(
        (appt) => appt.date === todayStr
      ).length;
      const completedAppointments = res.data.userRes.filter(
        (a) => a.status === "Completed"
      ).length;
      const cancellations = res.data.userRes.filter(
        (a) => a.status === "Cancelled"
      ).length;

      setStats({
        todaysAppointments,
        totalPatients,
        completedAppointments,
        cancellations,
      });
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 800, once: false, mirror: true });
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 3000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateStr) => format(parseISO(dateStr), "PPP");

  return (
    <div className="container-fluid">
      <div className="container my-4">
        <h2 className="mb-3" data-aos="fade-down">📊 Dashboard Overview</h2>

        {/* Stats Cards */}
        <div className="row g-3 mb-4">
          <div className="col-md-3" data-aos="fade-up" data-aos-delay="100">
            <div className="card text-center shadow-sm dashboard-card">
              <div className="card-body">
                <h6>📅 Today's Appointments</h6>
                <h3 className="text-primary">{stats.todaysAppointments}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3" data-aos="fade-up" data-aos-delay="200">
            <div className="card text-center shadow-sm dashboard-card">
              <div className="card-body">
                <h6>👥 Total Patients</h6>
                <h3 className="text-success">{stats.totalPatients}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3" data-aos="fade-up" data-aos-delay="300">
            <div className="card text-center shadow-sm dashboard-card">
              <div className="card-body">
                <h6>✅ Completed</h6>
                <h3 className="text-info">{stats.completedAppointments}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3" data-aos="fade-up" data-aos-delay="400">
            <div className="card text-center shadow-sm dashboard-card">
              <div className="card-body">
                <h6>❌ Cancellations</h6>
                <h3 className="text-danger">{stats.cancellations}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Table */}
        <div className="card shadow-sm" data-aos="fade-up" data-aos-delay="500">
          <div className="card-header fw-bold">📌 Upcoming Appointments</div>
          <div className="table-responsive">
            <table className="table table-striped mb-0 table-hover dashboard-table">
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
                  upcoming.map((appt) => (
                    <tr
                      key={appt._id}
                      className={isToday(parseISO(appt.date)) ? "table-warning" : ""}
                    >
                      <td>{appt.userName}</td>
                      <td>{formatDate(appt.date)}</td>
                      <td>{appt.slot}</td>
                      <td>
                        <span
                          className={`badge ${
                            appt.status === "Confirmed"
                              ? "bg-success"
                              : appt.status === "Completed"
                              ? "bg-primary"
                              : appt.status === "Cancelled"
                              ? "bg-danger"
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
    </div>
  );
};

export default Dashboard;
