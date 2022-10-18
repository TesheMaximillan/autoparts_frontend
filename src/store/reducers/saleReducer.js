/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchSales, createSale, updateSale, deleteSale,
} from '../actions/saleActions';

const initialState = {
  sales: [],
  loading: false,
  error: null,
};

const saleSlice = createSlice({
  name: 'sale',
  initialState,
  extraReducers: {
    [fetchSales.pending]: (state) => {
      state.loading = true;
    },
    [fetchSales.fulfilled]: (state, { payload }) => {
      state.sales = payload;
      state.loading = false;
    },
    [fetchSales.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [createSale.pending]: (state) => {
      state.loading = true;
    },
    [createSale.fulfilled]: (state, { payload }) => {
      state.sales.push(payload);
      state.loading = false;
    },
    [createSale.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [updateSale.pending]: (state) => {
      state.loading = true;
    },
    [updateSale.fulfilled]: (state, { payload }) => {
      const index = state.sales.findIndex((sale) => sale.id === payload.id);
      state.sales[index] = payload;
      state.loading = false;
    },
    [updateSale.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [deleteSale.pending]: (state) => {
      state.loading = true;
    },
    [deleteSale.fulfilled]: (state, { payload }) => {
      const index = state.sales.findIndex((sale) => sale.id === payload.id);
      state.sales.splice(index, 1);
      state.loading = false;
    },
    [deleteSale.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export default saleSlice.reducer;
