/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
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
import Loading from '../common/Loading';

const { alert } = styles;

const AddProduct = (props) => {
  const categories = useSelector((state) => state.category.categories);
  const isCategoryLoading = useSelector((state) => state.category.fetching);
  const isStockLoading = useSelector((state) => state.stock.fetching);
  const stocks = useSelector((state) => state.stock.stocks);
  const {
    updatedProducts, storeProducts, setStoreProducts,
  } = props;

  if ((!isCategoryLoading && categories.length === 0) || (!isStockLoading && stocks.length === 0)) {
    return <div className={alert}>Please Add Category and Stock first</div>;
  }

  const products = useSelector((state) => state.product.products);
  if (!products) return <Loading />;
  const isOpen = useSelector((state) => state.ui.notification.isOpen);
  const productUpdate = useSelector((state) => state.product.productUpdate);

  const [idName, setIdName] = useState({ stock: stocks[0].name, category: categories[0].name });
  const [update, setUpdate] = useState(productUpdate.update);

  const id = products.length ? products[products.length - 1].id + 1 : 0;
  const [currentId, setCurrentId] = useState(id);
  const [productId, setProductId] = useState(0);

  const productObj = useProduct(categories, stocks, products);
  const { productsStock, initialState, fetchedProducts } = productObj;
  const [productDetails, setProductDetails] = useState(productsStock);
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
    setStoreProducts(fetchedProducts);
  }, []);

  useEffect(() => {
    updatedProducts(productDetails);
  }, [productDetails]);

  const handleUpdate = (id, product) => {
    setUpdate(true);
    setProduct(product);
    setProductId(id);
  };

  const handleDelete = (id, stockID) => {
    setNewProducts(newProducts.filter((product) => product.id !== id));
    setStoreProducts(storeProducts.filter((product) => product.id !== id));
    if (products.find((product) => product.id === id).id) {
      dispatch(deleteProduct({ productID: id, stockID }));
    }
  };

  const checkDuplicate = (product) => {
    let result = false;
    if (storeProducts.length > 0) {
      const duplicate = storeProducts
        .find((p) => p.partNumber.toLowerCase() === product.partNumber.toLowerCase().trim()
         && p.name.toLowerCase() === product.name.toLowerCase().trim()
         && p.status.toLowerCase() === product.status.toLowerCase().trim());
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
    if (cost >= 0 && selling >= cost && quantity >= 0) {
      const updatedProduct = {
        ...product,
        categoryName: idName.category,
        stockName: idName.stock,
      };
      setNewProducts(newProducts.map((item) => (item.id === productId ? updatedProduct : item)));
      setUpdate(false);
      setProductId();
      setProduct(initialState);
      dispatch(resetUpdateProduct());
    }
  };

  const createState = () => {
    if (cost > 0 && selling >= cost && quantity > 0) {
      storeProducts.sort((a, b) => a.id - b.id);

      setCurrentId(currentId + 1);
      const addProduct = {
        ...product,
        id: currentId,
        categoryName: idName.category,
        stockName: idName.stock,
      };
      setNewProducts([...newProducts, addProduct]);
      updatedProducts(setProductDetails([...productDetails, {
        id: addProduct.id,
        name: addProduct.name,
        partNumber: addProduct.partNumber,
        brand: addProduct.brand,
        status: addProduct.status,
        category: addProduct.category,
        categoryName: addProduct.categoryName,
        cost: addProduct.cost,
        selling: addProduct.selling,
        quantity: addProduct.quantity,
      }]));
      setStoreProducts([...storeProducts, { ...product, id: currentId }]);
      setProduct(initialState);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (update) {
      dispatch(updateProduct({ ...product, stockId: product.stock }));
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
          action
        />
      </ListWrapper>
    </>
  );
};

AddProduct.propTypes = {
  updatedProducts: PropTypes.func.isRequired,
  storeProducts: PropTypes.arrayOf(PropTypes.object),
  setStoreProducts: PropTypes.func.isRequired,
};

export default AddProduct;
