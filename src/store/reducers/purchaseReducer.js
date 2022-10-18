/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchPurchases, createPurchase, updatePurchase, deletePurchase,
} from '../actions/purchaseActions';

const initialState = {
  purchases: [],
  loading: false,
  error: null,
};

const purchaseSlice = createSlice({
  name: 'purchase',
  initialState,
  extraReducers: {
    [fetchPurchases.pending]: (state) => {
      state.loading = true;
    },
    [fetchPurchases.fulfilled]: (state, { payload }) => {
      state.purchases = payload;
      state.loading = false;
    },
    [fetchPurchases.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [createPurchase.pending]: (state) => {
      state.loading = true;
    },
    [createPurchase.fulfilled]: (state, { payload }) => {
      state.purchases.push(payload);
      state.loading = false;
    },
    [createPurchase.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [updatePurchase.pending]: (state) => {
      state.loading = true;
    },
    [updatePurchase.fulfilled]: (state, { payload }) => {
      const index = state.purchases.findIndex((purchase) => purchase.id === payload.id);
      state.purchases[index] = payload;
      state.loading = false;
    },
    [updatePurchase.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [deletePurchase.pending]: (state) => {
      state.loading = true;
    },
    [deletePurchase.fulfilled]: (state, { payload }) => {
      const index = state.purchases.findIndex((purchase) => purchase.id === payload.id);
      state.purchases.splice(index, 1);
      state.loading = false;
    },
    [deletePurchase.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export default purchaseSlice.reducer;
