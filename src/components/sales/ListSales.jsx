import React from 'react';
import PropTypes from 'prop-types';
import styles from '../products/ListProduct.module.scss';

const {
  container,
} = styles;

const ListSales = () => {
  return (
    <div className={container}>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  );
};

export default ListSales;
