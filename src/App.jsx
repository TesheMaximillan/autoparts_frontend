import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import Alert from './components/common/Alert';
import RequireAuth from './components/common/RequireAuth';
import Category from './pages/Category';
import Customer from './pages/Customer';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Product from './pages/Product';
import Register from './pages/Register';
import Stock from './pages/Stock';
import Vendor from './pages/Vendor';
import { fetchCategories } from './store/actions/categoryActions';
import { fetchCustomers } from './store/actions/customerActions';
import { fetchProducts, fetchStocksProducts } from './store/actions/productActions';
import { fetchPurchases } from './store/actions/purchaseActions';
import { fetchSales } from './store/actions/saleActions';
import { fetchStocks } from './store/actions/stockActions';
import { fetchTransfers } from './store/actions/transferActions';
import { fetchVendors } from './store/actions/vendorActions';

const App = () => {
  const dispatch = useDispatch();
  const isAlert = useSelector((state) => state.ui.alert.isAlert);

  useEffect(() => {
    dispatch(fetchStocksProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPurchases());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchSales());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchStocks());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTransfers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchVendors());
  }, [dispatch]);

  return (
    <>
      {isAlert && <Alert />}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Product />} />
            <Route path="/categories" element={<Category />} />
            <Route path="/stocks" element={<Stock />} />
            <Route path="/customers" element={<Customer />} />
            <Route path="/vendors" element={<Vendor />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
