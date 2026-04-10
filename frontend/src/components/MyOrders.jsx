import React, { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../constants/api";
import styles from "./MyOrders.module.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?._id) return;
      try {
        const res = await fetch(API_ENDPOINTS.CUSTOMER_ORDERS(user._id));
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  if (!user) {
    return <p style={{ textAlign: "center", marginTop: "20px" }}>⚠️ Please login to view your orders.</p>;
  }

  if (loading) return <p style={{ textAlign: "center" }}>Loading your orders...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>🧾 My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div>
          {orders.map((order, index) => (
            <div key={index} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px", borderRadius: "10px" }}>
              <p><b>Order Date:</b> {new Date(order.date).toLocaleString()}</p>
              <p><b>📅 Delivery Date:</b> {order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }) : 'Not specified'}</p>
              <p><b>Total Cost:</b> ₹{order.totalCost}</p>
              <p><b>Address:</b> {order.address}</p>
              <ul>
                {order.items.map((item, i) => (
                  <li key={i}>
                    {item.name} — ₹{item.price}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;
