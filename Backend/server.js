const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Ensure this model is correct

const app = express();
const PORT = 3000;
const JWT_SECRET = 'your_secret_key'; // Move to .env in production

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/myRes', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () => console.log('✅ MongoDB connected'));

// In-memory food and order store (mock, replace with DB later)
let foodItems = [];
let orders = [];

// Auth Middleware
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Missing token' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

// ✅ Register
app.post('/api/register', async (req, res) => {
  const { fullName, email, phone, address, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, email, phone, address, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
});

// ✅ Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '2h' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        fullName: user.fullName,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
});


// ✅ Add Food Item (Admin Protected)
app.post('/api/admin/add-food', authenticate, (req, res) => {
  const food = req.body;
  food.id = Date.now(); // mock ID
  foodItems.push(food);
  res.status(201).json({ message: 'Food item added', food });
});

// ✅ Get All Food Items
app.get('/api/admin/foods', authenticate, (req, res) => {
  res.json(foodItems);
});

// ✅ Create Dummy Order (simulate placing order)
app.post('/api/admin/create-order', (req, res) => {
  const { customer, item } = req.body;
  const order = {
    id: Date.now(),
    customer,
    item,
    status: 'New'
  };
  orders.push(order);
  res.status(201).json({ message: 'Order created', order });
});

// ✅ Get Orders (Admin Protected)
app.get('/api/admin/orders', authenticate, (req, res) => {
  res.json(orders);
});

// ✅ Update Order Status
app.put('/api/admin/orders/:id', authenticate, (req, res) => {
  const orderId = parseInt(req.params.id);
  const { status } = req.body;
  const order = orders.find(o => o.id === orderId);
  if (!order) return res.status(404).json({ message: 'Order not found' });

  order.status = status;
  res.json({ message: 'Order updated', order });
});

// ✅ Server Start
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
