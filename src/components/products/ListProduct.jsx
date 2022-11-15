/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import { uuid } from 'uuidv4';
import styles from './ListProduct.module.scss';

const ListProduct = ({ products }) => {
  const stocks = useSelector((state) => state.stock.stocks);
  const { container } = styles;
  return (
    <div className={container}>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Part Number</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Type</th>
            <th>Cost</th>
            <th>Selling Price</th>
            <th>Quantity</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={uuid}>
              <td>{products.indexOf(product) + 1}</td>
              <td>{product.name}</td>
              <td>{product.partNumber}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>{product.type}</td>
              <td>{product.cost}</td>
              <td>{product.selling}</td>
              <td>{product.quantity}</td>
              <td>{stocks.find((stock) => stock.id === product.stock).name}</td>
              <td>
                <button type="button">Edit</button>
                <button type="button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListProduct;
