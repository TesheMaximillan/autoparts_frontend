/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchVendors, createVendor, updateVendor, deleteVendor,
} from '../actions/vendorActions';

const initialState = {
  vendors: [],
  vendorUpdate: {
    update: false,
    vendor: {},
  },
  loading: false,
  fetching: false,
  error: null,
};

const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {
    setUpdateVendor: (state, { payload }) => {
      state.vendorUpdate.update = true;
      state.vendorUpdate.vendor = payload;
    },
    resetUpdateVendor: (state) => {
      state.vendorUpdate.update = false;
      state.vendorUpdate.vendor = {};
    },
  },
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

export const { setUpdateVendor, resetUpdateVendor } = vendorSlice.actions;
