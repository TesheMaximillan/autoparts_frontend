import React, { useState } from 'react';
import { MdOutlineAddCircle } from 'react-icons/md';
import { FaProductHunt } from 'react-icons/fa';
import MainBody from '../components/common/MainBody';
import MainContainer from '../components/common/MainContainer';
import Sidebar from '../components/common/Sidebar';
import SubContainer from '../components/common/SubContainer';
import Topbar from '../components/common/Topbar';
import styles from './Product.module.scss';
import LogoutBtn from '../components/common/LogoutBtn';
import AddProduct from '../components/products/AddProduct';
import ProductDetails from '../components/products/ProductDetails';

const Product = () => {
  const {
    header, body, title, nav, icon, navBtn,
  } = styles;
  const [show, setShow] = useState(true);
  const changeShow = () => {
    setShow(true);
  };

  return (
    <MainContainer>
      <Sidebar />
      <SubContainer>
        <Topbar>
          <div className={header}>
            <div className={title}>
              <h1 className={title}>
                <FaProductHunt className={icon} />
                Product
              </h1>
            </div>
            <div className={nav}>
              <ul>
                <li>
                  <button type="button" className={`btn ${navBtn}`} onClick={() => setShow(true)}>
                    <MdOutlineAddCircle className={icon} />
                    New Product
                  </button>
                </li>
                <li>
                  <button type="button" className={`btn ${navBtn}`} onClick={() => setShow(false)}>
                    <FaProductHunt className={icon} />
                    Products
                  </button>
                </li>
              </ul>
              <LogoutBtn icon={icon} />
            </div>
          </div>
        </Topbar>
        <MainBody container={body}>
          {show ? <AddProduct />
            : <ProductDetails changeShow={changeShow} />}
        </MainBody>
      </SubContainer>
    </MainContainer>
  );
};

export default Product;
