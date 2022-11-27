/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './VendorDetails.module.scss';
import { setUpdateVendor } from '../../store/reducers/vendorReducer';
import { deleteVendor } from '../../store/actions/vendorActions';
import useDetails from '../hooks/useDetails';
import InputWrapper from '../common/InputWrapper';
import SearchInput from '../modules/SearchInput';
import ListWrapper from '../common/ListWrapper';
import ListDetail from '../common/ListDetail';

const { vendorList } = styles;

const VendorDetails = (props) => {
  const update = useSelector((state) => state.vendor.vendorUpdate.update);
  const loading = useSelector((state) => state.vendor.fetching);

  const { changeShow, newVendors, selectId } = props;

  const addProps = {
    changeShow,
    selectId,
    newItems: newVendors,
    setUpdateItem: setUpdateVendor,
    deleteItem: deleteVendor,
  };

  const {
    handleSearch, handleUpdate, handleDelete, filteredItems: filteredVendors,
  } = useDetails(addProps);

  return (
    <>
      <InputWrapper>
        <SearchInput handleSearch={handleSearch} type="any" title="Search" />
      </InputWrapper>
      {loading ? <h1>Loading...</h1> : (
        <ListWrapper height="details">
          <div className={vendorList}>
            <ListDetail
              items={filteredVendors}
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

VendorDetails.propTypes = {
  changeShow: PropTypes.func.isRequired,
  newVendors: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectId: PropTypes.func.isRequired,
};

export default VendorDetails;
