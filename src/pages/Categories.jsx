import React, { useState } from 'react';
import { BiCategory } from 'react-icons/bi';
import { MdOutlineAddCircle } from 'react-icons/md';
import { useSelector } from 'react-redux';
import MainBody from '../components/common/MainBody';

import MainContainer from '../components/common/MainContainer';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import SubContainer from '../components/common/SubContainer';
import TopBar from '../components/common/Topbar';
import styles from './Categories.module.scss';

const Categories = () => {
  const { icon } = styles;
  const [show, setShow] = useState(true);
  // const changeShow = () => { setShow(true); };
  const categories = useSelector((state) => state.category.fetching);

  const navLinks = [
    {
      id: 1, name: 'New Category', icon: <MdOutlineAddCircle className={icon} />, show: true,
    },
    {
      id: 2, name: 'Categories', icon: <BiCategory className={icon} />, show: false,
    },
  ];

  return (
    <MainContainer>
      <Sidebar />
      <SubContainer>
        <TopBar>
          <Navbar navLinks={navLinks} setShow={setShow} titleName="Categories" />
        </TopBar>
        <MainBody>
          {categories && <div>Loading...</div>}
          {!categories && show && <div>ADD Categories</div>}
          {!categories && !show && <div>Categories</div>}
        </MainBody>
      </SubContainer>
    </MainContainer>
  );
};

export default Categories;
