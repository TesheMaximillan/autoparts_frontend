import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/apiRequests';
import { hideNotification, showNotification } from '../reducers/uiReducers';

const registerUser = createAsyncThunk(
  'user/register',
  async (user, thunkAPI) => {
    try {
      const response = await api.post('/registrations', user, { withCredentials: true });
      thunkAPI.dispatch(showNotification({ message: 'User registered successfully', isError: false, isOpen: true }));
      setTimeout(() => thunkAPI.dispatch(hideNotification()), 3000);
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(showNotification({ message: error.message, isError: true, isOpen: true }));
      setTimeout(() => thunkAPI.dispatch(hideNotification()), 3000);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const loginUser = createAsyncThunk(
  'user/login',
  async (user, thunkAPI) => {
    try {
      const response = await api.post('/sessions', user, { withCredentials: true });
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(showNotification({ message: { Invalid: ['Username or Password'] }, isError: true, isOpen: true }));
      } else {
        thunkAPI.dispatch(showNotification({ message: { Server: ['is not available'] }, isError: true, isOpen: true }));
      }
      setTimeout(() => thunkAPI.dispatch(hideNotification()), 3000);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const logoutUser = createAsyncThunk(
  'user/logout',
  async () => { await api.delete('/logout', { withCredentials: true }); },
);

const checkLoginStatus = createAsyncThunk(
  'user/checkLoginStatus',
  async () => {
    try {
      const response = await api.get('/logged_in', { withCredentials: true });
      return response.data;
    } catch (error) {
      return { logged_in: false, user: null };
    }
  },
);

export {
  registerUser, loginUser, logoutUser, checkLoginStatus,
};
