/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import Notification from '../common/Notification';
import styles from './TransferStock.module.scss';
import Loading from '../common/Loading';
import TransferProductList from './TransferProductList';
import { hideNotification, showNotification } from '../../store/reducers/uiReducers';
import { createTransfer } from '../../store/actions/transferActions';

const {
  form, container,
  formContainer, input, inputDate, inputp, inputq,
} = styles;

const TransferStock = () => {
  const isError = useSelector((state) => state.ui.notification.isError);
  const stocksProducts = useSelector((state) => state.product.stocksProducts);
  const [focus, setFocus] = useState(false);
  const dispatch = useDispatch();

  if (!stocksProducts.length) return <Loading />;

  const productsStocks = stocksProducts.map((stock) => ({
    stockId: stock.stock.id,
    stockName: stock.stock.name,
    products: stock.products.map((product) => ({
      id: product.id,
      name: product.name,
      partNumber: product.part_number,
      status: product.status,
      quantity: product.quantity,
    })),
  }));

  const initialTransfer = {
    from: productsStocks[0].stockId,
    to: productsStocks[1].stockId,
    productName: '',
    productID: 0,
    quantity: 1,
    date: new Date().toISOString().slice(0, 10),
  };

  const [transfer, setTransfer] = useState(initialTransfer);

  const {
    from, to, productName, quantity, productID, date,
  } = transfer;

  const [products, setProducts] = useState(productsStocks[0].products);

  const handleInputFocus = () => {
    setFocus(true);
  };

  const handleInputBlur = () => {
    setFocus(false);
  };

  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleProductClick = (id, name) => {
    setTransfer({
      ...transfer,
      productName: name,
      productID: id,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'productName' || name === 'date') {
      setTransfer({ ...transfer, [name]: value });
    }

    if (name === 'from' || name === 'to' || name === 'quantity') {
      setTransfer({ ...transfer, [name]: parseInt(value, 10) });
    }

    if (name === 'from') {
      setProducts(
        productsStocks.filter((stock) => stock.stockId === parseInt(value, 10))[0].products,
      );
      setFilteredProducts(
        productsStocks.filter((stock) => stock.stockId === parseInt(value, 10))[0].products,
      );
    }

    if (name === 'productName') {
      setFilteredProducts(products
        .filter((product) => product.name.toLowerCase().includes(value.toLowerCase())
        || product.partNumber.toLowerCase().includes(value.toLowerCase())));
    }
  };

  const errorHandler = (message) => {
    dispatch(showNotification({ message, isError: true, isOpen: false }));
    setTimeout(() => dispatch(hideNotification()), 3000);
  };

  const isValid = () => {
    if (productID === 0) {
      errorHandler(['Please select a product']);
      return false;
    }

    const stockQty = productsStocks
      .filter((stock) => stock.stockId === parseInt(from, 10))[0]
      .products.filter((product) => product.id === productID)[0].quantity;

    if (from === to) {
      errorHandler(['You cannot transfer to the same stock']);
      return false;
    } if (quantity < 1) {
      errorHandler(['You cannot transfer less than 1']);
      return false;
    } if (quantity > stockQty) {
      errorHandler(['You cannot transfer more than the stock quantity']);
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValid()) return;

    dispatch(createTransfer({
      from, to, productID, quantity, date,
    }));

    setTransfer(initialTransfer);
  };

  const stockOptions = productsStocks.length ? (productsStocks.map((stock) => (
    <option key={stock.stockId} value={stock.stockId}>
      {stock.stockName}
    </option>
  ))) : (
    <option value="" />
  );

  return (
    <div className={container}>
      {isError && <Notification />}
      <form onSubmit={handleSubmit}>
        <div className={formContainer}>
          <h2>Transfer Stock</h2>
          <input type="date" id="date" name="date" value={date} onChange={handleChange} className={`${input} ${inputDate}`} />
          <div className={form}>
            <input type="text" name="productName" value={productName} onChange={handleChange} onBlur={handleInputBlur} onFocus={handleInputFocus} className={`${input} ${inputp}`} placeholder="Name" required />
            <select type="select" name="from" value={from} onChange={handleChange} className={input}>
              {stockOptions}
            </select>
            <select type="select" name="to" value={to} onChange={handleChange} className={input}>
              {stockOptions}
            </select>
            <input type="number" name="quantity" value={quantity} onChange={handleChange} className={`${input} ${inputq}`} placeholder="Quantity" required />
            <button type="submit" className="saveBtn"><BsFillCheckCircleFill /></button>
          </div>
        </div>
      </form>
      <div className="stockProducts">
        {focus && productName.trim() && (
          <TransferProductList
            products={filteredProducts}
            handleProductClick={handleProductClick}
          />
        )}
      </div>
    </div>
  );
};

export default TransferStock;
