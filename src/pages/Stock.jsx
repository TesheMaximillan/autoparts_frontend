import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { IoStorefrontSharp } from 'react-icons/io5';
import { RiTruckFill } from 'react-icons/ri';
import MainContainer from '../components/common/MainContainer';
import Sidebar from '../components/common/Sidebar';
import SubContainer from '../components/common/SubContainer';
import TopBar from '../components/common/Topbar';
import MainBody from '../components/common/MainBody';
import StockDetails from '../components/stocks/StockDetails';
import Loading from '../components/common/Loading';
import TransferStock from '../components/stocks/TransferStock';
import Navbar2 from '../components/modules/Navbar2';
import styles from './Stock.module.scss';
import Navbtn from '../components/modules/Navbtn';
import RightSidebarWrapper from '../components/common/RightSidebarWrapper';

const { icon } = styles;

const Stock = () => {
  const stocks = useSelector((state) => state.stock.fetching);
  const [active, setActive] = useState('');

  const handleAdd = () => {
    setActive('Add Stock');
  };

  const handleTransfer = () => {
    setActive('Transfer');
  };

  const closeSidebar = () => {
    setActive('');
  };

  const navbtn = [
    {
      id: 1,
      name: 'Add Stock',
      icon: <IoStorefrontSharp className={icon} />,
      handleClick: handleAdd,
    },
    {
      id: 2,
      name: 'Transfer',
      icon: <RiTruckFill className={icon} />,
      handleClick: handleTransfer,
    },
  ];

  const rightSidebar = active === 'Add Stock' ? '' : <TransferStock />;

  return (
    <MainContainer>
      <Sidebar />
      <SubContainer>
        <TopBar>
          <Navbar2 title="Stocks" icon={navbtn[0].icon}>
            <Navbtn data={navbtn[0]} />
            <Navbtn data={navbtn[1]} />
          </Navbar2>
        </TopBar>
        <MainBody>
          {stocks && <Loading />}
          {!stocks
          && (
          <RightSidebarWrapper closeSidebar={closeSidebar} show={active}>
            {rightSidebar}
          </RightSidebarWrapper>
          )}
          {!stocks && <StockDetails />}
        </MainBody>
      </SubContainer>
    </MainContainer>
  );
};

export default Stock;
