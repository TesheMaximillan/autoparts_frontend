/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { createStock } from '../../store/actions/stockActions';
import useAdd from '../hooks/useAdd';
import styles from './AddStock.module.scss';
import InputWrapper from '../common/InputWrapper';
import FormGroup from '../modules/FormGroup';
import Button from '../modules/Button';
import Notification from '../common/Notification';

const { form, formBtns } = styles;

const AddStock = ({ updatedStocks }) => {
  const isOpen = useSelector((state) => state.ui.notification.isOpen);
  const stocks = useSelector((state) => state.stock.stocks);
  const stockUpdate = useSelector((state) => state.stock.stockUpdate);

  const addProps = {
    component: 'Stock',
    itemUpdate: stockUpdate.update,
    itemData: stockUpdate.stock,
    items: stocks,
    updatedItems: updatedStocks,
    createItem: createStock,
  };

  const {
    handleChange, handleSubmit, name,
  } = useAdd(addProps);

  return (
    <>
      {isOpen && <Notification />}
      <InputWrapper classname="stock">
        <form onSubmit={handleSubmit}>
          <div className={form}>
            <FormGroup type="text" name="name" value={name} title="Stock Name" handleChange={handleChange} />
            <div className={formBtns}>
              <Button type="submit" classname="addBtn" />
            </div>
          </div>
        </form>
      </InputWrapper>
    </>
  );
};

AddStock.propTypes = {
  updatedStocks: PropTypes.func.isRequired,
};

export default AddStock;
