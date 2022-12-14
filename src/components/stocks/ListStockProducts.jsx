/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ImPencil2 } from 'react-icons/im';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ListStockProducts.module.scss';
import { updateProduct as updateeProduct } from '../../store/actions/productActions';

const {
  container, btns, updateBtn, deleteBtn, disableBtn,
  inputField, btnInput, ok, cancel, price,
} = styles;

const ListStockProducts = (props) => {
  const categories = useSelector((state) => state.category.categories);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(categories[0].id);
  const dispatch = useDispatch();

  const {
    products, handleUpdate, handleDelete, update, action, selectId,
    updateProduct, setUpdateProduct, setFilteredStockProducts,
  } = props;

  const deleteClass = update ? `${disableBtn}` : deleteBtn;
  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const handleOpen = (id, product) => {
    setOpen(true);
    handleUpdate(id, product);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = () => {
    setOpen(false);
    setFilteredStockProducts(products.map((product) => {
      if (product.id === selectId) {
        return {
          ...product,
          name: updateProduct.name,
          partNumber: updateProduct.partNumber,
          brand: updateProduct.brand,
          status: updateProduct.status,
          cost: updateProduct.cost,
          selling: updateProduct.selling,
          quantity: updateProduct.quantity,
          categoryName: updateProduct.categoryName,
        };
      }
      return product;
    }));
    dispatch(updateeProduct(updateProduct));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'quantity') {
      if (Number.isNaN(value)) setUpdateProduct({ ...updateProduct, [name]: 0 });
      else setUpdateProduct({ ...updateProduct, [name]: parseInt(value, 10) });
    } else if (name === 'cost' || name === 'selling') {
      if (Number.isNaN(value)) setUpdateProduct({ ...updateProduct, [name]: 0 });
      else setUpdateProduct({ ...updateProduct, [name]: parseFloat(value) });
    } else {
      if (name === 'category') setCategory(value);
      setUpdateProduct({ ...updateProduct, [name]: value });
    }
  };

  const keyGenrator = (id, stock) => {
    if (action) return `s${stock}-${id}`;
    return id;
  };

  const categoryOptions = categories.length ? (
    categories.map((category) => (
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    ))
  ) : (
    <option value="" />
  );

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
            {action && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <>
              {(selectId !== product.id || !open) && (
              <tr key={keyGenrator(product.id, product.stockId)}>
                <td>{products.indexOf(product) + 1}</td>
                <td>{product.name}</td>
                <td>{product.partNumber}</td>
                <td>{product.categoryName}</td>
                <td>{product.brand}</td>
                <td>{product.status}</td>
                <td className={price}>{USDollar.format((product.cost))}</td>
                <td className={price}>{USDollar.format((product.selling))}</td>
                <td>{product.quantity}</td>
                {action && (
                <td className={btns}>
                  <button type="button" onClick={() => handleOpen(product.id, product)} className={updateBtn}><ImPencil2 /></button>
                  <button type="button" className={deleteClass} disabled={update} onClick={() => handleDelete(product.id, product.stockId)}><RiDeleteBin5Fill /></button>
                </td>
                )}
              </tr>
              )}
              {action && selectId === product.id && open && (
              <tr className={inputField}>
                <td>{products.indexOf(product) + 1}</td>
                <td><input name="name" type="text" value={updateProduct.name} onChange={handleChange} /></td>
                <td><input name="partNumber" type="text" value={updateProduct.partNumber} onChange={handleChange} /></td>
                <td>
                  <select id="category" name="category" value={category} onChange={handleChange}>
                    {categoryOptions}
                  </select>
                </td>
                <td><input name="brand" type="text" value={updateProduct.brand} onChange={handleChange} /></td>
                <td><input name="status" type="text" value={updateProduct.status} onChange={handleChange} /></td>
                <td><input name="cost" type="number" value={updateProduct.cost} onChange={handleChange} /></td>
                <td><input name="selling" type="number" value={updateProduct.selling} onChange={handleChange} /></td>
                <td><input name="quantity" type="number" value={updateProduct.quantity} onChange={handleChange} /></td>
                <td className={`${btns} ${btnInput}`}>
                  <button type="button" className={ok} onClick={handleOk}>
                    <BsFillCheckCircleFill />
                  </button>
                  <button type="button" className={cancel} onClick={handleClose}>
                    <AiFillCloseCircle />
                  </button>
                </td>
              </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ListStockProducts.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleUpdate: PropTypes.func,
  handleDelete: PropTypes.func,
  update: PropTypes.bool,
  action: PropTypes.bool,
  selectId: PropTypes.number,
  updateProduct: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    partNumber: PropTypes.string,
    brand: PropTypes.string,
    status: PropTypes.string,
    cost: PropTypes.number,
    selling: PropTypes.number,
    quantity: PropTypes.number,
    categoryName: PropTypes.string,
  }),
  setUpdateProduct: PropTypes.func,
  setFilteredStockProducts: PropTypes.func,
};

export default ListStockProducts;
