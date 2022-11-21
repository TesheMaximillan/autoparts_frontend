/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './FormProduct.module.scss';
import FormGroup from '../modules/FormGroup';
import Button from '../modules/Button';

const FormProduct = (props) => {
  const categories = useSelector((state) => state.category.categories);
  const stocks = useSelector((state) => state.stock.stocks);
  const {
    product, handleChange, handleSubmit, update,
  } = props;

  const { form, formBtns } = styles;

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
        <FormGroup type="text" name="name" value={name} title="Product Name" handleChange={handleChange} />
        <FormGroup type="text" name="partNumber" value={partNumber} title="Part Number" handleChange={handleChange} />
        <FormGroup type="text" name="brand" value={brand} title="Brand" handleChange={handleChange} />
        <FormGroup type="text" name="status" value={status} title="Status" handleChange={handleChange} />
        <FormGroup type="select" name="category" value={category} title="Category" handleChange={handleChange} options={categoryOptions} />
        <FormGroup type="select" name="stock" value={stock} title="Stock" handleChange={handleChange} options={stockOptions} />
        <FormGroup type="number" name="cost" value={cost} title="Cost" handleChange={handleChange} />
        <FormGroup type="number" name="selling" value={selling} title="Selling Price" handleChange={handleChange} />
        <FormGroup type="number" name="quantity" value={quantity} title="Quantity" handleChange={handleChange} />
      </div>
      <div className={formBtns}>
        {!update && (<Button type="submit" classname="addBtn" />)}
        {update && (<Button type="submit" classname="updateBtn" />)}
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
