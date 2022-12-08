import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/apiRequests';
import { hideNotification, showNotification } from '../reducers/uiReducers';

const fetchTransfers = createAsyncThunk(
  'transfer/fetchTransfers',
  async (thunkAPI) => {
    try {
      const response = await api.get('/transfers', { withCredentials: true });
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(showNotification({ message: error.message, isError: true, isOpen: true }));
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const createTransfer = createAsyncThunk(
  'transfer/createTransfer',
  async (data, thunkAPI) => {
    try {
      const transfer = {
        from: data.from,
        to: data.to,
        product_id: data.productID,
        quantity: data.quantity,
        date: data.date,
      };
      const response = await api.post('/transfers', transfer, { withCredentials: true });
      return response.data;
    } catch (error) {
      if (error.response.status === 422) {
        thunkAPI.dispatch(showNotification({
          message: error.response.data.errors,
          isError: true,
          isOpen: false,
        }));
      }
      setTimeout(() => thunkAPI.dispatch(hideNotification()), 3000);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const updateTransfer = createAsyncThunk(
  'transfer/updateTransfer',
  async (transfer, thunkAPI) => {
    try {
      const response = await api.put(`/transfers/${transfer.id}`, transfer, { withCredentials: true });
      thunkAPI.dispatch(showNotification(
        { message: response.data.message, isError: false, isOpen: true },
      ));
      setTimeout(() => thunkAPI.dispatch(hideNotification()), 3000);
      return response.data;
    } catch (error) {
      if (error.response.status === 422) {
        thunkAPI.dispatch(showNotification({
          message: error.response.data.errors,
          isError: true,
          isOpen: true,
        }));
      }
      setTimeout(() => thunkAPI.dispatch(hideNotification()), 3000);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const deleteTransfer = createAsyncThunk(
  'transfer/deleteTransfer',
  async (id, thunkAPI) => {
    try {
      const response = await api.delete(`/transfers/${id}`, { withCredentials: true });
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
  fetchTransfers, createTransfer, updateTransfer, deleteTransfer,
};
