/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './StockDetails.module.scss';
import InputWrapper from '../common/InputWrapper';
import SearchInput from '../modules/SearchInput';
import ListWrapper from '../common/ListWrapper';
import { deleteProduct } from '../../store/actions/productActions';
import ListProduct from '../products/ListProduct';
import Notification from '../common/Notification';
import FormGroup from '../modules/FormGroup';

const { wrapper, productList } = styles;

const StockDetails = () => {
  const productUpdate = useSelector((state) => state.product.productUpdate.update);
  const stocksProducts = useSelector((state) => state.product.stocksProducts);
  const stocks = useSelector((state) => state.stock.stocks);
  const categories = useSelector((state) => state.category.categories);
  const isOpen = useSelector((state) => state.ui.notification.isOpen);

  const loading = useSelector((state) => state.stock.fetching);
  const dispatch = useDispatch();

  if (!stocks.length) return <div>Loading...</div>;
  if (!stocksProducts) return <div>Loading...</div>;

  const productss = stocksProducts.map((items) => items.products.map((item) => ({
    stockId: items.stock.id,
    stockName: items.stock.name,
    id: item.id,
    name: item.name,
    category: item.category_id,
    categoryName: categories.find((category) => category.id === item.category_id).name,
    partNumber: item.part_number,
    brand: item.brand,
    status: item.status,
    selling: parseFloat(item.selling),
    cost: parseFloat(item.cost),
    quantity: parseInt(item.quantity, 10),
  }))).flat();

  const products = productss.filter((product) => product.stockId === stocks[0].id);
  const [filteredStockProducts, setFilteredStockProducts] = useState(products);

  const [productts, setProductts] = useState(filteredStockProducts);
  const [id, setId] = useState(-1);

  const [updateProduct, setUpdateProduct] = useState({
    name: '',
    category: 0,
    categoryName: '',
    partNumber: '',
    brand: '',
    status: '',
    selling: 0.0,
    cost: 0.0,
    quantity: 0,
  });

  const [initialStock, setInitialStock] = useState({
    id: stocks[0].id,
    name: stocks[0].name,
  });

  const selectStock = (id) => {
    const stockProducts = productss.filter((product) => product.stockId === id);
    setFilteredStockProducts(stockProducts);
    setProductts(stockProducts);
  };

  const handleProductSearch = (e) => {
    const filtered = e.target.value.toLowerCase().trim();
    setFilteredStockProducts(productts.filter(
      (item) => item.name.toLowerCase().trim().includes(filtered)
        || item.partNumber.toLowerCase().trim().includes(filtered)
        || item.brand.toLowerCase().trim().includes(filtered)
        || item.status.toLowerCase().trim().includes(filtered)
        || item.categoryName.toLowerCase().trim().includes(filtered),
    ));
  };

  const handleChange = (e) => {
    const { value } = e.target;
    const stock = stocks.find((item) => item.id === parseInt(value, 10));
    setInitialStock({
      id: stock.id,
      name: stock.name,
    });
    selectStock(stock.id);
  };

  const handleProductUpdate = (id, product) => {
    setUpdateProduct(product);
    setId(id);
  };

  const stockOptions = stocks.length ? (stocks.map((stock) => (
    <option key={stock.id} value={stock.id}>
      {stock.name}
    </option>
  ))) : (
    <option value="" />
  );

  const handleProductDelete = (id, stockID) => {
    setFilteredStockProducts(filteredStockProducts.filter((item) => item.id !== id));
    if (productss.find((item) => item.id === id).id) {
      dispatch(deleteProduct({ productID: id, stockID }));
    }
  };

  return (
    <>
      <InputWrapper>
        <FormGroup type="select" name="stock" value={initialStock.name} title="Stock" handleChange={handleChange} options={stockOptions} />
        <SearchInput handleSearch={handleProductSearch} type="any" title="Search" />
      </InputWrapper>
      {isOpen && <Notification />}
      {loading ? <h1>Loading...</h1> : (
        <ListWrapper height="details">
          <div className={wrapper}>
            <div className={productList}>
              <ListProduct
                products={filteredStockProducts}
                setFilteredStockProducts={setFilteredStockProducts}
                handleUpdate={handleProductUpdate}
                handleDelete={handleProductDelete}
                update={productUpdate}
                action
                selectId={id}
                updateProduct={updateProduct}
                setUpdateProduct={setUpdateProduct}
              />
            </div>
          </div>
        </ListWrapper>
      )}
    </>
  );
};

export default StockDetails;
