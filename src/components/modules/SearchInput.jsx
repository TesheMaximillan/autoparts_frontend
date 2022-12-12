import React from 'react';
import PropTypes from 'prop-types';
import styles from './SearchInput.module.scss';

const SearchInput = ({ handleSearch, type, title }) => {
  const { searchInput } = styles;
  return (
    <label htmlFor={type} className={searchInput}>
      <input type="text" id={type} placeholder={`${title} 🔎`} name={type} onChange={handleSearch} />
    </label>
  );
};

SearchInput.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default SearchInput;
