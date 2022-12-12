import React from 'react';
import { useSelector } from 'react-redux';
import { updateStock } from '../../store/actions/stockActions';
import AddDetails from '../common/AddDetails';

const StockDetails = () => {
  const stocks = useSelector((state) => state.stock.stocks);

  return (<AddDetails items={stocks} updateItem={updateStock} />
  );
};

export default StockDetails;
