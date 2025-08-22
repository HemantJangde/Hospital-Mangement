import React, { useState, useEffect } from "react";
import axios from "axios";

const MOCK_SLOTS = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
];

const AppointScheduling = () => {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const [selectedDate, setSelectedDate] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  // Fetch users
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoadingUsers(true);
        const response = await axios.get(
          "http://localhost:8000/registerUser/showUser"
        );
        if (response.data.status === 1) {
          setUsers(response.data.userRes);
        } else {
          alert("Users fetch nahi ho paaye");
        }
      } catch (err) {
        console.log("Frontend SE data Fetch Nahi ho Raha hai", err);
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUser();
  }, []);

  // Fetch booked slots
  useEffect(() => {
    if (!selectedDate) {
      setBookedSlots([]);
      return;
    }

    const fetchBookedSlots = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/appoinmentUser/appointments/booked-slots",
          { params: { date: selectedDate } }
        );
        if (res.data.status === 1) {
          setBookedSlots(res.data.bookedSlots || []);
        } else {
          alert("Slots fetch nahi ho paaye");
        }
      } catch (err) {
        console.error("Booked slots fetch error:", err);
      }
    };
    fetchBookedSlots();
  }, [selectedDate]);

  const handleBooking = async () => {
    if (!selectedDate) return alert("Please select a date");
    if (!selectedSlot) return alert("Please select a time slot");
    if (!selectedUser) return alert("Please select a user");

    const selectedUserObj = users.find((user) => user._id === selectedUser);
    if (!selectedUserObj) return alert("Selected user not found!");

    try {
      const res = await axios.post(
        "http://localhost:8000/appoinmentUser/appointments/book",
        {
          userId: selectedUser,
          userName: selectedUserObj.name,
          date: selectedDate,
          slot: selectedSlot,
        }
      );

      if (res.data.status === 1) {
        alert("Booking Successfully");
        setBookedSlots([...bookedSlots, selectedSlot]);
        setSelectedSlot("");
        setSelectedUser("");
      } else {
        alert("❌ " + res.data.msg);
      }
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Server Error: Booking failed");
    }
  };

  return (
    <div className="container my-4 p-5">
      <div className="card shadow-sm mx-auto" style={{ maxWidth: "500px" }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-4">
            Appointment Slot Allocation
          </h3>

          {/* Date Picker */}
          <div className="mb-3">
            <label htmlFor="datePicker" className="form-label">
              Date Choose karo
            </label>
            <input
              type="date"
              id="datePicker"
              className="form-control"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          {/* User Select */}
          <div className="mb-3">
            <label htmlFor="userSelect" className="form-label">
              User Select karo
            </label>
            <select
              id="userSelect"
              className="form-select"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">-- User choose karo --</option>
              {loadingUsers ? (
                <option disabled>Loading users...</option>
              ) : (
                users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name} ({user.idProof})
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Slots */}
          <div className="mb-4">
            <label className="form-label">Available Slots</label>
            <div className="d-flex flex-wrap gap-2">
              {MOCK_SLOTS.map((slot) => {
                const isBooked = bookedSlots.includes(slot);
                return (
                  <button
                    key={slot}
                    type="button"
                    disabled={isBooked}
                    onClick={() => setSelectedSlot(slot)}
                    className={`btn btn-sm ${
                      isBooked
                        ? "btn-danger disabled"
                        : selectedSlot === slot
                        ? "btn-success"
                        : "btn-outline-success"
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Book Button */}
          <div className="d-grid">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleBooking}
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointScheduling;
