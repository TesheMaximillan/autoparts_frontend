import React, { useState } from 'react';
import { BiCategory } from 'react-icons/bi';
import { MdOutlineAddCircle } from 'react-icons/md';
import { useSelector } from 'react-redux';
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
  const [active, setActive] = useState('');

  const handleAdd = () => {
    setActive('Add Category');
  };

  const handleDetail = () => {
    setActive('Category Details');
  };

  const closeSidebar = () => {
    setActive('');
  };

  const navbtn = [
    {
      id: 1,
      name: 'Add Category',
      icon: <MdOutlineAddCircle className={icon} />,
      handleClick: handleAdd,
    },
    {
      id: 3,
      name: 'Cat. Details',
      icon: <BiCategory className={icon} />,
      handleClick: handleDetail,
    },
  ];

  const rightSidebar = () => {
    if (active === 'Add Stock') return '<AddCategory />';
    if (active === 'Stock Details') return '<CategoryDetails />';
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
          {categories && <Loading />}
          {!categories
          && (
          <RightSidebarWrapper closeSidebar={closeSidebar} show={active}>
            {rightSidebar()}
          </RightSidebarWrapper>
          )}
          {/* {!categories && <Categories />} */}
        </MainBody>
      </SubContainer>
    </MainContainer>
  );
};

export default Category;
