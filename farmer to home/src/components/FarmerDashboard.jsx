import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../constants/api";
import styles from "./FarmerDashboard.module.css";

function FarmerDashboard({ setRole, setUser }) {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [showAddItem, setShowAddItem] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: "vegetables"
  });
  const navigate = useNavigate();

  const farmerInfo = {
    name: "Green Valley Farm",
    email: "farmer@gmail.com",
    phone: "+91 98765 43210",
    location: "Nashik, Maharashtra, India",
    farmSize: "15 acres",
    experience: "12 years",
    specialties: ["Organic Vegetables", "Fresh Fruits", "Dairy Products"]
  };

  useEffect(() => {
    fetch(API_ENDPOINTS.ORDERS)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  const handleAddItem = () => {
    if (!newProduct.name || !newProduct.price) {
      alert("Please fill in product name and price");
      return;
    }

    const product = {
      ...newProduct,
      _id: Date.now().toString(),
      price: parseInt(newProduct.price)
    };

    setProducts([...products, product]);
    setNewProduct({
      name: "",
      price: "",
      image: "",
      description: "",
      category: "vegetables"
    });
    setShowAddItem(false);
    alert("Product added successfully!");
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(p => p._id !== productId));
    alert("Product deleted successfully!");
  };

  const handleLogout = () => {
    setRole("");
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className={styles.farmerDashboard}>
      {/* Farmer Information Section */}
      <div className={styles.farmerInfo}>
        <h1 className={styles.title}>👩‍🌾 {farmerInfo.name}</h1>
        
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <h3>📧 Contact Information</h3>
            <p><b>Email:</b> {farmerInfo.email}</p>
            <p><b>Phone:</b> {farmerInfo.phone}</p>
            <p><b>📍 Location:</b> {farmerInfo.location}</p>
          </div>
          
          <div className={styles.infoCard}>
            <h3>🌾 Farm Details</h3>
            <p><b>Farm Size:</b> {farmerInfo.farmSize}</p>
            <p><b>Experience:</b> {farmerInfo.experience}</p>
            <p><b>Specialties:</b> {farmerInfo.specialties.join(", ")}</p>
          </div>
        </div>
        
        <div className={styles.actionButtons}>
          <button 
            onClick={() => setShowAddItem(true)}
            className={styles.addButton}
          >
            ➕ Add New Item
          </button>
          <button 
            onClick={handleLogout}
            className={styles.logoutButton}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Add Item Modal */}
      {showAddItem && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>➕ Add New Product</h2>
            <div className={styles.formGroup}>
              <label>Product Name:</label>
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                placeholder="e.g., Tomatoes"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Price (₹):</label>
              <input
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                placeholder="e.g., 50"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Image URL:</label>
              <input
                type="text"
                value={newProduct.image}
                onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                placeholder="Product image URL"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Description:</label>
              <textarea
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                placeholder="Product description"
                rows="3"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Category:</label>
              <select
                value={newProduct.category}
                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
              >
                <option value="vegetables">🥬 Vegetables</option>
                <option value="fruits">🍎 Fruits</option>
                <option value="dairy">🥛 Dairy</option>
                <option value="grains">🌾 Grains</option>
              </select>
            </div>
            <div className={styles.modalButtons}>
              <button onClick={handleAddItem} className={styles.submitButton}>
                ✅ Add Product
              </button>
              <button onClick={() => setShowAddItem(false)} className={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* My Products Section */}
      <div className={styles.productsSection}>
        <h2>🌾 My Products</h2>
        {products.length === 0 ? (
          <p className={styles.noProducts}>No products added yet. Click "Add New Item" to start!</p>
        ) : (
          <div className={styles.productsGrid}>
            {products.map((product) => (
              <div key={product._id} className={styles.productCard}>
                <img src={product.image || "https://via.placeholder.com/150x150?text=Product"} alt={product.name} />
                <h4>{product.name}</h4>
                <p className={styles.price}>₹{product.price}</p>
                <p className={styles.description}>{product.description}</p>
                <div className={styles.productActions}>
                  <button className={styles.editButton}>✏️ Edit</button>
                  <button 
                    onClick={() => handleDeleteProduct(product._id)}
                    className={styles.deleteButton}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Customer Orders Section */}
      <div className={styles.ordersSection}>
        <h2>📦 Customer Orders</h2>
        {orders.length === 0 ? (
          <p className={styles.noOrders}>No orders yet.</p>
        ) : (
          <div className={styles.ordersGrid}>
            {orders.map((order) => (
              <div key={order._id} className={styles.orderCard}>
                <h3>🧑‍🌾 {order.customerName}</h3>
                <p>
                  <b>Email:</b> {order.customerEmail} <br />
                  <b>Phone:</b> {order.phone} <br />
                  <b>Address:</b> {order.address} <br />
                  <b>📅 Delivery Date:</b> {order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  }) : 'Not specified'}
                </p>

                <h4>🛒 Items Ordered:</h4>
                <div className={styles.orderItems}>
                  {order.items.map((item, index) => (
                    <div key={index} className={styles.orderItem}>
                      <img src={item.image} alt={item.name} />
                      <p>
                        <b>{item.name}</b>
                        <br />₹{item.price}
                      </p>
                    </div>
                  ))}
                </div>

                <p className={styles.totalCost}>
                  <b>Total Cost:</b> ₹{order.totalCost}
                </p>
                <p className={styles.orderDate}>
                  <b>Order Date:</b>{" "}
                  {new Date(order.date).toLocaleString("en-IN")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FarmerDashboard;
