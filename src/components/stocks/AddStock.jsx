/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { createStock } from '../../store/actions/stockActions';
import useAdd from '../hooks/useAdd';
import AddName from '../common/AddName';

const AddStock = () => {
  const {
    handleChange, handleSubmit, name,
  } = useAdd({ createItem: createStock });

  return (
    <AddName handleChange={handleChange} handleSubmit={handleSubmit} name={name} title="Add Stock" />
  );
};

export default AddStock;
