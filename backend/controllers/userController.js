const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const { json } = require('express/lib/response');

// @desc   Register a new user
// @route  /api/users
// @access Public 
const registerUser = asyncHandler(async (req, res) => {
  const {name, email, password} = req.body;

  // Validation 
  if(!name || !email || !password){
    res.status(400);
    throw new Error('Please include all fields.');
  }

  // Find if user already exists
  const userExists = await User.findOne({email});

  if(userExists){
    res.status(400);
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  if(user){
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  }else{
    res.status(400);
    throw new error('Invalid user data');
  }
});

// @desc   Login a user
// @route  /api/users/login
// @access Public 
const loginUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body;

  const user = await User.findOne({email});

  // Check user and passwords match
  if(user && (await bcrypt.compare(password, user.password))){
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    });
  }else{
    res.status(401);
    throw new Error('Invalid credentials');
  }
});

// @desc   Get current user
// @route  /api/users/me
// @access Private 
const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    isAdmin: req.user.isAdmin
  }
  res.status(200).json(user);
});

// @desc   Get users
// @route  /api/users/all
// @route /api/users/list
// @access Private
const getAll = asyncHandler(async (req, res) => {
  if(req.user.isAdmin === "false") {
    res.status(401);
    throw new Error ('Not authorized');
  }
  
  const users = await User.find().select('-password');
  if(users && users.length > 0){
    res.status(200).json(users);
  }else{
    res.status(400);
    throw new Error('No users found');
  }
});

// @desc   Get users
// @route /api/users/list/:userId
// @access Private
const getUser = asyncHandler(async (req, res) => {
  if(req.user.isAdmin === "false") {
    res.status(401);
    throw new Error ('Not authorized');
  }
  
  const user = await User.findById(req.params.userId).select('-password');
  if(user){
    res.status(200).json(user);
  }else{
    res.status(400);
    throw new Error('No users found');
  }
});

// @desc   Register a new user
// @route  /api/users/list/:userId
// @access Public 
const updateUser = asyncHandler(async (req, res) => {
  const {_id, name, email, isAdmin} = req.body;

  // Validation 
  if(!_id || !name || !email || (isAdmin !== true && isAdmin !== false)){
    res.status(400);
    throw new Error('Please include all fields.');
  }

  // Find if user already exists
  const userExists = await User.findOne({_id}).select('-password');

  if(!userExists){
    res.status(400);
    throw new Error('User doesn\'t exist.');
  }

  // Update user
  const user = await User.findByIdAndUpdate({_id: _id},{
    name,
    email,
    isAdmin
  },{new: true}).select('-password');

  if(user){
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt
    });
  }else{
    res.status(400);
    throw new error('Invalid user data');
  }
});

// Generate token
const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  getAll,
  getUser,
  updateUser
};