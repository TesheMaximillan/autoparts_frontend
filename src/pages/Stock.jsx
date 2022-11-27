import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaStore } from 'react-icons/fa';
import { MdOutlineAddCircle } from 'react-icons/md';

import styles from './Stock.module.scss';
import MainContainer from '../components/common/MainContainer';
import Sidebar from '../components/common/Sidebar';
import SubContainer from '../components/common/SubContainer';
import TopBar from '../components/common/Topbar';
import Navbar from '../components/common/Navbar';
import MainBody from '../components/common/MainBody';
import AddStock from '../components/stocks/AddStock';
import StockDetails from '../components/stocks/StockDetails';
import Loading from '../components/common/Loading';

const { icon } = styles;

const Stock = () => {
  const [show, setShow] = useState(true);
  const changeShow = () => { setShow(true); };
  const stocks = useSelector((state) => state.stock.fetching);

  const navLinks = [
    {
      id: 1, name: 'New Stock', icon: <MdOutlineAddCircle className={icon} />, show: true,
    },
    {
      id: 2, name: 'Stocks', icon: <FaStore className={icon} />, show: false,
    },
  ];

  const [stockks, setStockks] = useState();
  const [id, setId] = useState(0);

  const updatedStocks = (stock) => {
    setStockks(stock);
  };

  const selectId = (stockId) => {
    setId(stockId);
  };

  return (
    <MainContainer>
      <Sidebar />
      <SubContainer>
        <TopBar>
          <Navbar navLinks={navLinks} setShow={setShow} titleName="Stock" />
        </TopBar>
        <MainBody>
          {stocks && <Loading />}
          {!stocks && show
          && <AddStock updatedStocks={updatedStocks} detailsId={id} />}
          {!stocks && !show
          && (
            <StockDetails
              changeShow={changeShow}
              newStocks={stockks}
              selectId={selectId}
            />
          )}
        </MainBody>
      </SubContainer>
    </MainContainer>
  );
};

export default Stock;
