/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createProduct, deleteProduct, fetchStocksProducts, updateProduct,
} from '../../store/actions/productActions';
import ListProduct from './ListProduct';
import Notification from '../common/Notification';
import ListWrapper from '../common/ListWrapper';
import FormProduct from './FormProduct';
import InputWrapper from '../common/InputWrapper';
import { resetUpdateProduct } from '../../store/reducers/productReducer';

const AddProduct = () => {
  const categories = useSelector((state) => state.category.categories);
  const isOpen = useSelector((state) => state.ui.notification.isOpen);
  const stocks = useSelector((state) => state.stock.stocks);
  const products = useSelector((state) => state.product.products);
  const productUpdate = useSelector((state) => state.product.productUpdate);
  const id = products.length ? products[products.length - 1].id + 1 : 0;
  const [currentId, setCurrentId] = useState(id);
  const [idName, setIdName] = useState({
    stock: stocks[0].name,
    category: categories[0].name,
  });
  const [productId, setProductId] = useState('');
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

  const [product, setProduct] = useState(initialState);
  const [newProducts, setNewProducts] = useState([]);
  const { cost, selling, quantity } = product;

  useEffect(() => {
    if (productUpdate.update) {
      setProduct(productUpdate.product);
    }
  }, [productUpdate]);

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
      dispatch(fetchStocksProducts());

      if (cost > 0 && selling >= cost && quantity > 0) {
        setNewProducts(
          newProducts.map((item) => (item.id === productId
            ? { ...product, categoryName: idName.category, stockName: idName.stock } : item)),
        );
        setUpdate(false);
        setProductId('');
        setProduct(initialState);
        dispatch(resetUpdateProduct());
      }
    } else {
      dispatch(createProduct(product));
      dispatch(fetchStocksProducts());

      if (cost > 0 && selling >= cost && quantity > 0) {
        setCurrentId(currentId + 1);
        setNewProducts([...newProducts, {
          ...product,
          id: currentId,
          categoryName: idName.category,
          stockName: idName.stock,
        }]);
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

export default AddProduct;
