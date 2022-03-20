import axios from 'axios';

const API_URL = '/api/users/';

// Get users
const getUsers = async (token, isAdmin) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  if(isAdmin === "false"){
    throw new Error('Not Authorized');
  }
  const response = await axios.get(`${API_URL}list`, config);
  return response.data;
};

// Get users
const getUser = async (token, isAdmin, userId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  if(isAdmin === "false"){
    throw new Error('Not Authorized');
  }
  const response = await axios.get(`${API_URL}list/${userId}`, config);
  return response.data;
};

// Update user
const updateUser = async (authUser, formData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${authUser.token}`
    }
  };
  if(authUser.isAdmin === "false"){
    throw new Error('Not Authorized');
  }
  const {_id:userId} = formData;

  const response = await axios.put(`${API_URL}list/${userId}`, formData, config);

  return response.data;
};

const userService = {
  getUsers,
  getUser,
  updateUser
};

export default userService;