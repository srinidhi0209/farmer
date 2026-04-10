# Contributing to Farm to Home 🌾

Thank you for your interest in contributing to Farm to Home! This guide will help you get started with contributing to this e-commerce platform.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git
- Basic knowledge of React, Node.js, and MongoDB

### Setup Instructions

1. **Fork the Repository**
   ```bash
   # Fork the repository on GitHub
   # Clone your forked repository
   git clone https://github.com/your-username/farm-to-home.git
   cd farm-to-home
   ```

2. **Set Up Development Environment**
   ```bash
   # Install backend dependencies
   cd farm-backend
   npm install
   
   # Install frontend dependencies
   cd "../farmer to home"
   npm install
   ```

3. **Create Environment Variables**
   ```bash
   # In farm-backend directory
   cp .env.example .env
   # Edit .env with your configurations
   ```

4. **Start Development Servers**
   ```bash
   # Terminal 1: Backend
   cd farm-backend
   npm run dev
   
   # Terminal 2: Frontend
   cd "../farmer to home"
   npm run dev
   ```

## 📋 Development Guidelines

### Code Style

We use ESLint and Prettier for code formatting:

```bash
# Check linting
npm run lint

# Fix formatting
npx prettier --write .
```

### File Naming Conventions

- **Components**: PascalCase (e.g., `CartPage.jsx`)
- **CSS Modules**: ComponentName.module.css (e.g., `CartPage.module.css`)
- **Utilities**: camelCase (e.g., `validation.js`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS`)

### Component Structure

```jsx
import React, { useState, useEffect } from "react";
import styles from "./ComponentName.module.css";

function ComponentName({ prop1, prop2 }) {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // Side effects
  }, [dependencies]);

  const handleClick = () => {
    // Event handlers
  };

  return (
    <div className={styles.container}>
      {/* JSX content */}
    </div>
  );
}

export default ComponentName;
```

### CSS Modules Structure

```css
.container {
  /* Container styles */
}

.title {
  /* Title styles */
}

.button {
  /* Button styles */
}

.button:hover {
  /* Hover states */
}
```

## 🔄 Git Workflow

### Branch Naming

- `feature/feature-name` - New features
- `bugfix/bug-description` - Bug fixes
- `hotfix/urgent-fix` - Critical fixes
- `docs/documentation-update` - Documentation updates

### Commit Messages

Follow the conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

Examples:
- `feat(cart): add quantity selector`
- `fix(auth): resolve login validation issue`
- `docs(readme): update installation instructions`
- `style(components): improve button hover effects`

### Pull Request Process

1. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Write clean, readable code
   - Add comments where necessary
   - Follow the existing code style
   - Test your changes thoroughly

3. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat(component): add your feature"
   git push origin feature/your-feature-name
   ```

4. **Create a Pull Request**
   - Provide a clear title and description
   - Include screenshots if applicable
   - Link any related issues
   - Request a review from maintainers

## 🧪 Testing

### Manual Testing Checklist

- [ ] All forms validate correctly
- [ ] Error messages display properly
- [ ] Loading states work as expected
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Navigation flows work correctly
- [ ] API calls handle errors gracefully

### Testing Scenarios

1. **User Authentication**
   - Registration with valid/invalid data
   - Login with correct/incorrect credentials
   - Session persistence

2. **Shopping Cart**
   - Adding/removing items
   - Price calculations
   - Empty cart state

3. **Order Processing**
   - Form validation
   - Order submission
   - Error handling

## 📝 Documentation

When adding new features:

1. **Update README.md** if needed
2. **Add inline comments** for complex logic
3. **Document new API endpoints** in the backend
4. **Update component props** with JSDoc comments

Example JSDoc:

```jsx
/**
 * CartPage component for managing shopping cart
 * @param {Object} props - Component props
 * @param {Array} props.cart - Array of cart items
 * @param {Function} props.setCart - Function to update cart
 * @returns {JSX.Element} CartPage component
 */
function CartPage({ cart, setCart }) {
  // Component logic
}
```

## 🐛 Bug Reports

When reporting bugs:

1. **Use the bug report template**
2. **Provide detailed steps to reproduce**
3. **Include browser and OS information**
4. **Add screenshots or screen recordings**
5. **Mention expected vs actual behavior**

## 💡 Feature Requests

When requesting features:

1. **Check existing issues first**
2. **Provide a clear use case**
3. **Suggest implementation approach if possible**
4. **Consider impact on existing functionality**

## 🎯 Areas for Contribution

### High Priority
- [ ] Add unit tests
- [ ] Improve mobile responsiveness
- [ ] Add loading skeletons
- [ ] Implement search functionality

### Medium Priority
- [ ] Add product categories
- [ ] Implement user profiles
- [ ] Add order tracking
- [ ] Improve error boundaries

### Low Priority
- [ ] Add dark mode
- [ ] Implement notifications
- [ ] Add social sharing
- [ ] Create admin dashboard

## 📞 Getting Help

- **Create an issue** for bugs or questions
- **Join our discussions** for general help
- **Check existing documentation** before asking

## 🏆 Recognition

Contributors will be:
- Listed in the README.md
- Mentioned in release notes
- Invited to become maintainers for significant contributions

Thank you for contributing to Farm to Home! 🌱
