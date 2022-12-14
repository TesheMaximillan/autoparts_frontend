/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCategories, createCategory, updateCategory, deleteCategory,
} from '../actions/categoryActions';

const initialState = {
  categories: [],
  categoryUpdate: {
    update: false,
    category: {},
  },
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setUpdateCategory: (state, { payload }) => {
      state.categoryUpdate.update = true;
      state.categoryUpdate.category = payload;
    },
    resetUpdateCategory: (state) => {
      state.categoryUpdate.update = false;
      state.categoryUpdate.category = {};
    },
  },
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
      state.fetching = false;
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

export default categorySlice.reducer;

export const { setUpdateCategory, resetUpdateCategory } = categorySlice.actions;
