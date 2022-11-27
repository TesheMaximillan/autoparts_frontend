/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteCustomer } from '../../store/actions/customerActions';
import { setUpdateCustomer } from '../../store/reducers/customerReducer';
import useDetails from '../hooks/useDetails';
import styles from './CustomerDetails.module.scss';
import InputWrapper from '../common/InputWrapper';
import SearchInput from '../modules/SearchInput';
import ListWrapper from '../common/ListWrapper';
import ListDetail from '../common/ListDetail';

const { customerList } = styles;

const CustomerDetails = (props) => {
  const update = useSelector((state) => state.customer.customerUpdate.update);
  const loading = useSelector((state) => state.customer.fetching);

  const { changeShow, newCustomers, selectId } = props;

  const addProps = {
    changeShow,
    selectId,
    newItems: newCustomers,
    setUpdateItem: setUpdateCustomer,
    deleteItem: deleteCustomer,
  };

  const {
    handleSearch, handleUpdate, handleDelete, filteredItems: filteredCustomers,
  } = useDetails(addProps);

  return (
    <>
      <InputWrapper>
        <SearchInput handleSearch={handleSearch} type="any" title="Search" />
      </InputWrapper>
      {loading ? <h1>Loading...</h1> : (
        <ListWrapper height="details">
          <div className={customerList}>
            <ListDetail
              items={filteredCustomers}
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

CustomerDetails.propTypes = {
  changeShow: PropTypes.func.isRequired,
  newCustomers: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectId: PropTypes.func.isRequired,
};

export default CustomerDetails;
