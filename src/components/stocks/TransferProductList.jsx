/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './TransferProductList.module.scss';

const { container } = styles;
const TransferProductList = (props) => {
  const { products, handleProductClick } = props;

  return (
    <div className={container}>
      <table role="grid">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Part Number</th>
            <th>Type</th>
            <th>Qty</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} onMouseDown={() => handleProductClick(product.id, product.name)}>
              <td>{products.indexOf(product) + 1}</td>
              <td>{product.name}</td>
              <td>{product.partNumber}</td>
              <td>{product.status}</td>
              <td>{product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TransferProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleProductClick: PropTypes.func.isRequired,
};

export default TransferProductList;
