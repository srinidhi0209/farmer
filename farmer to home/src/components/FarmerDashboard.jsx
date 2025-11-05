import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FarmerDashboard({ setRole }) {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  const handleLogout = () => {
    setRole("");
    localStorage.removeItem("user");
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="dashboard" style={{ padding: "20px" }}>
      <h1>👩‍🌾 Farmer Dashboard</h1>
      <p>Logged in as: <b>farmer@gmail.com</b></p>

      <h2>📦 Customer Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div style={{ display: "grid", gap: "20px" }}>
          {orders.map((order) => (
            <div
              key={order._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "12px",
                padding: "15px",
                background: "#f9f9f9",
              }}
            >
              <h3>🧑‍🌾 {order.customerName}</h3>
              <p>
                <b>Email:</b> {order.customerEmail} <br />
                <b>Phone:</b> {order.phone} <br />
                <b>Address:</b> {order.address}
              </p>

              <h4>🛒 Items Ordered:</h4>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      padding: "10px",
                      textAlign: "center",
                      width: "120px",
                      background: "white",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                    <p style={{ marginTop: "5px" }}>
                      <b>{item.name}</b>
                      <br />₹{item.price}
                    </p>
                  </div>
                ))}
              </div>

              <p style={{ marginTop: "10px" }}>
                <b>Total Cost:</b> ₹{order.totalCost}
              </p>
              <p>
                <b>Order Date:</b>{" "}
                {new Date(order.date).toLocaleString("en-IN")}
              </p>
            </div>
          ))}
        </div>
        
      )}
    
      <button
        onClick={handleLogout}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#e74c3c",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default FarmerDashboard;
