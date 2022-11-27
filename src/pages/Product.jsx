import React, { useState } from 'react';
import { MdOutlineAddCircle } from 'react-icons/md';
import { FaProductHunt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import MainBody from '../components/common/MainBody';
import MainContainer from '../components/common/MainContainer';
import Sidebar from '../components/common/Sidebar';
import SubContainer from '../components/common/SubContainer';
import Topbar from '../components/common/Topbar';
import AddProduct from '../components/products/AddProduct';
import ProductDetails from '../components/products/ProductDetails';
import Navbar from '../components/common/Navbar';
import styles from './Product.module.scss';
import Loading from '../components/common/Loading';

const Product = () => {
  const [show, setShow] = useState(true);
  const changeShow = () => { setShow(true); };
  const { icon } = styles;
  const products = useSelector((state) => state.product.fetching);
  const categories = useSelector((state) => state.category.fetching);
  const stocks = useSelector((state) => state.stock.fetching);
  const navLinks = [
    {
      id: 1, name: 'New Product', icon: <MdOutlineAddCircle className={icon} />, show: true,
    },
    {
      id: 2, name: 'Products', icon: <FaProductHunt className={icon} />, show: false,
    },
  ];
  const [productts, setProductts] = useState();
  const [id, setId] = useState(0);
  const [storeProducts, setStoreProducts] = useState();

  const loading = products || categories || stocks;

  const updatedProducts = (product) => {
    setProductts(product);
  };

  const selectId = (productId) => {
    setId(productId);
  };

  const storeProductsManagement = (products) => {
    setStoreProducts(products);
  };

  return (
    <MainContainer>
      <Sidebar />
      <SubContainer>
        <Topbar>
          <Navbar navLinks={navLinks} setShow={setShow} titleName="Product" iconType={navLinks[1].icon} />
        </Topbar>
        <MainBody>
          {loading && <Loading />}
          {!loading && show
          && (
          <AddProduct
            updatedProducts={updatedProducts}
            detailsId={id}
            setStoreProducts={storeProductsManagement}
            storeProducts={storeProducts}
          />
          )}
          {!loading && !show
          && (
          <ProductDetails
            changeShow={changeShow}
            newProducts={productts}
            selectId={selectId}
            setStoreProducts={storeProductsManagement}
            storeProducts={storeProducts}
          />
          )}
        </MainBody>
      </SubContainer>
    </MainContainer>
  );
};

export default Product;
