import React from 'react';
import PropTypes from 'prop-types';
import styles from '../products/ListProduct.module.scss';

const {
  container,
} = styles;

const ListSales = (Props) => {
  const {products} = Props;
 console.log("LIST SALES ...", products)
 console.log("IS PRODUCTS AN ARRAY",  products.isArray)
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
          {products.productName != "" ?  Object.keys(products).map((product, i) => (
          <tr  key={i}>
            <td>{i}</td>
            <td colSpan={i}> {products[product]}</td>
            </tr>
          )) : <tr><td colSpan="5">No Sales</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default ListSales;
