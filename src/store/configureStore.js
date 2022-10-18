import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import categoryReducer from './reducers/categoryReducer';
import uiReducer from './reducers/uiReducers';
import userReducer from './reducers/userReducer';
import productReducer from './reducers/productReducer';
import saleReducer from './reducers/saleReducer';
import customerReducer from './reducers/customerReducer';
import vendorReducer from './reducers/vendorReducer';
import stockReducer from './reducers/stockReducer';
import purchaseReducer from './reducers/purchaseReducer';
import transferReducer from './reducers/transferReducer';

const store = configureStore({
  reducer: {
    ui: uiReducer,
    user: userReducer,
    category: categoryReducer,
    customer: customerReducer,
    vendor: vendorReducer,
    product: productReducer,
    purchase: purchaseReducer,
    sale: saleReducer,
    stock: stockReducer,
    transfer: transferReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
