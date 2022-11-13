import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import RequireAuth from './components/RequireAuth';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Product from './pages/Product';
import Register from './pages/Register';
import { fetchCategories } from './store/actions/categoryActions';
import { fetchCustomers } from './store/actions/customerActions';
import { fetchProducts } from './store/actions/productActions';
import { fetchPurchases } from './store/actions/purchaseActions';
import { fetchSales } from './store/actions/saleActions';
import { fetchStocks } from './store/actions/stockActions';
import { fetchTransfers } from './store/actions/transferActions';
import { fetchVendors } from './store/actions/vendorActions';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, []);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    dispatch(fetchPurchases());
  }, []);

  useEffect(() => {
    dispatch(fetchSales());
  }, []);

  useEffect(() => {
    dispatch(fetchStocks());
  }, []);

  useEffect(() => {
    dispatch(fetchTransfers());
  }, []);

  useEffect(() => {
    dispatch(fetchVendors());
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/products" element={<Product />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
