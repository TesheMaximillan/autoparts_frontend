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

const { alert } = styles;

const AddProduct = ({ updatedProducts, detailsId }) => {
  const categories = useSelector((state) => state.category.categories);
  const stocks = useSelector((state) => state.stock.stocks);
  let stocksProducts = useSelector((state) => state.product.stocksProducts);

  if (!stocksProducts) return <div>Loading...</div>;

  stocksProducts = stocksProducts.map((data) => (
    data.products.map((product) => (
      {
        id: product.id,
        name: product.name,
        partNumber: product.part_number,
        brand: product.brand,
        status: product.status,
        category: categories.find((category) => category.id === product.category_id).id,
        categoryName: categories.find((category) => category.id === product.category_id).name,
        stock: data.stock.id,
        stockName: data.stock.name,
        cost: parseFloat(product.cost),
        selling: parseFloat(product.selling),
        quantity: parseInt(product.quantity, 10),
      }
    )))).flat();

  const [productDetails, setProductDetails] = useState(stocksProducts);

  if (categories.length === 0) {
    return <div className={alert}>Please Add Category first</div>;
  }

  if (stocks.length === 0) {
    return <div className={alert}>Please Add Stock first</div>;
  }

  const isOpen = useSelector((state) => state.ui.notification.isOpen);
  const products = useSelector((state) => state.product.products);

  const productUpdate = useSelector((state) => state.product.productUpdate);
  const id = products.length ? products[products.length - 1].id + 1 : 0;
  const [currentId, setCurrentId] = useState(id);
  const [idName, setIdName] = useState({
    stock: stocks[0].name,
    category: categories[0].name,
  });
  const [productId, setProductId] = useState(0);
  const [update, setUpdate] = useState(productUpdate.update);
  const dispatch = useDispatch();
  const initialState = {
    name: '',
    partNumber: '',
    brand: 'Toyota',
    status: 'Original',
    category: categories[0].id,
    stock: stocks[0].id,
    cost: '',
    selling: '',
    quantity: '',
  };

  const fetched = (products) => {
    const newProducts = products.map((product) => ({
      name: product.name,
      partNumber: product.part_number,
      brand: product.brand,
      status: product.status,
      category: product.category_id,
      stock: 1,
      cost: product.cost,
      selling: product.selling,
      quantity: product.quantity,
    }));
    return newProducts;
  };

  const [storeProducts, setStoreProducts] = useState(fetched(products));
  const [product, setProduct] = useState(initialState);
  const [newProducts, setNewProducts] = useState([]);
  const { cost, selling, quantity } = product;

  useEffect(() => {
    if (productUpdate.update) {
      setProduct(productUpdate.product);
    }
  }, [productUpdate]);

  useEffect(() => {
    updatedProducts(productDetails);
  }, [productDetails]);

  const undleUpdate = (id, product) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (update) {
      dispatch(updateProduct(product));

      if (cost > 0 && selling >= cost && quantity > 0) {
        setNewProducts(
          newProducts.map((item) => (item.id === productId
            ? { ...product, categoryName: idName.category, stockName: idName.stock } : item)),
        );
        updatedProducts(
          productDetails.map((item) => (item.id === detailsId
            ? { ...product, categoryName: idName.category, stockName: idName.stock } : item)),
        );
        setUpdate(false);
        setProductId();
        setProduct(initialState);
        dispatch(resetUpdateProduct());
      }
    } else {
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
          return;
        }
      }

      dispatch(createProduct(product));

      if (cost > 0 && selling >= cost && quantity > 0) {
        setCurrentId(currentId + 1);
        setNewProducts([...newProducts, {
          ...product,
          id: currentId,
          categoryName: idName.category,
          stockName: idName.stock,
        }]);
        updatedProducts(setProductDetails([...productDetails, {
          ...product,
          id: currentId,
          categoryName: idName.category,
          stockName: idName.stock,
        }]));
        setStoreProducts([...storeProducts, product]);
        setProduct(initialState);
      }
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
          undleUpdate={undleUpdate}
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
