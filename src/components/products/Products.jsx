import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import InputWrapper from '../common/InputWrapper';
import ListWrapper from '../common/ListWrapper';
import Loading from '../common/Loading';
import SearchInput from '../modules/SearchInput';
import ListProduct from './ListProduct';
import styles from './Products.module.scss';

const { wrapper } = styles;
const Products = () => {
  const loadProduct = useSelector((state) => state.product.fetching);
  const loading = useSelector((state) => state.category.fetching || loadProduct);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const categories = useSelector((state) => state.category.categories);
  const products = useSelector((state) => state.product.products);

  if (!categories.length || !products.length) return <Loading />;

  const productss = products.map((item) => ({
    id: item.id,
    name: item.name,
    category: item.category_id,
    categoryName: categories.find((category) => category.id === item.category_id).name,
    partNumber: item.part_number,
    brand: item.brand,
    status: item.status,
    selling: parseFloat(item.selling),
    cost: parseFloat(item.cost),
    quantity: item.quantity,
  }));

  const handleProductSearch = (e) => {
    const filtered = e.target.value.toLowerCase().trim();
    setFilteredProducts(productss.filter(
      (item) => item.name.toLowerCase().trim().includes(filtered)
        || item.partNumber.toLowerCase().trim().includes(filtered)
        || item.categoryName.toLowerCase().trim().includes(filtered)
        || item.brand.toLowerCase().trim().includes(filtered)
        || item.status.toLowerCase().trim().includes(filtered),
    ));
  };

  return (
    <>
      <InputWrapper>
        <SearchInput handleSearch={handleProductSearch} type="any" title="Search" />
      </InputWrapper>
      {loading ? <Loading /> : (
        <ListWrapper height="details">
          <div className={wrapper}>
            <ListProduct
              products={filteredProducts.length ? filteredProducts : productss}
              showCategory
            />
          </div>
        </ListWrapper>
      )}
    </>
  );
};

export default Products;
