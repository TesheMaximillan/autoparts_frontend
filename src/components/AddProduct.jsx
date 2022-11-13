/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { IoAddCircle } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../store/actions/productActions';
import styles from './AddProduct.module.scss';

const AddProduct = () => {
  const categories = useSelector((state) => state.category.categories);
  const stocks = useSelector((state) => state.stock.stocks);
  const dispatch = useDispatch();
  const { container, form, formGroup } = styles;
  const initialState = {
    name: '',
    partNumber: '',
    category: '',
    stock: '',
    cost: '',
    selling: '',
    quantity: '',
  };

  const [product, setProduct] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'quantity') {
      setProduct({ ...product, [name]: parseInt(value, 10) });
    } else if (name === 'cost' || name === 'selling') {
      setProduct({ ...product, [name]: parseFloat(value) });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const {
    name, partNumber, category, stock, cost, selling, quantity,
  } = product;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(product));
    setProduct(initialState);
  };

  const categoryOptions = categories.length ? (
    categories.map((category) => (
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    ))
  ) : (
    <option value="" />
  );

  const stockOptions = stocks.length ? (stocks.map((stock) => (
    <option key={stock.id} value={stock.id}>
      {stock.name}
    </option>
  ))) : (
    <option value="" />
  );

  return (
    <div className={container}>
      <form onSubmit={handleSubmit}>
        <div className={form}>
          <div className={formGroup}>
            <label htmlFor="name">
              Product Name
              {' '}
              <input type="text" id="name" placeholder="Enter product name" name="name" value={name} onChange={handleChange} required />
            </label>

          </div>
          <div className={formGroup}>
            <label htmlFor="partNumber">
              Part Number
              {' '}
              <input type="text" id="partNumber" placeholder="Enter part number" name="partNumber" value={partNumber} onChange={handleChange} required />
            </label>

          </div>
          <div className={formGroup}>
            <label htmlFor="category">
              Category
              {' '}
              <select id="category" name="category" value={category} onChange={handleChange} required>
                {categoryOptions}
              </select>

            </label>

          </div>
          <div className={formGroup}>
            <label htmlFor="cost">
              Cost
              {' '}
              <input type="number" id="cost" placeholder="Enter cost price" name="cost" value={cost} onChange={handleChange} required />
            </label>

          </div>
          <div className={formGroup}>
            <label htmlFor="selling">
              Selling Price
              {' '}
              <input type="number" id="selling" placeholder="Enter selling price" name="selling" value={selling} onChange={handleChange} required />
            </label>

          </div>
          <div className={formGroup}>
            <label htmlFor="quantity">
              Quantity
              {' '}
              <input type="number" id="quantity" placeholder="Enter quantity" name="quantity" value={quantity} onChange={handleChange} required />
            </label>

          </div>
          <div className={formGroup}>
            <label htmlFor="stock">
              Stock
              {' '}
              <select id="stock" name="stock" value={stock} onChange={handleChange} required>
                {stockOptions}
              </select>

            </label>

          </div>
        </div>
        <button type="submit">
          {' '}
          <IoAddCircle />
          {' '}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
