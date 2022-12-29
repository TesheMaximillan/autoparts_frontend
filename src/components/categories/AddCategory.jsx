/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { createCategory } from '../../store/actions/categoryActions';
import useAdd from '../hooks/useAdd';
import AddName from '../common/AddName';

const AddCategory = () => {
  const {
    handleChange, handleSubmit, name,
  } = useAdd({ createItem: createCategory });

  return (
    <AddName handleChange={handleChange} handleSubmit={handleSubmit} name={name} title="Add Category" />
  );
};

export default AddCategory;
