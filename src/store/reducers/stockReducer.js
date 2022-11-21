/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchStocks, createStock, updateStock, deleteStock,
} from '../actions/stockActions';

const initialState = {
  stocks: [],
  loading: false,
  fetching: false,
  error: null,
};

const stockSlice = createSlice({
  name: 'stock',
  initialState,
  extraReducers: {
    [fetchStocks.pending]: (state) => {
      state.loading = true;
      state.fetching = true;
    },
    [fetchStocks.fulfilled]: (state, { payload }) => {
      state.stocks = payload;
      state.loading = false;
      state.fetching = false;
    },
    [fetchStocks.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
      state.fetching = false;
    },
    [createStock.pending]: (state) => {
      state.loading = true;
    },
    [createStock.fulfilled]: (state, { payload }) => {
      state.stocks.push(payload);
      state.loading = false;
    },
    [createStock.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [updateStock.pending]: (state) => {
      state.loading = true;
    },
    [updateStock.fulfilled]: (state, { payload }) => {
      const index = state.stocks.findIndex((stock) => stock.id === payload.id);
      state.stocks[index] = payload;
      state.loading = false;
    },
    [updateStock.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [deleteStock.pending]: (state) => {
      state.loading = true;
    },
    [deleteStock.fulfilled]: (state, { payload }) => {
      const index = state.stocks.findIndex((stock) => stock.id === payload.id);
      state.stocks.splice(index, 1);
      state.loading = false;
    },
    [deleteStock.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export default stockSlice.reducer;
