/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteCategory } from '../../store/actions/categoryActions';
import { setUpdateCategory } from '../../store/reducers/categoryReducer';
import InputWrapper from '../common/InputWrapper';
import SearchInput from '../modules/SearchInput';
import ListWrapper from '../common/ListWrapper';
import styles from './CategoryDetails.module.scss';
import useDetails from '../hooks/useDetails';
import ListDetail from '../common/ListDetail';

const { categoryList } = styles;

const CategoryDetails = (props) => {
  const update = useSelector((state) => state.category.categoryUpdate.update);
  const loading = useSelector((state) => state.category.fetching);

  const { changeShow, newCategories, selectId } = props;

  const addProps = {
    changeShow,
    selectId,
    newItems: newCategories,
    setUpdateItem: setUpdateCategory,
    deleteItem: deleteCategory,
  };

  const {
    handleSearch, handleUpdate, handleDelete, filteredItems: filteredCategories,
  } = useDetails(addProps);

  return (
    <>
      <InputWrapper>
        <SearchInput handleSearch={handleSearch} type="any" title="Search" />
      </InputWrapper>
      {loading ? <h1>Loading...</h1> : (
        <ListWrapper height="details">
          <div className={categoryList}>
            <ListDetail
              items={filteredCategories}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              update={update}
            />
          </div>
        </ListWrapper>
      )}
    </>
  );
};

CategoryDetails.propTypes = {
  changeShow: PropTypes.func.isRequired,
  newCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectId: PropTypes.func.isRequired,
};

export default CategoryDetails;
