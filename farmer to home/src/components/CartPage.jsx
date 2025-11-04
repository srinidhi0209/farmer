import React, { useState } from "react";
import axios from "axios";

function CartPage({ cart, setCart }) {
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [showForm, setShowForm] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleRemove = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleOrderNow = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    setShowForm(true);
  };

  const handleSubmitOrder = async () => {
    if (!address || !phone) {
      alert("Please enter address and phone number");
      return;
    }

    const orderData = {
      totalCost: total,
      items: cart,
      address,
      phone,
      customerEmail: user?.email,
      customerId: user?._id,
      customerName: user?.name,
    };

    try {
      const res = await axios.post("https://farm-to-home-backend.onrender.com/api/orders", orderData);
      alert("✅ Order placed successfully!");
      setCart([]);
      setAddress("");
      setPhone("");
      setShowForm(false);
    } catch (error) {
      console.error(error);
      alert("❌ Failed to place order. Please try again.");
    }
  };

  return (
    <div
      className="cart-page"
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>🛍️ Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty 🛒</p>
      ) : (
        <>
          {cart.map((item, i) => (
            <div
              key={i}
              className="cart-item"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "10px",
                marginBottom: "15px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <p style={{ margin: 0, fontSize: "16px" }}>
                  <b>{item.name}</b> – ₹{item.price}
                </p>
              </div>
              <button
                onClick={() => handleRemove(i)}
                style={{
                  background: "#ff4d4d",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "8px 12px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <h3
            style={{
              textAlign: "right",
              marginTop: "20px",
              fontSize: "18px",
            }}
          >
            Total: ₹{total}
          </h3>

          {!showForm ? (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <button
                onClick={handleOrderNow}
                style={{
                  background: "#4CAF50",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "10px 20px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                🛒 Order Now
              </button>
            </div>
          ) : (
            <div
              style={{
                marginTop: "20px",
                border: "1px solid #ccc",
                padding: "15px",
                borderRadius: "8px",
                background: "#f9f9f9",
              }}
            >
              <h3>Enter Delivery Details</h3>
              <label>Address:</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows="3"
                style={{
                  width: "100%",
                  marginBottom: "10px",
                  padding: "8px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              ></textarea>

              <label>Phone Number:</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{
                  width: "100%",
                  marginBottom: "10px",
                  padding: "8px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />

              <button
                onClick={handleSubmitOrder}
                style={{
                  background: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "10px 20px",
                  cursor: "pointer",
                }}
              >
                ✅ Confirm Order
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CartPage;
