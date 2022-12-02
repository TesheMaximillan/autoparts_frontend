/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { createStock, updateStock, deleteStock } from '../../store/actions/stockActions';
import { resetUpdateStock } from '../../store/reducers/stockReducer';
import useAdd from '../hooks/useAdd';
import styles from './AddStock.module.scss';
import InputWrapper from '../common/InputWrapper';
import FormGroup from '../modules/FormGroup';
import Button from '../modules/Button';
import Notification from '../common/Notification';
import ListWrapper from '../common/ListWrapper';
import ListDetail from '../common/ListDetail';

const { form, formBtns } = styles;

const AddStock = ({ updatedStocks, detailsId }) => {
  const isOpen = useSelector((state) => state.ui.notification.isOpen);
  const stocks = useSelector((state) => state.stock.stocks);
  const stockUpdate = useSelector((state) => state.stock.stockUpdate);

  const addProps = {
    component: 'Stock',
    itemUpdate: stockUpdate.update,
    itemData: stockUpdate.stock,
    items: stocks,
    updatedItems: updatedStocks,
    detailsId,
    resetUpdateItem: resetUpdateStock,
    createItem: createStock,
    updateItem: updateStock,
    deleteItem: deleteStock,
  };

  const {
    handleChange, handleSubmit, handleUpdate, handleDelete, name, update, newItems: newStocks,
  } = useAdd(addProps);

  return (
    <>
      <InputWrapper>
        <form onSubmit={handleSubmit}>
          <div className={form}>
            <FormGroup type="text" name="name" value={name} title="Stock Name" handleChange={handleChange} />
            <div className={formBtns}>
              {!update && (<Button type="submit" classname="addBtn" />)}
              {update && (<Button type="submit" classname="updateBtn" />)}
            </div>
          </div>
        </form>
      </InputWrapper>
      {isOpen && <Notification />}
      <ListWrapper height="AddStock">
        <ListDetail
          items={newStocks}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          update={update}
          page="main"
        />
      </ListWrapper>
    </>
  );
};

AddStock.propTypes = {
  updatedStocks: PropTypes.func.isRequired,
  detailsId: PropTypes.number.isRequired,
};

export default AddStock;
