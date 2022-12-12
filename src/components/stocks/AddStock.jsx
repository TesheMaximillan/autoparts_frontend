/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import { createStock } from '../../store/actions/stockActions';
import useAdd from '../hooks/useAdd';
import AddName from '../common/AddName';

const AddStock = () => {
  const stocks = useSelector((state) => state.stock.stocks);

  const addProps = {
    component: 'Stock',
    items: stocks,
    createItem: createStock,
  };

  const {
    handleChange, handleSubmit, name,
  } = useAdd(addProps);

  return (
    <AddName handleChange={handleChange} handleSubmit={handleSubmit} name={name} title="Add Stock" />
  );
};

export default AddStock;
