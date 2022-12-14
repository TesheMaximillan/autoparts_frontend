import React from 'react';
import { useSelector } from 'react-redux';
import { updateCategory } from '../../store/actions/categoryActions';
import AddDetails from '../common/AddDetails';

const CategoryDetails = () => {
  const categories = useSelector((state) => state.category.categories);

  return (<AddDetails items={categories} updateItem={updateCategory} />
  );
};

export default CategoryDetails;
