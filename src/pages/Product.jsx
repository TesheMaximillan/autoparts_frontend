import React, { useState } from 'react';
import { MdOutlineAddCircle } from 'react-icons/md';
import { FaProductHunt } from 'react-icons/fa';
import MainBody from '../components/common/MainBody';
import MainContainer from '../components/common/MainContainer';
import Sidebar from '../components/common/Sidebar';
import SubContainer from '../components/common/SubContainer';
import Topbar from '../components/common/Topbar';
import styles from './Product.module.scss';
import Navbar2 from '../components/modules/Navbar2';
import Navbtn from '../components/modules/Navbtn';
import RightSidebarWrapper from '../components/common/RightSidebarWrapper';
import Products from '../components/products/Products';
import AddProduct from '../components/products/AddProduct';

const { icon } = styles;

const Product = () => {
  const [active, setActive] = useState('');

  const handleNav = (nav) => {
    setActive(nav);
  };

  const navbtn = [
    {
      id: 1,
      name: 'New Product',
      icon: <MdOutlineAddCircle className={icon} />,
      handleClick: handleNav,
      current: active,
    },
    {
      id: 2,
      name: 'Product Det.',
      icon: <FaProductHunt className={icon} />,
      handleClick: handleNav,
      current: active,
    },
  ];

  const rightSidebar = () => {
    if (active === 'New Product') return <AddProduct />;
    if (active === 'Product Det.') return '';
    return '';
  };

  return (
    <MainContainer>
      <Sidebar />
      <SubContainer>
        <Topbar>
          <Navbar2 title="Products" icon={navbtn[1].icon}>
            <Navbtn data={navbtn[0]} />
            <Navbtn data={navbtn[1]} />
          </Navbar2>
        </Topbar>
        <MainBody>
          <RightSidebarWrapper closeSidebar={handleNav} show={active}>
            {rightSidebar()}
          </RightSidebarWrapper>
          <Products />
        </MainBody>
      </SubContainer>
    </MainContainer>
  );
};

export default Product;
