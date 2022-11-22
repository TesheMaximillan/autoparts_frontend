import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/apiRequests';
import { hideNotification, showNotification } from '../reducers/uiReducers';

const fetchStocks = createAsyncThunk(
  'stock/fetchStocks',
  async (thunkAPI) => {
    try {
      const response = await api.get('/stocks', { withCredentials: true });
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(showNotification({ message: error.message, isError: true, isOpen: true }));
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const createStock = createAsyncThunk(
  'stock/createStock',
  async (stock, thunkAPI) => {
    try {
      const response = await api.post('/stocks', stock, { withCredentials: true });
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

const updateStock = createAsyncThunk(
  'stock/updateStock',
  async (data, thunkAPI) => {
    try {
      const stock = { name: data.name };
      const response = await api.put(`/stocks/${data.id}`, stock, { withCredentials: true });
      return response.data;
    } catch (error) {
      if (error.response.status === 422) {
        thunkAPI.dispatch(showNotification({
          message: error.response.data.errors,
          isError: true,
          isOpen: true,
        }));
      } else {
        thunkAPI.dispatch(showNotification({
          message: { Bad: ['Request please contact your support'] },
          isError: true,
          isOpen: true,
        }));
      }
      setTimeout(() => thunkAPI.dispatch(hideNotification()), 3000);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const deleteStock = createAsyncThunk(
  'stock/deleteStock',
  async (id, thunkAPI) => {
    try {
      const response = await api.delete(`/stocks/${id}`, { withCredentials: true });
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

export {
  fetchStocks, createStock, updateStock, deleteStock,
};
