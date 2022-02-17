const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Express initialization
const app = express();

// Express Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Root Route
app.get('/', (req, res) => {
  res.status(200).json({message: 'Welcome to the Support Desk API'});
});

// Server Routes
app.use('/api/users', require('./routes/userRoutes'));

// Custom Middleware - Error Handler
app.use(errorHandler);

// Listen for requests
app.listen(PORT, () => console.log(`Server start on port ${PORT}`));