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
        className="card shadow-lg border-0 rounded-4"
        style={{ maxWidth: "420px", width: "100%" }}
      >
        <div className="card-body p-4 p-md-5">
          <h4 className="card-title mb-4 text-center fw-bold text-primary">
            Register User
          </h4>
          <form onSubmit={handleSubmit}>
            {[
              { label: "Full Name", type: "text", value: name, setter: setName, placeholder: "Enter full name" },
              { label: "Age", type: "number", value: age, setter: setAge, placeholder: "Enter age", min: 0 },
              { label: "Contact Info", type: "tel", value: contact, setter: setContact, placeholder: "Enter contact number" },
              { label: "ID Proof", type: "text", value: idProof, setter: setIdProof, placeholder: "Enter ID proof" },
            ].map((field, idx) => (
              <div className="mb-3" key={idx}>
                <label className="form-label fw-semibold">{field.label}</label>
                <input
                  type={field.type}
                  className="form-control form-control-lg rounded-3"
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={(e) => field.setter(e.target.value)}
                  min={field.min}
                  required
                />
              </div>
            ))}

            <div className="mb-3">
              <label className="form-label fw-semibold">Gender</label>
              <select
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

            <div className="d-grid mt-4">
              <button
                type="submit"
                className="btn btn-lg fw-bold rounded-3"
                style={{
                  background: hover
                    ? "linear-gradient(90deg, #6610f2, #0d6efd)"
                    : "linear-gradient(90deg, #0d6efd, #6610f2)",
                  border: "none",
                  color: "#fff",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
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
