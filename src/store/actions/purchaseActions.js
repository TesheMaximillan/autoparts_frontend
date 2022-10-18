import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/apiRequests';
import { hideNotification, showNotification } from '../reducers/uiReducers';

const fetchPurchases = createAsyncThunk(
  'purchase/fetchPurchases',
  async (thunkAPI) => {
    try {
      const response = await api.get('/purchases', { withCredentials: true });
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(showNotification({ message: error.message, isError: true, isOpen: true }));
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const createPurchase = createAsyncThunk(
  'purchase/createPurchase',
  async (purchase, thunkAPI) => {
    try {
      const response = await api.post('/purchases', purchase, { withCredentials: true });
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(showNotification({ message: error.message, isError: true, isOpen: true }));
      setTimeout(() => thunkAPI.dispatch(hideNotification()), 3000);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const updatePurchase = createAsyncThunk(
  'purchase/updatePurchase',
  async (purchase, thunkAPI) => {
    try {
      const response = await api.put(`/purchases/${purchase.id}`, purchase, { withCredentials: true });
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

const deletePurchase = createAsyncThunk(
  'purchase/deletePurchase',
  async (id, thunkAPI) => {
    try {
      const response = await api.delete(`/purchases/${id}`, { withCredentials: true });
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
  fetchPurchases, createPurchase, updatePurchase, deletePurchase,
};
