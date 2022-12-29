import React, { useState } from 'react';
import { BiCategory } from 'react-icons/bi';
import { MdOutlineAddCircle } from 'react-icons/md';
import { useSelector } from 'react-redux';
import AddCategory from '../components/categories/AddCategory';
import CategoryDetails from '../components/categories/CategoryDetails';
import Categories from '../components/categories/Categories';
import Loading from '../components/common/Loading';
import MainBody from '../components/common/MainBody';

import MainContainer from '../components/common/MainContainer';
import RightSidebarWrapper from '../components/common/RightSidebarWrapper';
import Sidebar from '../components/common/Sidebar';
import SubContainer from '../components/common/SubContainer';
import TopBar from '../components/common/Topbar';
import Navbar2 from '../components/modules/Navbar2';
import Navbtn from '../components/modules/Navbtn';
import styles from './Category.module.scss';

const { icon } = styles;

const Category = () => {
  const categories = useSelector((state) => state.category.fetching);
  const products = useSelector((state) => state.product.fetching);
  const [active, setActive] = useState('');

  const handleNav = (nav) => {
    setActive(nav);
  };

  const navbtn = [
    {
      id: 1,
      name: 'Add Category',
      icon: <MdOutlineAddCircle className={icon} />,
      handleClick: handleNav,
      current: active,
    },
    {
      id: 3,
      name: 'Cat. Details',
      icon: <BiCategory className={icon} />,
      handleClick: handleNav,
      current: active,
    },
  ];

  const rightSidebar = () => {
    if (active === 'Add Category') return <AddCategory />;
    if (active === 'Cat. Details') return <CategoryDetails />;
    return '';
  };

  return (
    <MainContainer>
      <Sidebar />
      <SubContainer>
        <TopBar>
          <Navbar2 title="Categories" icon={navbtn[1].icon}>
            <Navbtn data={navbtn[0]} />
            <Navbtn data={navbtn[1]} />
          </Navbar2>
        </TopBar>
        <MainBody>
          {(categories || products) && <Loading />}
          {(!categories && !products)
          && (
          <RightSidebarWrapper closeSidebar={handleNav} show={active}>
            {rightSidebar()}
          </RightSidebarWrapper>
          )}
          {(!categories && !products) && <Categories />}
        </MainBody>
      </SubContainer>
    </MainContainer>
  );
};

export default Category;
