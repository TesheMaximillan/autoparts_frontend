import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/apiRequests';
import { hideNotification, showNotification } from '../reducers/uiReducers';

const fetchTransactions = createAsyncThunk(
  'sales_transactions/fetchSales',
  async (thunkAPI) => {
    try {
      const response = await api.get('/sales_transactions', { withCredentials: true });
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(showNotification({ message: error.message, isError: true, isOpen: true }));
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const createTransactions = createAsyncThunk(
  'sales_transactions/createSale',
   
  async (sale, thunkAPI) => {
    try {
        console.log("SEND SUCCC DATE TO BACKED WITH", sale)
      const response = await api.post('/sales_transactions', sale, { withCredentials: true });
      return response.data;
    } catch (error) {
        console.log("SEND ERRRRRR with DATE TO BACKED WITH", sale)
      thunkAPI.dispatch(showNotification({ message: error.message, isError: true, isOpen: true }));
      setTimeout(() => thunkAPI.dispatch(hideNotification()), 3000);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const updateTransactions = createAsyncThunk(
  'sales_transactions/updateSale',
  async (sale, thunkAPI) => {
    try {
      const response = await api.put(`/sales_transactions/${sale.id}`, sale, { withCredentials: true });
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

const deleteTransactions = createAsyncThunk(
  'sales_transactions/deleteSale',
  async (id, thunkAPI) => {
    try {
      const response = await api.delete(`/sales_transactions/${id}`, { withCredentials: true });
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
    fetchTransactions, createTransactions, updateTransactions, deleteTransactions,
};
