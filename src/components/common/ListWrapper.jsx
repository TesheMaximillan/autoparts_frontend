import React from 'react';
import PropTypes from 'prop-types';
import styles from './ListWrapper.module.scss';

const ListWrapper = ({ height, children }) => {
  const {
    listWrapper, detailsHeight, newProductHeight,
  } = styles;

  const customHeight = height === 'AddProduct' ? newProductHeight : detailsHeight;

  return (
    <div className={`${listWrapper} ${customHeight}`}>{children}</div>
  );
};

ListWrapper.propTypes = {
  height: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ListWrapper;
