/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import { createCategory } from '../../store/actions/categoryActions';
import useAdd from '../hooks/useAdd';
import AddName from '../common/AddName';

const AddCategory = () => {
  const categories = useSelector((state) => state.category.categories);

  const addProps = {
    component: 'Stock',
    items: categories,
    createItem: createCategory,
  };

  const {
    handleChange, handleSubmit, name,
  } = useAdd(addProps);

  return (
    <AddName handleChange={handleChange} handleSubmit={handleSubmit} name={name} title="Add Category" />
  );
};

export default AddCategory;
