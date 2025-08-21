import { useState } from "react";
import api from "./axios.js"; // 👈 import axios instance

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user", // default role
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // 🔹 LOGIN
        const res = await api.post("/login", {
          email: formData.email,
          password: formData.password,
        });

        if (res.data.success) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          setMessage("✅ Login successful!");
          window.location.href = "/"; // redirect
        }
      } else {
        // 🔹 SIGNUP
        const res = await api.post("/signup", formData);

        if (res.data.success) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          setMessage("✅ Signup successful!");
          window.location.href = "/";
        }
      }
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.error || "Something went wrong"));
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="text-center mb-4">{isLogin ? "Login" : "Signup"}</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow">
        {!isLogin && (
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        {!isLogin && (
          <div className="mb-3">
            <label className="form-label">Role</label>
            <select
              name="role"
              className="form-control"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        )}

        <button type="submit" className="btn btn-primary w-100">
          {isLogin ? "Login" : "Signup"}
        </button>
      </form>

      <p className="text-center mt-3">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          className="btn btn-link p-0"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Signup" : "Login"}
        </button>
      </p>

      {message && <p className="text-center mt-2 text-danger">{message}</p>}
    </div>
  );
}
