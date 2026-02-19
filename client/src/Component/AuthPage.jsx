import { useState } from "react";
import api from "./axios.js"; // 👈 import axios instance
import "../AuthPage.css"
import LoadingPage from "./LoadingPage.jsx";
export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        setLoading(true); // 🔥 show loading page

      if (isLogin) {
        const res = await api.post("/login", { email: formData.email, password: formData.password });
        if (res.data.success) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          setMessage("✅ Login successful!");
          window.location.href = "/";
        }
      } else {
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
    // 🚀 Show loading screen
  if (loading) {
    return <LoadingPage text={isLogin ? "Logging you in..." : "Creating your account..."} />;
  }

  return (
    <div className="auth-container">
      <div className="auth-card animate-fade-in shadow-lg p-4 rounded-4">
        <h2 className="text-center mb-4">{isLogin ? "Login" : "Signup"}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input type="text" name="username" className="form-control input-animate" onChange={handleChange} required />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" name="email" className="form-control input-animate" onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" name="password" className="form-control input-animate" onChange={handleChange} required />
          </div>

          {!isLogin && (
            <div className="mb-3">
              <label className="form-label">Role</label>
              <select name="role" className="form-control input-animate" value={formData.role} onChange={handleChange}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          )}

          <button type="submit" className="btn btn-gradient w-100 mt-3">
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>

        <p className="text-center mt-3 toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button className="btn btn-link p-0 toggle-btn" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Signup" : "Login"}
          </button>
        </p>

        {message && <p className="text-center mt-2 message-bounce">{message}</p>}
      </div>
    </div>
  );
}
