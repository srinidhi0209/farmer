import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_ENDPOINTS } from "../constants/api";
import styles from "./CartPage.module.css";

function CartPage({ cart, setCart }) {
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  // If user is not logged in, show login prompt
  if (!user) {
    return (
      <div className={styles.cartPage}>
        <div className={styles.loginPrompt}>
          <h2>🔐 Login Required</h2>
          <p>Please login to access your cart and place orders.</p>
          <div className={styles.loginButtons}>
            <Link to="/login" className={styles.loginButton}>Login</Link>
            <Link to="/register" className={styles.registerButton}>Register</Link>
          </div>
        </div>
      </div>
    );
  }

  const handleRemove = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const handleOrderNow = () => {
    if (cart.length === 0) {
      setError("Your cart is empty!");
      setTimeout(() => setError(""), 3000);
      return;
    }
    setError("");
    setShowForm(true);
  };

  const handleSubmitOrder = async () => {
    if (!address.trim() || !phone.trim() || !deliveryDate) {
      setError("Please enter address, phone number, and delivery date");
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (!/^\d{10}$/.test(phone.replace(/\s/g, ''))) {
      setError("Please enter a valid 10-digit phone number");
      setTimeout(() => setError(""), 3000);
      return;
    }

    setIsLoading(true);
    setError("");

    const orderData = {
      customerId: user?._id,
      customerName: user?.name,
      customerEmail: user?.email,
      phone: phone.trim(),
      address: address.trim(),
      items: cart,
      totalCost: total,
      deliveryDate: deliveryDate,
    };

    try {
      const res = await axios.post(API_ENDPOINTS.ORDERS, orderData);
      setSuccess("Order confirmed! Please select payment method.");
      setShowPayment(true);
      setTimeout(() => setSuccess(""), 5000);
    } catch (error) {
      console.error("Order error:", error);
      setError(error.response?.data?.message || "Failed to place order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = () => {
    if (!paymentMethod) {
      setError("Please select a payment method");
      return;
    }
    
    setError("");
    const formattedDate = new Date(deliveryDate).toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    setSuccess(`Payment successful via ${paymentMethod}! Order completed. Delivery on ${formattedDate}.`);
    setCart([]);
    setAddress("");
    setPhone("");
    setDeliveryDate("");
    setShowForm(false);
    setShowPayment(false);
    setPaymentMethod("");
    setTimeout(() => setSuccess(""), 5000);
  };

  return (
    <div className={styles.cartPage}>
      <h1 className={styles.title}>🛍️ Your Cart</h1>

      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}

      {cart.length === 0 ? (
        <p className={styles.emptyCart}>Your cart is empty 🛒</p>
      ) : (
        <>
          {cart.map((item, i) => (
            <div key={i} className={styles.cartItem}>
              <div className={styles.itemDetails}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.itemImage}
                />
                <p className={styles.itemInfo}>
                  <span className={styles.itemName}>{item.name}</span> – 
                  <span className={styles.itemPrice}>₹{item.price}</span>
                </p>
              </div>
              <button
                onClick={() => handleRemove(i)}
                className={styles.removeButton}
              >
                Remove
              </button>
            </div>
          ))}

          <div className={styles.totalSection}>
            Total: ₹{total}
          </div>

          {!showForm ? (
            <div className={styles.orderButtonContainer}>
              <button
                onClick={handleOrderNow}
                className={styles.orderButton}
              >
                🛒 Order Now
              </button>
            </div>
          ) : (
            <div className={styles.deliveryForm}>
              <h3 className={styles.formTitle}>Enter Delivery Details</h3>
              
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Address:</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows="3"
                  className={styles.formTextarea}
                  placeholder="Enter your complete delivery address"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Phone Number:</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={styles.formInput}
                  placeholder="Enter your 10-digit phone number"
                  maxLength={10}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>📅 Delivery Date:</label>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className={styles.formInput}
                  min={getMinDate()}
                  required
                />
              </div>

              <button
                onClick={handleSubmitOrder}
                className={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "✅ Confirm Order"}
              </button>
            </div>
          )}

          {showPayment && (
            <div className={styles.paymentForm}>
              <h3 className={styles.formTitle}>💳 Select Payment Method</h3>
              
              <div className={styles.paymentOptions}>
                <label className={styles.paymentOption}>
                  <input
                    type="radio"
                    name="payment"
                    value="Credit Card"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className={styles.paymentRadio}
                  />
                  <span className={styles.paymentLabel}>💳 Credit Card</span>
                </label>
                
                <label className={styles.paymentOption}>
                  <input
                    type="radio"
                    name="payment"
                    value="Debit Card"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className={styles.paymentRadio}
                  />
                  <span className={styles.paymentLabel}>💳 Debit Card</span>
                </label>
                
                <label className={styles.paymentOption}>
                  <input
                    type="radio"
                    name="payment"
                    value="UPI"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className={styles.paymentRadio}
                  />
                  <span className={styles.paymentLabel}>📱 UPI</span>
                </label>
                
                <label className={styles.paymentOption}>
                  <input
                    type="radio"
                    name="payment"
                    value="Cash on Delivery"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className={styles.paymentRadio}
                  />
                  <span className={styles.paymentLabel}>💵 Cash on Delivery</span>
                </label>
              </div>

              <button
                onClick={handlePayment}
                className={styles.paymentButton}
              >
                💳 Complete Payment
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CartPage;
