import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/apiRequests';
import { hideNotification, showNotification } from '../reducers/uiReducers';

const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async (thunkAPI) => {
    try {
      const response = await api.get('/categories', { withCredentials: true });
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(showNotification({ message: error.message, isError: true, isOpen: true }));
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const createCategory = createAsyncThunk(
  'category/createCategory',
  async (category, thunkAPI) => {
    try {
      const response = await api.post('/categories', category, { withCredentials: true });
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

const updateCategory = createAsyncThunk(
  'category/updateCategory',
  async (data, thunkAPI) => {
    try {
      const category = { name: data.name };
      const response = await api.put(`/categories/${data.id}`, category, { withCredentials: true });
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

const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async (id, thunkAPI) => {
    try {
      const response = await api.delete(`/categories/${id}`, { withCredentials: true });
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

export {
  fetchCategories, createCategory, updateCategory, deleteCategory,
};
