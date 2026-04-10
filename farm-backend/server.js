require('dotenv').config();
const express = require("express");
const cors = require("cors");

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// In-memory storage for demo (instead of MongoDB)
let users = [];
let orders = [];

console.log("✅ Server started with in-memory storage (demo mode)");

// Input validation middleware
const validateInput = (req, res, next) => {
  const { name, email, phone, password } = req.body;
  
  if (name && (typeof name !== 'string' || name.trim().length < 2)) {
    return res.status(400).json({ message: "Name must be at least 2 characters long" });
  }
  
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }
  
  if (phone && !/^\d{10}$/.test(phone.replace(/\s/g, ''))) {
    return res.status(400).json({ message: "Phone number must be 10 digits" });
  }
  
  if (password && password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long" });
  }
  
  next();
};

// ✅ User Schema
const userSchema = {
  name: { 
    type: String, 
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  email: { 
    type: String, 
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  phone: { 
    type: String, 
    required: true,
    trim: true
  },
  password: { 
    type: String, 
    required: true,
    minlength: 6
  },
};

// ✅ Order Schema
const orderSchema = {
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
};

// ✅ Register Customer
app.post("/api/register", validateInput, (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = users.find(u => u.email === email.toLowerCase().trim());
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Save new customer with sanitized data
    const newUser = {
      _id: Date.now().toString(),
      name: name.trim(), 
      email: email.toLowerCase().trim(), 
      phone: phone.replace(/\s/g, ''), 
      password,
      role: "customer"
    };
    
    users.push(newUser);

    res.status(201).json({
      message: "Customer registration successful!",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
});

// ✅ Register Farmer
app.post("/api/farmer-register", (req, res) => {
  try {
    const { 
      farmName, 
      ownerName, 
      email, 
      phone, 
      password, 
      location, 
      farmSize, 
      experience, 
      specialties, 
      description 
    } = req.body;

    if (!farmName || !ownerName || !email || !phone || !password || !location || !specialties || specialties.length === 0) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    // Check if farmer already exists
    const existingFarmer = users.find(u => u.email === email.toLowerCase().trim());
    if (existingFarmer) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Save new farmer with sanitized data
    const newFarmer = {
      _id: Date.now().toString(),
      farmName: farmName.trim(),
      name: ownerName.trim(),
      email: email.toLowerCase().trim(), 
      phone: phone.replace(/\s/g, ''), 
      password,
      location: location.trim(),
      farmSize: farmSize || "Not specified",
      experience: experience || "Not specified",
      specialties: specialties,
      description: description || "",
      role: "farmer",
      date: new Date()
    };
    
    users.push(newFarmer);

    res.status(201).json({
      message: "Farmer registration successful!",
      user: {
        _id: newFarmer._id,
        farmName: newFarmer.farmName,
        name: newFarmer.name,
        email: newFarmer.email,
        phone: newFarmer.phone,
        location: newFarmer.location,
        farmSize: newFarmer.farmSize,
        experience: newFarmer.experience,
        specialties: newFarmer.specialties,
        description: newFarmer.description,
        role: newFarmer.role,
      },
    });
  } catch (err) {
    console.error("Farmer registration error:", err);
    res.status(500).json({ message: "Farmer registration failed", error: err.message });
  }
});

//  Login (Customer + Farmer)
app.post("/api/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Find user by email and password
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid email or password" });
    }

    // Check if role matches (if role is specified)
    if (role && user.role !== role) {
      return res
        .status(400)
        .json({ message: `This account is not registered as a ${role}` });
    }

    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
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
      deliveryDate,
    } = req.body;

    if (!customerEmail || !items || items.length === 0) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    const order = {
      _id: Date.now().toString(),
      customerId,
      customerName,
      customerEmail,
      phone,
      address,
      items,
      totalCost,
      deliveryDate,
      date: new Date()
    };

    orders.push(order);
    res.json({ message: " Order placed successfully!", order });
  } catch (err) {
    console.error("Order error:", err);
    res
      .status(500)
      .json({ message: " Failed to place order", error: err.message });
  }
});

//  View All Orders (Farmer)
app.get("/api/orders", (req, res) => {
  try {
    res.json(orders.sort((a, b) => new Date(b.date) - new Date(a.date)));
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch orders", error: err.message });
  }
});

//  View Orders by Customer ID (Customer)
app.get("/api/orders/customer/:customerId", (req, res) => {
  try {
    const { customerId } = req.params;
    const customerOrders = orders.filter(o => o.customerId === customerId);

    if (customerOrders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.json(customerOrders);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch customer orders", error: err.message });
  }
});

//  Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
});
