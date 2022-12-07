/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { RiTruckFill } from 'react-icons/ri';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import Notification from '../common/Notification';
import FormGroup from '../modules/FormGroup';
import styles from './TransferStock.module.scss';
import Loading from '../common/Loading';
import TransferProductList from './TransferProductList';
import { hideNotification, showNotification } from '../../store/reducers/uiReducers';
import { createTransfer } from '../../store/actions/transferActions';

const {
  container, transferBtn, text, icon, form, mainContainer, formContainer,
} = styles;

const TransferStock = () => {
  const [show, setShow] = React.useState(false);
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

  const [transfer, setTransfer] = useState({
    from: productsStocks[0].stockId,
    to: productsStocks[1].stockId,
    productName: '',
    productID: 0,
    quantity: 1,
    date: new Date().toISOString().slice(0, 10),
  });

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

  const toggleShow = () => {
    setShow(!show);
  };

  const handleProductClick = (id, name) => {
    setTransfer({
      ...transfer,
      productName: name,
      productID: id,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'productName') {
      setTransfer({ ...transfer, [name]: value });
    } else if (name === 'date') {
      setTransfer({ ...transfer, [name]: value });
    } else {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (from === to) {
      dispatch(showNotification({ message: ['You cannot transfer to the same stock'], isError: true, isOpen: false }));
      setTimeout(() => dispatch(hideNotification()), 3000);
      return;
    }

    console.log('date', date);

    if (quantity > productsStocks
      .filter((stock) => stock.stockId === parseInt(from, 10))[0].products
      .filter((product) => product.id === productID)[0].quantity) {
      dispatch(showNotification({ message: ['You cannot transfer more than the available quantity'], isError: true, isOpen: false }));
      setTimeout(() => dispatch(hideNotification()), 3000);
    }
    dispatch(createTransfer({
      from, to, productID, quantity,
    }));
  };

  const toggleBtn = (
    <>
      {!show && (
      <button type="button" className={transferBtn} onClick={toggleShow}>
        <span className={text}>Transfer</span>
        <span className={icon}><RiTruckFill /></span>
      </button>
      )}
      {show && <button type="button" className="cancelBtn" onClick={toggleShow}><AiFillCloseCircle /></button>}
    </>
  );

  const stockOptions = productsStocks.length ? (productsStocks.map((stock) => (
    <option key={stock.stockId} value={stock.stockId}>
      {stock.stockName}
    </option>
  ))) : (
    <option value="" />
  );

  return (
    <div className={container}>
      {toggleBtn}
      {show && (
      <div className={mainContainer}>
        {isError && <Notification />}
        <form onSubmit={handleSubmit}>
          <div className={formContainer}>
            <FormGroup type="date" name="date" value={date} handleChange={handleChange} title="Date:" classname="date" />
            <div className={form}>
              <FormGroup type="text" name="productName" value={productName} handleInputFocus={handleInputFocus} handleInputBlur={handleInputBlur} title="Product Name:" handleChange={handleChange} />
              <FormGroup type="select" name="from" value={from} title="From:" handleChange={handleChange} options={stockOptions} />
              <FormGroup type="select" name="to" value={to} title="To:" handleChange={handleChange} options={stockOptions} />
              <FormGroup type="number" name="quantity" value={quantity} title="Quantity:" handleChange={handleChange} />
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
      )}
    </div>
  );
};

export default TransferStock;
