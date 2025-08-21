import React, { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import axios from "axios";

const ManageAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    date: "",
    slot: "",
    status: "Pending",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("date");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/appoinmentUser/appointments/bookedShow"
        );
        setAppointments(res.data.userRes);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Error fetching appointments");
        setLoading(false);
      }
    })();
  }, []);

  const sortAppointments = (list) => {
    return [...list].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  };

  const displayedAppointments = sortAppointments(
    appointments.filter((appt) => {
      const username = appt.userName ? appt.userName.toLowerCase() : "";
      const email = appt.userId ? appt.userId.toLowerCase() : "";
      const slot = appt.slot ? appt.slot.toLowerCase() : "";
      const date = appt.date || "";

      return (
        username.includes(searchTerm.toLowerCase()) ||
        email.includes(searchTerm.toLowerCase()) ||
        date.includes(searchTerm) ||
        slot.includes(searchTerm.toLowerCase())
      );
    })
  );

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const startEdit = (appt) => {
    setEditingId(appt._id);
    setEditForm({ date: appt.date, slot: appt.slot, status: appt.status });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ date: "", slot: "", status: "Pending" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = async (id) => {
    const confirmUpdate = window.confirm(
      "Are you sure you want to update the appointment?"
    );
    if (!confirmUpdate) return;

    try {
      const response = await axios.put(
        `http://localhost:8000/appoinmentUser/appointments/updateUser/${id}`,
        {
          date: editForm.date,
          slot: editForm.slot,
          status: editForm.status,
        }
      );

      if (response.data.status === 1) {
        alert("Appointment updated successfully");

        setAppointments((prev) =>
          prev.map((appt) =>
            appt._id === id
              ? {
                  ...appt,
                  date: editForm.date,
                  slot: editForm.slot,
                  status: editForm.status,
                }
              : appt
          )
        );

        cancelEdit();
      } else {
        alert("Update failed from API");
      }
    } catch (err) {
      alert("Client error while updating appointment");
    }
  };

  const cancelAppointment = async (id) => {
    const confirmCancel = window.confirm(
      "Are You Sure You Want To Cancel The Appointment?"
    );
    if (!confirmCancel) return;

    try {
      const response = await axios.delete(
        `http://localhost:8000/appoinmentUser/appointments/delete/${id}`
      );
      if (response.data.status === 1) {
        alert("Appointment cancelled successfully ✅");
        setAppointments((prev) => prev.filter((appt) => appt._id !== id));
      } else {
        alert("Failed To Cancel the Appointment API: " + response.data.msg);
      }
    } catch (err) {
      alert("❌ Server error while cancelling appointment");
    }
  };

  const formatDate = (dateStr) => format(parseISO(dateStr), "PPP");

  return (
    <div className="container my-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
        <div>
          <h1 className="h3">Appointment Management</h1>
          <p className="text-muted mb-0">Manage and update patient appointments</p>
        </div>
        <div className="mt-2 mt-md-0">
          <input
            type="text"
            placeholder="Search appointments..."
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
                  <th
                    key={key}
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleSort(key)}
                  >
                    {key === "userName"
                      ? "Patient"
                      : key.charAt(0).toUpperCase() + key.slice(1)}
                    {sortKey === key && (
                      <span className="ms-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                    )}
                  </th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedAppointments.map((appt) => (
                <tr key={appt._id}>
                  {/* Patient Info */}
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center" style={{width: '35px', height: '35px'}}>
                        {appt.userName.charAt(0)}
                      </div>
                      <div className="ms-2">
                        <div>{appt.userName}</div>
                        <small className="text-muted">{appt.userId}</small>
                      </div>
                    </div>
                  </td>

                  {/* Date */}
                  <td>
                    {editingId === appt._id ? (
                      <input
                        type="date"
                        name="date"
                        value={editForm.date}
                        onChange={handleChange}
                        className="form-control form-control-sm"
                      />
                    ) : (
                      formatDate(appt.date)
                    )}
                  </td>

                  {/* Slot */}
                  <td>
                    {editingId === appt._id ? (
                      <select
                        name="slot"
                        value={editForm.slot}
                        onChange={handleChange}
                        className="form-select form-select-sm"
                      >
                        {[
                          "09:00 AM",
                          "10:00 AM",
                          "11:00 AM",
                          "12:00 PM",
                          "01:00 PM",
                          "02:00 PM",
                          "03:00 PM",
                          "04:00 PM",
                        ].map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    ) : (
                      appt.slot
                    )}
                  </td>

                  {/* Status */}
                  <td>
                    {editingId === appt._id ? (
                      <select
                        name="status"
                        value={editForm.status}
                        onChange={handleChange}
                        className="form-select form-select-sm"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Completed">Completed</option>
                      </select>
                    ) : (
                      <span
                        className={`badge ${
                          appt.status === "Confirmed"
                            ? "bg-success"
                            : appt.status === "Cancelled"
                            ? "bg-danger"
                            : appt.status === "Completed"
                            ? "bg-primary"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {appt.status}
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td>
                    {editingId === appt._id ? (
                      <div className="d-flex gap-2">
                        <button
                          onClick={() => saveEdit(appt._id)}
                          className="btn btn-sm btn-primary"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="btn btn-sm btn-secondary"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : editingId === null ? (
                      <button
                        onClick={() => startEdit(appt)}
                        className="btn btn-sm btn-primary"
                      >
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
