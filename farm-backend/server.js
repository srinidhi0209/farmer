const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors({
  origin: "*"
}));

app.use(express.json());

// ✅ MongoDB connection
mongoose
  .connect("mongodb+srv://katurisrinidhi4_db_user:srinidhi@cluster0.nogxvdh.mongodb.net/?appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ✅ User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

// ✅ Order Schema
const orderSchema = new mongoose.Schema({
  customerId: String,
  customerName: String,
  customerEmail: String,
  phone: String,
  address: String,
  items: [
    {
      name: String,
      price: Number,
      image: String,
    },
  ],
  totalCost: Number,
  date: { type: Date, default: Date.now },
});
const Order = mongoose.model("Order", orderSchema);

// ✅ Register User
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Save new user
    const newUser = new User({ name, email, phone, password });
    await newUser.save();

    res.status(201).json({
      message: " Registration successful!",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
      },
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: " Registration failed", error: err.message });
  }
});

//  Login (Customer + Farmer)
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Farmer (Admin) Login
    if (email === "farmer@gmail.com" && password === "farmer123") {
      return res.json({
        role: "farmer",
        name: "Farmer Admin",
        email: "farmer@gmail.com",
        phone: "N/A",
        _id: "admin-fixed-id",
      });
    }

    // Customer Login
    const user = await User.findOne({ email, password }).select("-password");
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    res.json({
      role: "customer",
      ...user.toObject(),
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

// Place Order (Customer)
app.post("/api/orders", async (req, res) => {
  try {
    const {
      customerId,
      customerName,
      customerEmail,
      phone,
      address,
      items,
      totalCost,
    } = req.body;

    if (!customerEmail || !items || items.length === 0) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    const order = new Order({
      customerId,
      customerName,
      customerEmail,
      phone,
      address,
      items,
      totalCost,
    });

    await order.save();
    res.json({ message: " Order placed successfully!", order });
  } catch (err) {
    console.error("Order error:", err);
    res
      .status(500)
      .json({ message: " Failed to place order", error: err.message });
  }
});

//  View All Orders (Farmer)
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1 });
    res.json(orders);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch orders", error: err.message });
  }
});

//  View Orders by Customer ID (Customer)
app.get("/api/orders/customer/:customerId", async (req, res) => {
  try {
    const { customerId } = req.params;
    const orders = await Order.find({ customerId }).sort({ date: -1 });

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.json(orders);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch customer orders", error: err.message });
  }
});

//  Server Start
const PORT = 5000;
app.listen(PORT, () =>
  console.log(` Backend running on http://localhost:${PORT}`)
);
