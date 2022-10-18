/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchVendors, createVendor, updateVendor, deleteVendor,
} from '../actions/vendorActions';

const initialState = {
  vendors: [],
  loading: false,
  error: null,
};

const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  extraReducers: {
    [fetchVendors.pending]: (state) => {
      state.loading = true;
    },
    [fetchVendors.fulfilled]: (state, { payload }) => {
      state.vendors = payload;
      state.loading = false;
    },
    [fetchVendors.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [createVendor.pending]: (state) => {
      state.loading = true;
    },
    [createVendor.fulfilled]: (state, { payload }) => {
      state.vendors.push(payload);
      state.loading = false;
    },
    [createVendor.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [updateVendor.pending]: (state) => {
      state.loading = true;
    },
    [updateVendor.fulfilled]: (state, { payload }) => {
      const index = state.vendors.findIndex((vendor) => vendor.id === payload.id);
      state.vendors[index] = payload;
      state.loading = false;
    },
    [updateVendor.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [deleteVendor.pending]: (state) => {
      state.loading = true;
    },
    [deleteVendor.fulfilled]: (state, { payload }) => {
      const index = state.vendors.findIndex((vendor) => vendor.id === payload.id);
      state.vendors.splice(index, 1);
      state.loading = false;
    },
    [deleteVendor.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export default vendorSlice.reducer;
