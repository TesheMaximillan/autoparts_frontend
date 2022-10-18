/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCategories, createCategory, updateCategory, deleteCategory,
} from '../actions/categoryActions';

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  extraReducers: {
    [fetchCategories.pending]: (state) => {
      state.loading = true;
    },
    [fetchCategories.fulfilled]: (state, { payload }) => {
      state.categories = payload;
      state.loading = false;
    },
    [fetchCategories.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [createCategory.pending]: (state) => {
      state.loading = true;
    },
    [createCategory.fulfilled]: (state, { payload }) => {
      state.categories.push(payload);
      state.loading = false;
    },
    [createCategory.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [updateCategory.pending]: (state) => {
      state.loading = true;
    },
    [updateCategory.fulfilled]: (state, { payload }) => {
      const index = state.categories.findIndex((category) => category.id === payload.id);
      state.categories[index] = payload;
      state.loading = false;
    },
    [updateCategory.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [deleteCategory.pending]: (state) => {
      state.loading = true;
    },
    [deleteCategory.fulfilled]: (state, { payload }) => {
      const index = state.categories.findIndex((category) => category.id === payload.id);
      state.categories.splice(index, 1);
      state.loading = false;
    },
    [deleteCategory.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

const { reducer } = categorySlice;

export default reducer;
