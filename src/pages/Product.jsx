import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineAddCircle } from 'react-icons/md';
import { FaProductHunt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import MainBody from '../components/MainBody';
import MainContainer from '../components/MainContainer';
import Sidebar from '../components/Sidebar';
import SubContainer from '../components/SubContainer';
import Topbar from '../components/Topbar';
import styles from './Product.module.scss';
import LogoutBtn from '../components/LogoutBtn';
import AddProduct from '../components/AddProduct';
import Notification from '../components/Notification';

const Product = () => {
  const notification = useSelector((state) => state.ui.notification);
  const {
    header, body, title, nav, icon,
  } = styles;
  return (
    <MainContainer>
      <Sidebar />
      <SubContainer>
        <Topbar container={header}>
          <h1 className={title}>Product</h1>
          <div className={nav}>
            <ul>
              <li>
                <Link to="/dashboard/products">
                  <MdOutlineAddCircle className={icon} />
                  {' '}
                  New Product
                </Link>
              </li>
              <li>
                <Link to="/dashboard/products/detail">
                  <FaProductHunt className={icon} />
                  Products
                </Link>
              </li>
            </ul>
            <LogoutBtn icon={icon} />
          </div>
        </Topbar>
        <MainBody container={body}>
          <AddProduct />
          {notification.isOpen && (
            <Notification
              message={notification.message}
              error={notification.isError}
            />
          )}
        </MainBody>
      </SubContainer>
    </MainContainer>
  );
};

export default Product;
