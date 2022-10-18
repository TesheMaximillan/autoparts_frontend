/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchTransfers, createTransfer, updateTransfer, deleteTransfer,
} from '../actions/transferActions';

const initialState = {
  transfers: [],
  loading: false,
  error: null,
};

const transferSlice = createSlice({
  name: 'transfer',
  initialState,
  extraReducers: {
    [fetchTransfers.pending]: (state) => {
      state.loading = true;
    },
    [fetchTransfers.fulfilled]: (state, { payload }) => {
      state.transfers = payload;
      state.loading = false;
    },
    [fetchTransfers.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [createTransfer.pending]: (state) => {
      state.loading = true;
    },
    [createTransfer.fulfilled]: (state, { payload }) => {
      state.transfers.push(payload);
      state.loading = false;
    },
    [createTransfer.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [updateTransfer.pending]: (state) => {
      state.loading = true;
    },
    [updateTransfer.fulfilled]: (state, { payload }) => {
      const index = state.transfers.findIndex((transfer) => transfer.id === payload.id);
      state.transfers[index] = payload;
      state.loading = false;
    },
    [updateTransfer.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [deleteTransfer.pending]: (state) => {
      state.loading = true;
    },
    [deleteTransfer.fulfilled]: (state, { payload }) => {
      const index = state.transfers.findIndex((transfer) => transfer.id === payload.id);
      state.transfers.splice(index, 1);
      state.loading = false;
    },
    [deleteTransfer.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export default transferSlice.reducer;
