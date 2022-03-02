const path = require('path');
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

// Server Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));

// Serve Frontend
if(process.env.NODE_ENV === 'production'){
  // Set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.get('*',(req, res) => res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html'));
}else{
  // Root Route
  app.get('/', (req, res) => {
    res.status(200).json({message: 'Welcome to the Support Desk API'});
  });
}

// Custom Middleware - Error Handler
app.use(errorHandler);

// Listen for requests
app.listen(PORT, () => console.log(`Server start on port ${PORT}`));