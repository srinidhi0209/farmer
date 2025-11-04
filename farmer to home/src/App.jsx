import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import FarmerDashboard from "./components/FarmerDashboard";
import CustomerDashboard from "./components/CustomerDashboard";
import CartPage from "./components/CartPage";
import Contact from "./components/Contact";
import MyOrders from "./components/MyOrders";
import "./App.css";

function App() {
  const [role, setRole] = useState("");
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <Navbar cartCount={cart.length} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setRole={setRole} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/cart"
          element={<CartPage cart={cart} setCart={setCart} />}
        />
        <Route
          path="/farmer-dashboard"
          element={<FarmerDashboard setRole={setRole} />}
        />
        <Route
          path="/customer-dashboard"
          element={
            <CustomerDashboard
              cart={cart}
              setCart={setCart}
              setRole={setRole}
            />
          }
        />
        <Route path="/myorders" element={<MyOrders />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
