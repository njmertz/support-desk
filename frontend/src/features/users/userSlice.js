import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import userService from './userService';

const initialState = {
  users: [],
  user: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

// Get users
export const getUsers = createAsyncThunk('users/getAll',async (_, thunkAPI) => {
  try{
    const token = thunkAPI.getState().auth.user.token;
    const isAdmin = thunkAPI.getState().auth.user.isAdmin;
    return await userService.getUsers(token, isAdmin);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

// Get user
export const getUser = createAsyncThunk('users/getUser',async (userId, thunkAPI) => {
  try{
    const token = thunkAPI.getState().auth.user.token;
    const isAdmin = thunkAPI.getState().auth.user.isAdmin;
    return await userService.getUser(token, isAdmin, userId);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

// Update user
export const updateUser = createAsyncThunk('users/updateUser', async(formData, thunkAPI) => {
  try{
    const authUser = thunkAPI.getState().auth.user;
    // const token = thunkAPI.getState().auth.user.token;
    // const isAdmin = thunkAPI.getState().auth.user.isAdmin;
    // return await userService.updateUser(token, isAdmin, formData);
    return await userService.updateUser(authUser, formData);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const userSlice = createSlice({
  name:'users',
  initialState,
  reducers:{
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
    .addCase(getUsers.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    })
    .addCase(getUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.users = action.payload;
    })
    .addCase(getUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload
    })
    .addCase(getUser.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    })
    .addCase(getUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    })
    .addCase(getUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload
    })
    .addCase(updateUser.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    })
    .addCase(updateUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    });
  }
});

export const {reset} = userSlice.actions;
export default userSlice.reducer;