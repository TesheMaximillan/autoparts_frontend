/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import InputWrapper from '../common/InputWrapper';
import ListWrapper from '../common/ListWrapper';
import Loading from '../common/Loading';
import FormGroup from '../modules/FormGroup';
import SearchInput from '../modules/SearchInput';
import ListProduct from '../products/ListProduct';
import styles from './Categories.module.scss';

const { wrapper, dropdown } = styles;

const Categories = () => {
  const categories = useSelector((state) => state.category.categories);
  const products = useSelector((state) => state.product.products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productts, setProductts] = useState([]);
  const [initailCategory, setInitalCategory] = useState(0);

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
    quantity: parseInt(item.quantity, 10),
  }));

  const productsByCategory = productss.filter((product) => product.category === categories[0].id);

  const selectCategory = (id) => {
    const productsByCategory = productss.filter((product) => product.category === id);
    setFilteredProducts(productsByCategory);
    setProductts(productsByCategory);
  };

  const handleProductSearch = (e) => {
    const filtered = e.target.value.toLowerCase().trim();
    if (productts.length === 0) {
      setProductts(productsByCategory);
    }
    setFilteredProducts(productts.filter(
      (item) => item.name.toLowerCase().trim().includes(filtered)
        || item.partNumber.toLowerCase().trim().includes(filtered)
        || item.brand.toLowerCase().trim().includes(filtered)
        || item.status.toLowerCase().trim().includes(filtered),
    ));
  };

  const handleChange = (e) => {
    const { value } = e.target;
    const category = categories.find((item) => item.id === parseInt(value, 10));
    setInitalCategory(category.id);
    selectCategory(category.id);
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
    <>
      <InputWrapper>
        <div className={wrapper}>
          <div className={dropdown}>
            <FormGroup type="select" name="stock" value={initailCategory || categories[0].id} title="Category" handleChange={handleChange} options={categoryOptions} classname="dropdown" />
          </div>
          <SearchInput handleSearch={handleProductSearch} type="any" title="Search" />
        </div>
      </InputWrapper>
      <ListWrapper height="details">
        <div className={wrapper}>
          <ListProduct
            products={filteredProducts.length ? filteredProducts : productsByCategory}
            showCategory={false}
          />
        </div>
      </ListWrapper>
    </>
  );
};

export default Categories;
