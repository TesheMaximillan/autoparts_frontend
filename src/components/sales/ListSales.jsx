import React from 'react';
import PropTypes from 'prop-types';
import styles from '../products/ListProduct.module.scss';

const {
  container,
} = styles;

const ListSales = (Props) => {
  const {products} = Props;
  console.log("** PRODUCTS LIST*****", products)
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
          {products.productName != "" ?  Object.keys(products).slice(0, (Object.keys(products).length/3)).map((product, i) => (
          <tr  key={i}>
            <td>{i+1}</td>
            <td> {products.productName}</td>
            <td>{products.quantity}</td>
            <td>{products.unitPrice}</td>
            <td>{products.quantity*products.unitPrice}</td>
            </tr>
          )) : <tr><td colSpan="5">No Sales</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default ListSales;
