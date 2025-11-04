import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login({ setRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // 🧑‍🌾 Fixed Farmer login
    if (email === "farmer@gmail.com" && password === "farmer123") {
      alert("Farmer logged in successfully!");
      setRole("farmer");
      navigate("/farmer-dashboard");
      return;
    }

    // 👩‍💼 Customer login via backend
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Invalid credentials!");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data));
      alert("Customer logged in successfully!");
      setRole("customer");
      navigate("/customer-dashboard");
    } catch (err) {
      console.error(err);
      alert("Server error, please try again later.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-btn">Login</button>
        </form>
        <p>
          New user? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
