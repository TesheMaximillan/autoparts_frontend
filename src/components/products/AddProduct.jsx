/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import {
  createProduct, deleteProduct, updateProduct,
} from '../../store/actions/productActions';
import ListProduct from './ListProduct';
import Notification from '../common/Notification';
import ListWrapper from '../common/ListWrapper';
import FormProduct from './FormProduct';
import InputWrapper from '../common/InputWrapper';
import { resetUpdateProduct } from '../../store/reducers/productReducer';
import { hideNotification, showNotification } from '../../store/reducers/uiReducers';
import styles from './AddProduct.module.scss';
import useProduct from '../hooks/useProduct';

const { alert } = styles;

const AddProduct = ({ updatedProducts, detailsId }) => {
  const categories = useSelector((state) => state.category.categories);
  const stocks = useSelector((state) => state.stock.stocks);

  if (categories.length === 0) { return <div className={alert}>Please Add Category first</div>; }
  if (stocks.length === 0) { return <div className={alert}>Please Add Stock first</div>; }

  const isOpen = useSelector((state) => state.ui.notification.isOpen);
  const products = useSelector((state) => state.product.products);
  const productUpdate = useSelector((state) => state.product.productUpdate);
  const stocksProducts = useSelector((state) => state.product.stocksProducts);
  if (!stocksProducts) return <div>Loading...</div>;

  const [idName, setIdName] = useState({ stock: stocks[0].name, category: categories[0].name });
  const [update, setUpdate] = useState(productUpdate.update);

  const id = products.length ? products[products.length - 1].id + 1 : 0;
  const [currentId, setCurrentId] = useState(id);
  const [productId, setProductId] = useState(0);

  const productObj = useProduct(stocksProducts, categories, stocks, products);
  const { productsStock, initialState, fetchedProducts } = productObj;

  const [productDetails, setProductDetails] = useState(productsStock);
  const [storeProducts, setStoreProducts] = useState(fetchedProducts);
  const [product, setProduct] = useState(initialState);
  const [newProducts, setNewProducts] = useState([]);
  const { cost, selling, quantity } = product;

  const dispatch = useDispatch();

  useEffect(() => {
    if (productUpdate.update) {
      setProduct(productUpdate.product);
    }
  }, [productUpdate]);

  useEffect(() => {
    updatedProducts(productDetails);
  }, [productDetails]);

  const handleUpdate = (id, product) => {
    setUpdate(true);
    setProduct(product);
    setProductId(id);
  };

  const handleDelete = (id) => {
    setNewProducts(newProducts.filter((product) => product.id !== id));
    if (products.find((product) => product.id === id).id) {
      dispatch(deleteProduct(id));
    }
  };

  const checkDuplicate = (product) => {
    let result = false;
    if (storeProducts.length) {
      const duplicate = storeProducts
        .find((p) => p.partNumber === product.partNumber.toLowerCase()
      && p.name === product.name.toLowerCase() && p.status === product.status.toLowerCase());
      if (duplicate) {
        dispatch(showNotification({
          message: { error: 'Product already exists' },
          isError: true,
          isOpen: true,
        }));
        setTimeout(() => dispatch(hideNotification()), 3000);
        result = true;
      }
    }
    return result;
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

    const index = e.nativeEvent.target.selectedIndex;
    if (name === 'category') {
      setIdName({ ...idName, category: e.nativeEvent.target[index].text });
    }
    if (name === 'stock') {
      setIdName({ ...idName, stock: e.nativeEvent.target[index].text });
    }
  };

  const updateState = () => {
    if (cost > 0 && selling >= cost && quantity > 0) {
      const updatedProduct = {
        ...product,
        categoryName: idName.category,
        stockName: idName.stock,
      };
      setNewProducts(newProducts.map((item) => (item.id === productId ? updatedProduct : item)));
      updatedProducts(
        productDetails.map((item) => (item.id === detailsId ? updatedProduct : item)),
      );
      setUpdate(false);
      setProductId();
      setProduct(initialState);
      dispatch(resetUpdateProduct());
    }
  };

  const createState = () => {
    if (cost > 0 && selling >= cost && quantity > 0) {
      setCurrentId(currentId + 1);
      const addProduct = {
        ...product,
        id: currentId,
        categoryName: idName.category,
        stockName: idName.stock,
      };
      setNewProducts([...newProducts, addProduct]);
      updatedProducts(setProductDetails([...productDetails, addProduct]));
      setStoreProducts([...storeProducts, product]);
      setProduct(initialState);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (update) {
      dispatch(updateProduct(product));
      updateState();
    } else {
      if (checkDuplicate(product)) return;
      dispatch(createProduct(product));
      createState();
    }
  };

  return (
    <>
      <InputWrapper>
        <FormProduct
          product={product}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          update={update}
        />
      </InputWrapper>
      {isOpen && <Notification />}
      <ListWrapper height="AddProduct">
        <ListProduct
          products={newProducts}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          update={update}
        />
      </ListWrapper>
    </>
  );
};

AddProduct.propTypes = {
  updatedProducts: PropTypes.func.isRequired,
  detailsId: PropTypes.number.isRequired,
};

export default AddProduct;
