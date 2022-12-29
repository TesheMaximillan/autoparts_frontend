/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { MdDataSaverOn, MdLibraryAdd } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './FormProduct.module.scss';
import FormGroup from '../modules/FormGroup';
import { createCategory } from '../../store/actions/categoryActions';
import { createStock } from '../../store/actions/stockActions';

const FormProduct = (props) => {
  const categories = useSelector((state) => state.category.categories);
  const stocks = useSelector((state) => state.stock.stocks);
  const [show, setShow] = React.useState('');
  const [namee, setNamee] = React.useState('');
  const dispatch = useDispatch();
  const {
    product, handleChange, handleSubmit,
  } = props;

  const {
    form, formContainer, formControl, names, prices, breaker, formBtns, add,
    expandBtn, inputForm,
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

  const handleInput = (e) => {
    setNamee(e.target.value);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (namee === '') {
      setShow('');
      return;
    }
    if (show === 'category') {
      dispatch(createCategory({ name: namee }));
    }
    if (show === 'stock') {
      dispatch(createStock({ name: namee }));
    }
    setShow('');
    setNamee('');
  };

  const expandCategory = () => {
    if (show !== 'category') setShow('category');
    else setShow('');
  };

  const expandStock = () => {
    if (show !== 'stock') setShow('stock');
    else setShow('');
  };

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
        <h2>Add Product</h2>
        <div className={formControl}>
          <div className={add}>
            <FormGroup type="select" name="category" value={category} title="Category" handleChange={handleChange} options={categoryOptions} classname="dropdown" />
            <button type="button" className={expandBtn} onClick={expandCategory}><MdLibraryAdd /></button>
          </div>
          <div className={add}>
            <FormGroup type="select" name="stock" value={stock} title="Stock" handleChange={handleChange} options={stockOptions} classname="dropdown" />
            <button type="button" className={expandBtn} onClick={expandStock}><MdLibraryAdd /></button>
          </div>
        </div>
        {show && (
          <div className={inputForm}>
            <div>
              <input
                type="text"
                name="namee"
                value={namee}
                onChange={handleInput}
                placeholder="Name"
                required
              />
            </div>
            <button type="button" className="btn" onClick={handleInputSubmit}><MdDataSaverOn /></button>
          </div>
        )}
        <div className={formContainer}>
          <div className={names}>
            <FormGroup type="text" name="name" value={name} title="Product Name" handleChange={handleChange} />
            <FormGroup type="text" name="partNumber" value={partNumber} title="Part Number" handleChange={handleChange} />
            <FormGroup type="text" name="brand" value={brand} title="Brand" handleChange={handleChange} />
            <FormGroup type="text" name="status" value={status} title="Status" handleChange={handleChange} />
          </div>
          <div className={breaker} />
          <div className={prices}>
            <FormGroup type="number" name="cost" value={cost} title="Cost" handleChange={handleChange} />
            <FormGroup type="number" name="selling" value={selling} title="Selling Price" handleChange={handleChange} />
            <FormGroup type="number" name="quantity" value={quantity} title="Quantity" handleChange={handleChange} />
          </div>
        </div>
        <div className={formBtns}>
          <button type="submit" className="btn">
            <span><MdDataSaverOn /></span>
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

FormProduct.propTypes = {
  product: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default FormProduct;
