import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { createCategory, deleteCategory, updateCategory } from '../../store/actions/categoryActions';
import { resetUpdateCategory } from '../../store/reducers/categoryReducer';
import InputWrapper from '../common/InputWrapper';
import ListWrapper from '../common/ListWrapper';
import Notification from '../common/Notification';
import Button from '../modules/Button';
import FormGroup from '../modules/FormGroup';
import styles from './AddCategory.module.scss';
import useAdd from '../hooks/useAdd';
import ListDetail from '../common/ListDetail';

const { form, formBtns } = styles;

const AddCategory = ({ updatedCategories, detailsId }) => {
  const isOpen = useSelector((state) => state.ui.notification.isOpen);
  const categorires = useSelector((state) => state.category.categories);
  const categoryUpdate = useSelector((state) => state.category.categoryUpdate);

  const addProps = {
    component: 'Category',
    itemUpdate: categoryUpdate.update,
    itemData: categoryUpdate.category,
    items: categorires,
    updatedItems: updatedCategories,
    detailsId,
    resetUpdateItem: resetUpdateCategory,
    createItem: createCategory,
    updateItem: updateCategory,
    deleteItem: deleteCategory,
  };

  const {
    handleChange, handleSubmit, handleUpdate, handleDelete, name, update, newItems: newCategories,
  } = useAdd(addProps);

  return (
    <>
      <InputWrapper>
        <form onSubmit={handleSubmit}>
          <div className={form}>
            <FormGroup type="text" name="name" value={name} title="Category Name" handleChange={handleChange} />
            <div className={formBtns}>
              {!update && (<Button type="submit" classname="addBtn" />)}
              {update && (<Button type="submit" classname="updateBtn" />)}
            </div>
          </div>
        </form>
      </InputWrapper>
      {isOpen && <Notification />}
      <ListWrapper height="AddCategory">
        <ListDetail
          items={newCategories}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          update={update}
          page="main"
        />
      </ListWrapper>
    </>
  );
};

AddCategory.propTypes = {
  updatedCategories: PropTypes.func.isRequired,
  detailsId: PropTypes.number.isRequired,
};

export default AddCategory;
