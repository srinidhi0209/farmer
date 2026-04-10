import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CustomerDashboard.module.css";

function CustomerDashboard({ cart, setCart, setRole, setUser }) {
  const navigate = useNavigate();
  const [notification, setNotification] = useState("");
  const user = JSON.parse(localStorage.getItem("user")) || { name: "Customer" };

  const products = [
    { 
      name: "Tomatoes", 
      price: 24, 
      image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg",
      description: "Fresh, juicy tomatoes perfect for salads and cooking",
      rating: 4.5,
      category: "vegetables"
    },
    { 
      name: "Mangoes", 
      price: 100, 
      image: "https://upload.wikimedia.org/wikipedia/commons/9/90/Hapus_Mango.jpg",
      description: "Sweet, ripe mangoes from local orchards",
      rating: 4.8,
      category: "fruits"
    },
    { 
      name: "Apples", 
      price: 150, 
      image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg",
      description: "Crisp and sweet apples, great for snacking",
      rating: 4.6,
      category: "fruits"
    },
    { 
      name: "Grapes", 
      price: 70, 
      image: "https://tse4.mm.bing.net/th/id/OIP.T_d6sxcB1gBHADClVzb-hwHaE8?pid=Api&P=0&h=180",
      description: "Sweet seedless grapes, perfect for desserts",
      rating: 4.4,
      category: "fruits"
    },
    { 
      name: "Potatoes", 
      price: 50, 
      image: "https://tse2.mm.bing.net/th/id/OIP.MeVmU4vtDMfEhWQJUirzWgHaE7?pid=Api&P=0&h=180",
      description: "Fresh farm potatoes, versatile for all recipes",
      rating: 4.3,
      category: "vegetables"
    },
    { 
      name: "Brinjal", 
      price: 70, 
      image: "https://tse2.mm.bing.net/th/id/OIP.FIOjVASE6F1pAakMl58HNgHaEw?pid=Api&P=0&h=180",
      description: "Fresh purple brinjal, great for curries",
      rating: 4.2,
      category: "vegetables"
    },
    { 
      name: "Cabbage", 
      price: 100, 
      image: "https://tse3.mm.bing.net/th/id/OIP.iHVn0jHOIz5zxnsFNjs36gHaE8?pid=Api&P=0&h=180",
      description: "Crunchy green cabbage, perfect for salads",
      rating: 4.1,
      category: "vegetables"
    },
    { 
      name: "Carrot", 
      price: 100, 
      image: "https://up.yimg.com/ib/th/id/OIP.3QV9_YrpDj_9MGVz2GW1iwHaEK?pid=Api&rs=1&c=1&qlt=95&w=173&h=97",
      description: "Sweet and crunchy carrots, rich in vitamins",
      rating: 4.5,
      category: "vegetables"
    },
    { 
      name: "Ladies Finger", 
      price: 50, 
      image: "https://up.yimg.com/ib/th/id/OIP.FU_kNrVoiin4KCAQf6cjsQHaE4?pid=Api&rs=1&c=1&qlt=95&w=157&h=103",
      description: "Tender ladies finger, perfect for stir-fry",
      rating: 4.0,
      category: "vegetables"
    },
    { 
      name: "Bottle Gourd", 
      price: 70, 
      image: "https://tse3.mm.bing.net/th/id/OIP.yMwPk-aQiuC0N4vFzpfl8gHaEK?pid=Api&P=0&h=180",
      description: "Fresh bottle gourd, great for healthy cooking",
      rating: 4.2,
      category: "vegetables"
    },
    { 
      name: "Bitter Gourd", 
      price: 45, 
      image: "https://tse2.mm.bing.net/th/id/OIP.I7seDQ2coIygESkNZanYVgHaEK?pid=Api&P=0&h=180",
      description: "Fresh bitter gourd, known for health benefits",
      rating: 3.8,
      category: "vegetables"
    },
    { 
      name: "Spinach", 
      price: 15, 
      image: "https://tse2.mm.bing.net/th/id/OIP.sb_552N9wJAn_6UAHX78OwHaE6?pid=Api&P=0&h=180",
      description: "Fresh green spinach, perfect for healthy meals",
      rating: 4.4,
      category: "vegetables"
    },
  ];

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(""), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setRole("");
    setUser(null);
    navigate("/");
  };

  const handleViewCart = () => {
    navigate("/cart");
  };

  const handleViewOrders = () => {
    navigate("/my-orders");
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Header Section */}
      <div className={styles.header}>
        <h1 className={styles.title}>Customer Dashboard 🛒</h1>
        <p className={styles.welcome}>Welcome back, {user.name}!</p>
        
        {notification && (
          <div style={{
            background: '#d4edda',
            color: '#155724',
            padding: '12px 20px',
            borderRadius: '8px',
            marginBottom: '20px',
            border: '1px solid #c3e6cb'
          }}>
            {notification}
          </div>
        )}
        
        <div className={styles.userActions}>
          <button onClick={handleViewCart} className={styles.actionButton}>
            🛒 View Cart ({cart.length})
          </button>
          <button onClick={handleViewOrders} className={styles.actionButton}>
            📦 My Orders
          </button>
          <button onClick={handleLogout} className={`${styles.actionButton} ${styles.secondary}`}>
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className={styles.productsGrid}>
        {products.map((product, index) => (
          <div key={index} className={styles.productCard}>
            <div className={styles.freshBadge}>Fresh</div>
            <img 
              src={product.image} 
              alt={product.name} 
              className={styles.productImage}
            />
            <div className={styles.productInfo}>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productPrice}>₹{product.price}/kg</p>
              <p className={styles.productRating}>⭐ {product.rating} ({Math.floor(Math.random() * 50 + 10)} reviews)</p>
              <p className={styles.productDescription}>{product.description}</p>
              <button
                className={styles.addToCartButton}
                onClick={() => handleAddToCart(product)}
              >
                🛒 Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerDashboard;
