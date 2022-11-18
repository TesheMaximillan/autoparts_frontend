/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useSelector } from 'react-redux';
import { IoAddCircle } from 'react-icons/io5';
import { ImPencil2 } from 'react-icons/im';
import PropTypes from 'prop-types';

import styles from './FormProduct.module.scss';

const FormProduct = (props) => {
  const categories = useSelector((state) => state.category.categories);
  const stocks = useSelector((state) => state.stock.stocks);
  const {
    product, handleChange, handleSubmit, update,
  } = props;

  const {
    form, formGroup, formBtns, addBtn, updateBtn,
  } = styles;

  const {
    name, partNumber, brand, status, category, stock, cost, selling, quantity,
  } = product;

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
          <label htmlFor="status">
            Type
            {' '}
            <input type="text" id="status" placeholder="Enter Type" name="status" value={status} onChange={handleChange} required />
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
            <select id="stock" name="stock" value={stock} onChange={handleChange} required disabled={update}>
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
      <div className={formBtns}>
        {!update && <button type="submit" className={addBtn}><IoAddCircle /></button>}
        {update && <button type="submit" className={updateBtn}><ImPencil2 /></button>}
      </div>
    </form>
  );
};

FormProduct.propTypes = {
  product: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  update: PropTypes.bool.isRequired,
};

export default FormProduct;
