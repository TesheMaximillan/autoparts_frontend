/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCustomers, createCustomer, updateCustomer, deleteCustomer,
} from '../actions/customerActions';

const initialState = {
  customers: [],
  customerUpdate: {
    update: false,
    customer: {},
  },
  loading: false,
  fetching: false,
  error: null,
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setUpdateCustomer: (state, { payload }) => {
      state.customerUpdate.update = true;
      state.customerUpdate.customer = payload;
    },
    resetUpdateCustomer: (state) => {
      state.customerUpdate.update = false;
      state.customerUpdate.customer = {};
    },
  },
  extraReducers: {
    [fetchCustomers.pending]: (state) => {
      state.loading = true;
    },
    [fetchCustomers.fulfilled]: (state, { payload }) => {
      state.customers = payload;
      state.loading = false;
    },
    [fetchCustomers.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [createCustomer.pending]: (state) => {
      state.loading = true;
    },
    [createCustomer.fulfilled]: (state, { payload }) => {
      state.customers.push(payload);
      state.loading = false;
    },
    [createCustomer.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [updateCustomer.pending]: (state) => {
      state.loading = true;
    },
    [updateCustomer.fulfilled]: (state, { payload }) => {
      const index = state.customers.findIndex((customer) => customer.id === payload.id);
      state.customers[index] = payload;
      state.loading = false;
    },
    [updateCustomer.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [deleteCustomer.pending]: (state) => {
      state.loading = true;
    },
    [deleteCustomer.fulfilled]: (state, { payload }) => {
      const index = state.customers.findIndex((customer) => customer.id === payload.id);
      state.customers.splice(index, 1);
      state.loading = false;
    },
    [deleteCustomer.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export default customerSlice.reducer;

export const { setUpdateCustomer, resetUpdateCustomer } = customerSlice.actions;
