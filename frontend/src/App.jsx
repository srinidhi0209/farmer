import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import FarmerLogin from "./components/FarmerLogin";
import Register from "./components/Register";
import FarmerRegister from "./components/FarmerRegister";
import FarmerDashboard from "./components/FarmerDashboard";
import CustomerDashboard from "./components/CustomerDashboard";
import CartPage from "./components/CartPage";
import Contact from "./components/Contact";
import MyOrders from "./components/MyOrders";
import About from "./components/About";
import "./styles/GlobalStyles.css";
import "./styles/Backgrounds.css";
import "./App.css";

function App() {
  const [role, setRole] = useState("");
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setRole(userData.role || "customer");
    }
  }, []);

  const ProtectedRoute = ({ children, requiredRole }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    if (requiredRole && user.role !== requiredRole) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <Router>
      <Navbar cartCount={cart.length} user={user} setRole={setRole} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setRole={setRole} setUser={setUser} />} />
        <Route path="/farmer-login" element={<FarmerLogin setRole={setRole} setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/farmer-register" element={<FarmerRegister />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage cart={cart} setCart={setCart} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/farmer-dashboard"
          element={
            <ProtectedRoute requiredRole="farmer">
              <FarmerDashboard setRole={setRole} setUser={setUser} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer-dashboard"
          element={
            <ProtectedRoute requiredRole="customer">
              <CustomerDashboard
                cart={cart}
                setCart={setCart}
                setRole={setRole}
                setUser={setUser}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
