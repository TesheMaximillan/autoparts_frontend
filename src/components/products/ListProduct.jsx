/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './ListProduct.module.scss';

const {
  container, price,
} = styles;

const ListProduct = (props) => {
  const { products, showCategory } = props;

  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  products.sort((a, b) => {
    if (a.id < b.id) {
      return 1;
    }
    if (a.id > b.id) {
      return -1;
    }
    return 0;
  });

  return (
    <div className={container}>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Product Name</th>
            <th>Part Number</th>
            {showCategory && <th>Category</th>}
            <th>Brand</th>
            <th>Type</th>
            <th>Cost</th>
            <th>Selling Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{products.indexOf(product) + 1}</td>
              <td>{product.name}</td>
              <td>{product.partNumber}</td>
              {showCategory && <td>{product.categoryName}</td>}
              <td>{product.brand}</td>
              <td>{product.status}</td>
              <td className={price}>{USDollar.format((product.cost))}</td>
              <td className={price}>{USDollar.format((product.selling))}</td>
              <td>{product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ListProduct.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  showCategory: PropTypes.bool,
};

export default ListProduct;
