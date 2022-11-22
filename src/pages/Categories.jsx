import React, { useState } from 'react';
import { BiCategory } from 'react-icons/bi';
import { MdOutlineAddCircle } from 'react-icons/md';
import { useSelector } from 'react-redux';
import AddCategory from '../components/categories/AddCategory';
import CategoryDetails from '../components/categories/CategoryDetails';
import MainBody from '../components/common/MainBody';

import MainContainer from '../components/common/MainContainer';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import SubContainer from '../components/common/SubContainer';
import TopBar from '../components/common/Topbar';
import styles from './Categories.module.scss';

const { icon } = styles;

const Categories = () => {
  const [show, setShow] = useState(true);
  const changeShow = () => { setShow(true); };
  const categories = useSelector((state) => state.category.fetching);

  const navLinks = [
    {
      id: 1, name: 'New Category', icon: <MdOutlineAddCircle className={icon} />, show: true,
    },
    {
      id: 2, name: 'Categories', icon: <BiCategory className={icon} />, show: false,
    },
  ];

  const [categoriees, setCategoriees] = useState();
  const [id, setId] = useState(0);

  const updatedCategories = (category) => {
    setCategoriees(category);
  };

  const selectId = (categoryId) => {
    setId(categoryId);
  };

  return (
    <MainContainer>
      <Sidebar />
      <SubContainer>
        <TopBar>
          <Navbar navLinks={navLinks} setShow={setShow} titleName="Categories" />
        </TopBar>
        <MainBody>
          {categories && <div>Loading...</div>}
          {!categories && show
          && <AddCategory updatedCategories={updatedCategories} detailsId={id} />}
          {!categories && !show
          && (
            <CategoryDetails
              changeShow={changeShow}
              newCategories={categoriees}
              selectId={selectId}
            />
          )}
        </MainBody>
      </SubContainer>
    </MainContainer>
  );
};

export default Categories;
