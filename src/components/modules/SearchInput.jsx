import React from 'react';
import PropTypes from 'prop-types';
import styles from './SearchInput.module.scss';

const SearchInput = ({ handleSearch, type }) => {
  const { searchInput } = styles;
  return (
    <input type="text" id={type} className={searchInput} placeholder={`Search by ${type} 🔎`} name={type} onChange={handleSearch} />
  );
};

SearchInput.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default SearchInput;
