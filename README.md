# Farm to Home - E-Commerce Platform 🌾

A modern e-commerce platform connecting farmers directly with customers, built with React and Node.js.

## 🚀 Features

- **User Authentication**: Secure login/registration for customers and farmers
- **Product Catalog**: Browse fresh farm products with detailed information
- **Shopping Cart**: Add/remove items with real-time price calculation
- **Order Management**: Place orders with delivery details
- **Dashboard**: Separate dashboards for farmers and customers
- **Responsive Design**: Mobile-friendly interface with modern UI
- **Real-time Updates**: Live cart and order status updates

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **CSS Modules** - Scoped styling for better maintainability
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **CORS** - Cross-origin resource sharing

### Development Tools
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **Git** - Version control

## 📁 Project Structure

```
farm-to-home/
├── farm-backend/          # Backend API server
│   ├── models/           # MongoDB models
│   ├── server.js         # Main server file
│   ├── package.json      # Backend dependencies
│   └── .env.example      # Environment variables template
├── farmer to home/        # Frontend React app
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── constants/    # API endpoints and constants
│   │   ├── hooks/        # Custom React hooks
│   │   ├── types/        # Type definitions
│   │   ├── utils/        # Utility functions
│   │   └── App.jsx       # Main App component
│   ├── public/           # Static assets
│   └── package.json      # Frontend dependencies
└── README.md             # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB account (for production)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd farm-to-home
   ```

2. **Install backend dependencies**
   ```bash
   cd farm-backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd "../farmer to home"
   npm install
   ```

4. **Set up environment variables**
   ```bash
   # In farm-backend directory
   cp .env.example .env
   # Edit .env with your MongoDB URI and other configurations
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd farm-backend
   npm run dev  # For development with nodemon
   # or
   npm start    # For production
   ```

2. **Start the frontend application**
   ```bash
   cd "../farmer to home"
   npm run dev
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📱 Usage

### For Customers
1. Register a new account or login
2. Browse available farm products
3. Add items to your cart
4. Proceed to checkout and enter delivery details
5. Place your order and await confirmation

### For Farmers
1. Login with farmer credentials:
   - Email: `farmer@gmail.com`
   - Password: `farmer123`
2. View and manage customer orders
3. Track order status and customer information

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `farm-backend` directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/databaseName

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:5173
```

### API Endpoints

- `POST /api/register` - Register new user
- `POST /api/login` - User authentication
- `POST /api/orders` - Place new order
- `GET /api/orders` - Get all orders (farmer)
- `GET /api/orders/customer/:customerId` - Get customer orders

## 🎨 Styling

The application uses CSS Modules for component-scoped styling:
- Modern, responsive design
- Consistent color scheme
- Smooth animations and transitions
- Mobile-first approach

## 🔒 Security Features

- Input validation and sanitization
- CORS configuration
- Environment variable protection
- Error handling and logging
- Password requirements

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the application: `npm run build`
2. Deploy the `dist` folder to your hosting platform
3. Set environment variables as needed

### Backend (Heroku/Railway)
1. Set environment variables in your hosting platform
2. Deploy the backend application
3. Ensure MongoDB connection is properly configured

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

If you encounter any issues or have questions, please:
1. Check the existing issues
2. Create a new issue with detailed information
3. Include screenshots if applicable

## 🔄 Updates

- **v1.0.0** - Initial release with basic e-commerce functionality
- **v1.1.0** - Added CSS modules and improved error handling
- **v1.2.0** - Enhanced security and code organization

---

Built with ❤️ for farmers and customers alike!
