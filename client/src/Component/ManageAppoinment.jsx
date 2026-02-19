import React, { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import axios from "axios";
import '../App.css'

import LoadingPage from "./LoadingPage";

const ManageAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ date: "", slot: "", status: "Pending" });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("date");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("https://hospital-mangement-bzp1.onrender.com/appoinmentUser/appointments/bookedShow");
        setAppointments(res.data.userRes);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Error fetching appointments");
        setLoading(false);
      }
    })();
  }, []);

  const sortAppointments = (list) =>
    [...list].sort((a, b) => (a[sortKey] < b[sortKey] ? (sortDirection === "asc" ? -1 : 1) : a[sortKey] > b[sortKey] ? (sortDirection === "asc" ? 1 : -1) : 0));

  const displayedAppointments = sortAppointments(
    appointments.filter((appt) => {
      const username = appt.userName?.toLowerCase() || "";
      const email = appt.userId?.toLowerCase() || "";
      const slot = appt.slot?.toLowerCase() || "";
      const date = appt.date || "";
      return username.includes(searchTerm.toLowerCase()) || email.includes(searchTerm.toLowerCase()) || date.includes(searchTerm) || slot.includes(searchTerm.toLowerCase());
    })
  );

  const toggleSort = (key) => {
    if (sortKey === key) setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const startEdit = (appt) => setEditingId(appt._id) || setEditForm({ date: appt.date, slot: appt.slot, status: appt.status });
  const cancelEdit = () => setEditingId(null) || setEditForm({ date: "", slot: "", status: "Pending" });
  const handleChange = (e) => setEditForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const saveEdit = async (id) => {
    if (!window.confirm("Are you sure you want to update the appointment?")) return;
    try {
      const response = await axios.put(`http://localhost:8000/appoinmentUser/appointments/updateUser/${id}`, editForm);
      if (response.data.status === 1) {
        alert("Appointment updated successfully");
        setAppointments((prev) => prev.map((appt) => (appt._id === id ? { ...appt, ...editForm } : appt)));
        cancelEdit();
      } else alert("Update failed from API");
    } catch {
      alert("Client error while updating appointment");
    }
  };

  const cancelAppointment = async (id) => {
    if (!window.confirm("Are You Sure You Want To Cancel The Appointment?")) return;
    try {
      const response = await axios.delete(`http://localhost:8000/appoinmentUser/appointments/delete/${id}`);
      if (response.data.status === 1) {
        alert("Appointment cancelled successfully ✅");
        setAppointments((prev) => prev.filter((appt) => appt._id !== id));
      } else alert("Failed To Cancel the Appointment API: " + response.data.msg);
    } catch {
      alert("❌ Server error while cancelling appointment");
    }
  };

  const formatDate = (dateStr) => format(parseISO(dateStr), "PPP");

  if (loading) return <div className="text-center " style={{paddingTop:"100px"}}>Loading...</div>;
  if (error) return <div className="text-center py-5 text-danger">{error}</div>;

  return (
    <div className="container my-4 animate-fade-in p-5">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
        <div>
          <h1 className="h3">Appointment Management</h1>
          <p className="text-muted mb-0">Manage and update patient appointments</p>
        </div>
        <div className="mt-2 mt-md-0">
          <input type="text" placeholder="Search appointments..." className="form-control input-animate" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>

      {displayedAppointments.length === 0 ? (
        <div className="text-center py-5 text-muted">No appointments found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
              <tr>
                {["userName", "date", "slot", "status"].map((key) => (
                  <th key={key} style={{ cursor: "pointer" }} onClick={() => toggleSort(key)}>
                    {key === "userName" ? "Patient" : key.charAt(0).toUpperCase() + key.slice(1)}
                    {sortKey === key && <span className="ms-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                  </th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedAppointments.map((appt, idx) => (
                <tr key={appt._id} className="animate-fade-up" style={{ animationDelay: `${idx * 0.05}s` }}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center avatar">
                        {appt.userName.charAt(0)}
                      </div>
                      <div className="ms-2">
                        <div>{appt.userName}</div>
                        <small className="text-muted">{appt.userId}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    {editingId === appt._id ? <input type="date" name="date" value={editForm.date} onChange={handleChange} className="form-control form-control-sm input-animate" /> : formatDate(appt.date)}
                  </td>
                  <td>
                    {editingId === appt._id ? (
                      <select name="slot" value={editForm.slot} onChange={handleChange} className="form-select form-select-sm input-animate">
                        {["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"].map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    ) : (
                      appt.slot
                    )}
                  </td>
                  <td>
                    {editingId === appt._id ? (
                      <select name="status" value={editForm.status} onChange={handleChange} className="form-select form-select-sm input-animate">
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Completed">Completed</option>
                      </select>
                    ) : (
                      <span className={`badge badge-animate ${appt.status === "Confirmed" ? "bg-success" : appt.status === "Cancelled" ? "bg-danger" : appt.status === "Completed" ? "bg-primary" : "bg-warning text-dark"}`}>{appt.status}</span>
                    )}
                  </td>
                  <td>
                    {editingId === appt._id ? (
                      <div className="d-flex gap-2">
                        <button onClick={() => saveEdit(appt._id)} className="btn btn-sm btn-primary btn-animate">
                          Save
                        </button>
                        <button onClick={cancelEdit} className="btn btn-sm btn-secondary btn-animate">
                          Cancel
                        </button>
                      </div>
                    ) : editingId === null ? (
                      <button onClick={() => startEdit(appt)} className="btn btn-sm btn-primary btn-animate">
                        Edit
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageAppointment;
