/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import InputWrapper from '../common/InputWrapper';
import ListWrapper from '../common/ListWrapper';
import ListProduct from './ListProduct';
import SearchInput from '../modules/SearchInput';

const ProductDetails = (props) => {
  const loading = useSelector((state) => state.product.fetching);

  const { newProducts } = props;

  if (!newProducts) return <div>Loading...</div>;

  const [filteredProducts, setFilteredProducts] = useState(newProducts);

  useEffect(() => {
    setFilteredProducts(newProducts);
  }, [newProducts]);

  const handleSearch = (e) => {
    const filtered = e.target.value.toLowerCase().trim();
    setFilteredProducts(newProducts.filter(
      (product) => product.name.toLowerCase().trim().includes(filtered)
        || product.partNumber.toLowerCase().trim().includes(filtered)
        || product.brand.toLowerCase().trim().includes(filtered)
        || product.status.toLowerCase().trim().includes(filtered)
        || product.categoryName.toLowerCase().trim().includes(filtered),
    ));
  };

  const searchByName = (e) => {
    const filtered = e.target.value.toLowerCase().trim();
    setFilteredProducts(newProducts.filter(
      (product) => product.name.toLowerCase().trim().includes(filtered),
    ));
  };

  const searchByPartNumber = (e) => {
    const filtered = e.target.value.toLowerCase().trim();
    setFilteredProducts(newProducts.filter(
      (product) => product.partNumber.toLowerCase().trim().includes(filtered),
    ));
  };

  return (
    <>
      <InputWrapper>
        <SearchInput handleSearch={handleSearch} type="search" title="Search" />
        <SearchInput handleSearch={searchByName} type="name" title="Search by name" />
        <SearchInput handleSearch={searchByPartNumber} type="partNumber" title="Search by partnumber" />
      </InputWrapper>
      {loading ? <h1>Loading...</h1> : (
        <ListWrapper height="details">
          <ListProduct
            products={filteredProducts}
          />
        </ListWrapper>
      )}
    </>
  );
};

ProductDetails.propTypes = {
  newProducts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProductDetails;
