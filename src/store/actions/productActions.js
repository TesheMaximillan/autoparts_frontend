import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/apiRequests';
import { hideNotification, showNotification } from '../reducers/uiReducers';

const setProduct = (data) => ({
  name: data.name,
  part_number: data.partNumber,
  brand: data.brand,
  status: data.status,
  category_id: data.category,
  stock_id: data.stock,
  cost: data.cost,
  selling: data.selling,
  quantity: data.quantity,
});

const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (thunkAPI) => {
    try {
      const response = await api.get('/products', { withCredentials: true });
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(showNotification({ message: error.message, isError: true, isOpen: true }));
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const fetchStocksProducts = createAsyncThunk(
  'product/fetchStocksProducts',
  async (thunkAPI) => {
    try {
      const response = await api.get('/stocks_products', { withCredentials: true });
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(showNotification({ message: error.message, isError: true, isOpen: true }));
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const createProduct = createAsyncThunk(
  'product/createProduct',
  async (data, thunkAPI) => {
    const product = setProduct(data);
    try {
      const response = await api.post('/products', product, { withCredentials: true });
      return response.data;
    } catch (error) {
      if (error.response.status === 422) {
        thunkAPI.dispatch(showNotification({
          message: error.response.data.errors,
          isError: true,
          isOpen: true,
        }));
      }

      if (error.response.status === 500) {
        thunkAPI.dispatch(showNotification({
          message: ['Product Already Exists'],
          isError: true,
          isOpen: true,
        }));
      }
      setTimeout(() => thunkAPI.dispatch(hideNotification()), 3000);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async (data, thunkAPI) => {
    let product = setProduct(data);
    product = { ...product, stock_id: data.stockId };
    try {
      const response = await api.put(`/products/${data.id}`, product, { withCredentials: true });
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

const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (data, thunkAPI) => {
    try {
      const { productID, stockID } = data;
      const response = await api.delete(`/products/${productID},${stockID}`, { withCredentials: true });
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
  fetchProducts, createProduct, updateProduct, deleteProduct, fetchStocksProducts,
};
