import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../store/actions/productActions';
import FormProduct from './FormProduct';
import styles from './AddProduct.module.scss';
import Notification from '../common/Notification';
import { hideNotification, showNotification } from '../../store/reducers/uiReducers';

const { alert, container } = styles;

const AddProduct = () => {
  const categories = useSelector((state) => state.category.categories);
  const stocks = useSelector((state) => state.stock.stocks);
  const products = useSelector((state) => state.product.products);
  const isError = useSelector((state) => state.ui.notification.isError);
  const [store, setStore] = useState([]);
  const dispatch = useDispatch();

  if (!categories.length || !stocks.length) {
    return <div className={alert}>Please Add Category and Stock first</div>;
  }

  const productss = products.map((item) => ({
    name: item.name,
    partNumber: item.part_number,
    status: item.status,
  }));

  const initialState = {
    name: '',
    partNumber: '',
    brand: 'Toyota',
    status: 'Original',
    category: categories[0].id,
    stock: stocks[0].id,
    cost: 0,
    selling: 0,
    quantity: 0,
  };

  const [product, setProduct] = useState(initialState);
  const { cost, selling, quantity } = product;

  const checkDuplicate = (name, partNumber, status) => {
    const duplicate = store.filter(
      (item) => item.name === name && item.partNumber === partNumber && item.status === status,
    );
    return duplicate.length;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'quantity') {
      setProduct({ ...product, [name]: parseInt(value, 10) });
    } else if (name === 'cost' || name === 'selling') {
      setProduct({ ...product, [name]: parseFloat(value) });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    if (!store.length) setStore(productss);
    const { name, partNumber, status } = product;
    e.preventDefault();
    setProduct({
      ...product,
      name: product.name.toLowerCase().trim(),
      partNumber: product.partNumber.toLowerCase().trim(),
      status: product.status.toLowerCase().trim(),
    });
    const duplicate = checkDuplicate(name, partNumber, status);
    if (duplicate) {
      dispatch(showNotification({
        message: ['Product already exists'],
        isError: true,
        isOpen: false,
      }));
      setTimeout(() => { dispatch(hideNotification()); }, 3000);
      return;
    }

    if (!store.filter((item) => item === { name, partNumber, status }).length) {
      setStore([...store, { name, partNumber, status }]);
    }

    dispatch(createProduct(product));
    if (cost > 0 && selling >= cost && quantity > 0) {
      setProduct(initialState);
    }
  };

  return (
    <div className={container}>
      {isError && <Notification />}
      <FormProduct
        product={product}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        title="Add Product"
      />
    </div>
  );
};

export default AddProduct;
