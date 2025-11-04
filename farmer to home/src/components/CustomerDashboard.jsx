import React from "react";
import { useNavigate } from "react-router-dom";

function CustomerDashboard({ cart, setCart, setRole }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || { name: "Customer" };

  const products = [
    { name: "Tomatoes", price: 24, image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg" },
    { name: "Mangoes", price: 100, image: "https://upload.wikimedia.org/wikipedia/commons/9/90/Hapus_Mango.jpg" },
    { name: "apples", price: 150, image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg" },
    { name: "grapes", price: 70, image: "https://tse4.mm.bing.net/th/id/OIP.T_d6sxcB1gBHADClVzb-hwHaE8?pid=Api&P=0&h=180" },
    { name: "potatoes", price: 50, image: "https://tse2.mm.bing.net/th/id/OIP.MeVmU4vtDMfEhWQJUirzWgHaE7?pid=Api&P=0&h=180" },
    { name: "brinjal", price: 70, image: "https://tse2.mm.bing.net/th/id/OIP.FIOjVASE6F1pAakMl58HNgHaEw?pid=Api&P=0&h=180" },
    { name: "cabbage", price: 100, image: "https://tse3.mm.bing.net/th/id/OIP.iHVn0jHOIz5zxnsFNjs36gHaE8?pid=Api&P=0&h=180" },
    { name: "carrot", price: 100, image: "https://up.yimg.com/ib/th/id/OIP.3QV9_YrpDj_9MGVz2GW1iwHaEK?pid=Api&rs=1&c=1&qlt=95&w=173&h=97" },
    { name: "laddies finger", price: 50, image: "https://up.yimg.com/ib/th/id/OIP.FU_kNrVoiin4KCAQf6cjsQHaE4?pid=Api&rs=1&c=1&qlt=95&w=157&h=103" },
    { name: "bottle guard", price: 70, image: "https://tse3.mm.bing.net/th/id/OIP.yMwPk-aQiuC0N4vFzpfl8gHaEK?pid=Api&P=0&h=180" },
    { name: "bitter guard", price: 45, image: "https://tse2.mm.bing.net/th/id/OIP.I7seDQ2coIygESkNZanYVgHaEK?pid=Api&P=0&h=180" },
    { name: "spinach", price: 15, image: "https://tse2.mm.bing.net/th/id/OIP.sb_552N9wJAn_6UAHX78OwHaE6?pid=Api&P=0&h=180" },
  ];

  const styles = {
    container: {
      textAlign: "center",
      padding: "30px",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f8f9fa",
      minHeight: "100vh",
    },
    title: {
      fontSize: "28px",
      marginBottom: "10px",
      color: "#333",
    },
    welcome: {
      fontSize: "18px",
      color: "#666",
      marginBottom: "20px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "20px",
      justifyContent: "center",
      alignItems: "stretch",
      padding: "10px",
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: "12px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      padding: "15px",
      textAlign: "center",
      transition: "transform 0.2s, box-shadow 0.2s",
    },
    cardHover: {
      transform: "scale(1.03)",
      boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    },
    image: {
      width: "100%",
      height: "150px",
      objectFit: "cover",
      borderRadius: "10px",
      marginBottom: "10px",
    },
    name: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#222",
      marginBottom: "5px",
    },
    price: {
      fontSize: "16px",
      color: "#28a745",
      fontWeight: "bold",
      marginBottom: "5px",
    },
    rating: {
      color: "#f39c12",
      marginBottom: "10px",
    },
    button: {
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      padding: "8px 12px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold",
      transition: "background 0.3s",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Customer Dashboard 🛒</h1>
      <p style={styles.welcome}>Welcome back, {user.name}!</p>

      <div style={styles.grid}>
        {products.map((p, i) => (
          <div
            key={i}
            style={styles.card}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
            }}
          >
            <img src={p.image} alt={p.name} style={styles.image} />
            <h4 style={styles.name}>{p.name}</h4>
            <p style={styles.price}>₹{p.price}</p>
            <p style={styles.rating}>⭐ {p.rating}</p>
            <button
              style={styles.button}
              onClick={() => setCart([...cart, p])}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerDashboard;
