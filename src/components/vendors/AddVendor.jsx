import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { createVendor, deleteVendor, updateVendor } from '../../store/actions/vendorActions';
import { resetUpdateVendor } from '../../store/reducers/vendorReducer';
import styles from './AddVendor.module.scss';
import useAdd from '../hooks/useAdd';
import InputWrapper from '../common/InputWrapper';
import FormGroup from '../modules/FormGroup';
import Button from '../modules/Button';
import Notification from '../common/Notification';
import ListWrapper from '../common/ListWrapper';
import ListDetail from '../common/ListDetail';

const { form, formBtns } = styles;

const AddVendor = ({ updatedVendors, detailsId }) => {
  const isOpen = useSelector((state) => state.ui.notification.isOpen);
  const vendors = useSelector((state) => state.vendor.vendors);
  const vendorUpdate = useSelector((state) => state.vendor.vendorUpdate);

  const addProps = {
    component: 'Vendor',
    itemUpdate: vendorUpdate.update,
    itemData: vendorUpdate.vendor,
    items: vendors,
    updatedItems: updatedVendors,
    detailsId,
    resetUpdateItem: resetUpdateVendor,
    createItem: createVendor,
    updateItem: updateVendor,
    deleteItem: deleteVendor,
  };

  const {
    handleChange, handleSubmit, handleUpdate, handleDelete, name, update, newItems: newVendors,
  } = useAdd(addProps);

  return (
    <>
      <InputWrapper>
        <form onSubmit={handleSubmit}>
          <div className={form}>
            <FormGroup type="text" name="name" value={name} title="Vendor Name" handleChange={handleChange} />
            <div className={formBtns}>
              {!update && (<Button type="submit" classname="addBtn" />)}
              {update && (<Button type="submit" classname="updateBtn" />)}
            </div>
          </div>
        </form>
      </InputWrapper>
      {isOpen && <Notification />}
      <ListWrapper height="AddVendor">
        <ListDetail
          items={newVendors}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          update={update}
          page="main"
        />
      </ListWrapper>
    </>
  );
};

AddVendor.propTypes = {
  updatedVendors: PropTypes.func.isRequired,
  detailsId: PropTypes.number.isRequired,
};

export default AddVendor;
