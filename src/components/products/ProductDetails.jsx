/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteProduct } from '../../store/actions/productActions';
import { setUpdateProduct } from '../../store/reducers/productReducer';
import InputWrapper from '../common/InputWrapper';
import ListWrapper from '../common/ListWrapper';
import ListProduct from './ListProduct';
import styles from './ProductDetails.module.scss';

import SearchInput from '../modules/SearchInput';

const ProductDetails = (props) => {
  const update = useSelector((state) => state.product.productUpdate.update);
  const loading = useSelector((state) => state.product.fetching);

  const {
    changeShow, newProducts, selectId,
  } = props;

  if (!newProducts) return <div>Loading...</div>;

  const [filteredProducts, setFilteredProducts] = useState(newProducts);
  const { inputContainer } = styles;

  useEffect(() => {
    setFilteredProducts(newProducts);
  }, [newProducts]);

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const filtered = e.target.value.toLowerCase();
    const type = e.target.name;

    setFilteredProducts(newProducts.filter(
      (product) => product[type].toLowerCase().includes(filtered),
    ));
  };

  const handleAnySearch = (e) => {
    const filtered = e.target.value.toLowerCase();
    setFilteredProducts(newProducts.filter(
      (product) => product.name.toLowerCase().includes(filtered)
        || product.partNumber.toLowerCase().includes(filtered)
        || product.brand.toLowerCase().includes(filtered)
        || product.status.toLowerCase().includes(filtered)
        || product.categoryName.toLowerCase().includes(filtered)
        || product.stockName.toLowerCase().includes(filtered),
    ));
  };

  const handleUpdate = (idd, product) => {
    dispatch(setUpdateProduct(product));
    selectId(idd);
    changeShow();
  };

  const handleDelete = (id) => {
    setFilteredProducts(filteredProducts.filter((product) => product.id !== id));
    if (newProducts.find((product) => product.id === id).id) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <>
      <InputWrapper>
        <div className={inputContainer}>
          <label htmlFor="name">
            Product Name: &nbsp;
            <SearchInput handleSearch={handleSearch} type="name" />
          </label>
          <label htmlFor="partNumber">
            Part Number: &nbsp;
            <SearchInput handleSearch={handleSearch} type="partNumber" />
          </label>
          <label htmlFor="any">
            Any Search: &nbsp;
            <SearchInput handleSearch={handleAnySearch} type="any" />
          </label>
        </div>
      </InputWrapper>
      {loading ? <h1>Loading...</h1> : (
        <ListWrapper height="prodcutDetails">
          <ListProduct
            products={filteredProducts}
            undleUpdate={handleUpdate}
            handleDelete={handleDelete}
            update={update}
          />
        </ListWrapper>
      )}
    </>
  );
};

ProductDetails.propTypes = {
  changeShow: PropTypes.func.isRequired,
  newProducts: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectId: PropTypes.func.isRequired,
};

export default ProductDetails;
