/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { ImPencil2 } from 'react-icons/im';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import styles from './ListProduct.module.scss';

const ListProduct = ({
  products, handleUpdate, handleDelete, update,
}) => {
  const {
    container, btns, updateBtn, deleteBtn, disableBtn,
  } = styles;

  const deleteClass = update ? `${disableBtn}` : deleteBtn;

  return (
    <div className={container}>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Product Name</th>
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
            <tr key={product.id}>
              <td>{products.indexOf(product) + 1}</td>
              <td>{product.name}</td>
              <td>{product.partNumber}</td>
              <td>{product.categoryName}</td>
              <td>{product.brand}</td>
              <td>{product.status}</td>
              <td>{(product.cost).toFixed(2)}</td>
              <td>{(product.selling).toFixed(2)}</td>
              <td>{product.quantity}</td>
              <td>{product.stockName}</td>
              <td className={btns}>
                <button type="button" onClick={() => handleUpdate(product.id, product)} className={updateBtn}><ImPencil2 /></button>
                <button type="button" className={deleteClass} disabled={update} onClick={() => handleDelete(product.id)}><RiDeleteBin5Fill /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListProduct;
