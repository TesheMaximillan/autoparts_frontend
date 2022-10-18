import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/apiRequests';
import { hideNotification, showNotification } from '../reducers/uiReducers';

const fetchSales = createAsyncThunk(
  'sale/fetchSales',
  async (thunkAPI) => {
    try {
      const response = await api.get('/sales', { withCredentials: true });
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(showNotification({ message: error.message, isError: true, isOpen: true }));
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const createSale = createAsyncThunk(
  'sale/createSale',
  async (sale, thunkAPI) => {
    try {
      const response = await api.post('/sales', sale, { withCredentials: true });
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(showNotification({ message: error.message, isError: true, isOpen: true }));
      setTimeout(() => thunkAPI.dispatch(hideNotification()), 3000);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const updateSale = createAsyncThunk(
  'sale/updateSale',
  async (sale, thunkAPI) => {
    try {
      const response = await api.put(`/sales/${sale.id}`, sale, { withCredentials: true });
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

const deleteSale = createAsyncThunk(
  'sale/deleteSale',
  async (id, thunkAPI) => {
    try {
      const response = await api.delete(`/sales/${id}`, { withCredentials: true });
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
  fetchSales, createSale, updateSale, deleteSale,
};
