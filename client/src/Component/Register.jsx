import React, { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [idProof, setIdProof] = useState("");

  const [hover, setHover] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contact.length < 10) {
      alert("Contact number should be at least 10 digits.");
      return;
    }

    const userData = { name, age, gender, contact, idProof };

    try {
      const response = await fetch(
        "http://localhost:8000/registerUser/insertUser",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );
      const data = await response.json();
      if (data.status === 1) {
        alert("User registered successfully!");
        setName("");
        setAge("");
        setGender("");
        setContact("");
        setIdProof("");
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 p-3 bg-light">
      <div
        className="card shadow-lg border-0 rounded-4 w-100"
        style={{ maxWidth: "500px" }}
      >
        <div className="card-body p-5">
          <h4 className="card-title mb-4 text-center fw-bold text-primary">
            Register User
          </h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label fw-semibold">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control form-control-lg rounded-3"
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="age" className="form-label fw-semibold">
                Age
              </label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="form-control form-control-lg rounded-3"
                placeholder="Enter age"
                required
                min={0}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="gender" className="form-label fw-semibold">
                Gender
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="form-select form-select-lg rounded-3"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="contactInfo" className="form-label fw-semibold">
                Contact Info
              </label>
              <input
                type="tel"
                id="contactInfo"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="form-control form-control-lg rounded-3"
                placeholder="Enter contact number"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="idProof" className="form-label fw-semibold">
                ID Proof
              </label>
              <input
                type="text"
                id="idProof"
                value={idProof}
                onChange={(e) => setIdProof(e.target.value)}
                className="form-control form-control-lg rounded-3"
                placeholder="Enter ID proof"
                required
              />
            </div>

            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-lg fw-bold rounded-3"
                style={{
                  background: hover
                    ? "linear-gradient(90deg, #6610f2, #0d6efd)"
                    : "linear-gradient(90deg, #0d6efd, #6610f2)",
                  border: "none",
                  color: "#fff",
                  transition: "0.3s",
                }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                Register User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
