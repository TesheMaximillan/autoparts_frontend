import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/apiRequests';
import { hideNotification, showNotification } from '../reducers/uiReducers';

const fetchVendors = createAsyncThunk(
  'vendor/fetchVendors',
  async (thunkAPI) => {
    try {
      const response = await api.get('/vendors', { withCredentials: true });
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(showNotification({ message: error.message, isError: true, isOpen: true }));
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const createVendor = createAsyncThunk(
  'vendor/createVendor',
  async (vendor, thunkAPI) => {
    try {
      const response = await api.post('/vendors', vendor, { withCredentials: true });
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(showNotification({ message: error.message, isError: true, isOpen: true }));
      setTimeout(() => thunkAPI.dispatch(hideNotification()), 3000);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const updateVendor = createAsyncThunk(
  'vendor/updateVendor',
  async (vendor, thunkAPI) => {
    try {
      const response = await api.put(`/vendors/${vendor.id}`, vendor, { withCredentials: true });
      thunkAPI.dispatch(showNotification(
        { message: response.data.message, isError: false, isOpen: true },
      ));
      setTimeout(() => thunkAPI.dispatch(hideNotification()), 3000);
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(showNotification({ message: error.message, isError: true, isOpen: true }));
      setTimeout(() => thunkAPI.dispatch(hideNotification()), 3000);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const deleteVendor = createAsyncThunk(
  'vendor/deleteVendor',
  async (id, thunkAPI) => {
    try {
      const response = await api.delete(`/vendors/${id}`, { withCredentials: true });
      thunkAPI.dispatch(showNotification(
        { message: response.data.message, isError: false, isOpen: true },
      ));
      setTimeout(() => thunkAPI.dispatch(hideNotification()), 3000);
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(showNotification({ message: error.message, isError: true, isOpen: true }));
      setTimeout(() => thunkAPI.dispatch(hideNotification()), 3000);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export {
  fetchVendors, createVendor, updateVendor, deleteVendor,
};
