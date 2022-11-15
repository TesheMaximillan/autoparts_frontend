/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { IoAddCircle } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../store/actions/productActions';
import styles from './AddProduct.module.scss';
import ListProduct from './ListProduct';
import Notification from '../Notification';

const AddProduct = () => {
  const categories = useSelector((state) => state.category.categories);
  const isOpen = useSelector((state) => state.ui.notification.isOpen);
  const stocks = useSelector((state) => state.stock.stocks);
  const [errors, setErrors] = useState(false);
  const dispatch = useDispatch();
  const { container, form, formGroup } = styles;
  const initialState = {
    name: '',
    partNumber: '',
    brand: 'Toyota',
    type: 'Original',
    category: categories[0].id,
    stock: stocks[0].id,
    cost: '',
    selling: '',
    quantity: '',
  };

  const [product, setProduct] = useState(initialState);
  const [products, setProducts] = useState([]);

  const {
    name, partNumber, brand, type, category, stock, cost, selling, quantity,
  } = product;

  useEffect(() => {
    if (isOpen) {
      setErrors(!errors);
    }
  }, [isOpen]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(product));

    if (cost > 0 && selling >= cost && quantity > 0) {
      setProducts([...products, product]);
      setProduct(initialState);
    }
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
    <>
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
              <label htmlFor="brand">
                Brand
                {' '}
                <input type="text" id="brand" placeholder="Enter brand" name="brand" value={brand} onChange={handleChange} required />
              </label>

            </div>
            <div className={formGroup}>
              <label htmlFor="type">
                Type
                {' '}
                <input type="text" id="type" placeholder="Enter part number" name="type" value={type} onChange={handleChange} required />
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
              <label htmlFor="stock">
                Stock
                {' '}
                <select id="stock" name="stock" value={stock} onChange={handleChange} required>
                  {stockOptions}
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
          </div>
          <button type="submit">
            {' '}
            <IoAddCircle />
            {' '}
          </button>
        </form>
      </div>
      {isOpen && <Notification />}
      {products.length > 0 && <ListProduct products={products} />}
    </>
  );
};

export default AddProduct;
