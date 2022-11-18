/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteProduct } from '../../store/actions/productActions';
import { setUpdateProduct } from '../../store/reducers/productReducer';
import InputWrapper from '../common/InputWrapper';
import ListWrapper from '../common/ListWrapper';
import ListProduct from './ListProduct';
import styles from './ProductDetails.module.scss';
import SearchInput from '../common/SearchInput';

const ProductDetails = ({ changeShow }) => {
  const stocksProducts = useSelector((state) => state.product.stocksProducts);
  const categories = useSelector((state) => state.category.categories);
  const update = useSelector((state) => state.product.productUpdate.update);
  const newProducts = stocksProducts.map((data) => (
    data.products.map((product) => (
      {
        id: product.id,
        name: product.name,
        partNumber: product.part_number,
        brand: product.brand,
        status: product.status,
        category: categories.find((category) => category.id === product.category_id).id,
        categoryName: categories.find((category) => category.id === product.category_id).name,
        stock: data.stock.id,
        stockName: data.stock.name,
        cost: parseFloat(product.cost),
        selling: parseFloat(product.selling),
        quantity: parseInt(product.quantity, 10),
      }
    )))).flat();

  const [filteredProducts, setFilteredProducts] = useState(newProducts);
  const { inputContainer } = styles;
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

  const handleUpdate = (id, product) => {
    dispatch(setUpdateProduct(product));
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
      <ListWrapper height="prodcutDetails">
        <ListProduct
          products={filteredProducts}
          undleUpdate={handleUpdate}
          handleDelete={handleDelete}
          update={update}
        />
      </ListWrapper>
    </>
  );
};

ProductDetails.propTypes = {
  changeShow: PropTypes.func.isRequired,
};

export default ProductDetails;
