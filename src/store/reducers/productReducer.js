/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchProducts, createProduct, updateProduct, deleteProduct, fetchStocksProducts,
} from '../actions/productActions';

const initialState = {
  stocksProducts: [],
  products: [],
  productUpdate: {
    update: false,
    product: {},
  },
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setUpdateProduct: (state, { payload }) => {
      state.productUpdate.update = true;
      state.productUpdate.product = payload;
    },
    resetUpdateProduct: (state) => {
      state.productUpdate.update = false;
      state.productUpdate.product = {};
    },
  },
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.loading = true;
    },
    [fetchProducts.fulfilled]: (state, { payload }) => {
      state.products = payload;
      state.loading = false;
    },
    [fetchProducts.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [fetchStocksProducts.pending]: (state) => {
      state.loading = true;
    },
    [fetchStocksProducts.fulfilled]: (state, { payload }) => {
      state.stocksProducts = payload;
      state.loading = false;
    },
    [fetchStocksProducts.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [createProduct.pending]: (state) => {
      state.loading = true;
    },
    [createProduct.fulfilled]: (state, { payload }) => {
      state.products.push(payload);
      state.loading = false;
    },
    [createProduct.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [updateProduct.pending]: (state) => {
      state.loading = true;
    },
    [updateProduct.fulfilled]: (state, { payload }) => {
      const index = state.products.findIndex((product) => product.id === payload.id);
      state.products[index] = payload;
      state.loading = false;
    },
    [updateProduct.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [deleteProduct.pending]: (state) => {
      state.loading = true;
    },
    [deleteProduct.fulfilled]: (state, { payload }) => {
      const index = state.products.findIndex((product) => product.id === payload.id);
      state.products.splice(index, 1);
      state.loading = false;
    },
    [deleteProduct.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export default productSlice.reducer;

export const { setUpdateProduct, resetUpdateProduct } = productSlice.actions;
