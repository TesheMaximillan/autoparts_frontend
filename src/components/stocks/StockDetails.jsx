/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styles from './StockDetails.module.scss';
import { setUpdateStock } from '../../store/reducers/stockReducer';
import { deleteStock } from '../../store/actions/stockActions';
import useDetails from '../hooks/useDetails';
import InputWrapper from '../common/InputWrapper';
import SearchInput from '../modules/SearchInput';
import ListWrapper from '../common/ListWrapper';
import ListDetail from '../common/ListDetail';

const { stockList } = styles;

const StockDetails = (props) => {
  const update = useSelector((state) => state.stock.stockUpdate.update);
  const loading = useSelector((state) => state.stock.fetching);

  const { changeShow, newStocks, selectId } = props;

  const addProps = {
    changeShow,
    selectId,
    newItems: newStocks,
    setUpdateItem: setUpdateStock,
    deleteItem: deleteStock,
  };

  const {
    handleSearch, handleUpdate, handleDelete, filteredItems: filteredStocks,
  } = useDetails(addProps);

  return (
    <>
      <InputWrapper>
        <SearchInput handleSearch={handleSearch} type="any" title="Search" />
      </InputWrapper>
      {loading ? <h1>Loading...</h1> : (
        <ListWrapper height="details">
          <div className={stockList}>
            <ListDetail
              items={filteredStocks}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              update={update}
            />
          </div>
        </ListWrapper>
      )}
    </>
  );
};

StockDetails.propTypes = {
  changeShow: PropTypes.func.isRequired,
  newStocks: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectId: PropTypes.func.isRequired,
};

export default StockDetails;
