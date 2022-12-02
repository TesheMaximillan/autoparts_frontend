/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { createCustomer, deleteCustomer, updateCustomer } from '../../store/actions/customerActions';
import { resetUpdateCustomer } from '../../store/reducers/customerReducer';
import InputWrapper from '../common/InputWrapper';
import ListDetail from '../common/ListDetail';
import ListWrapper from '../common/ListWrapper';
import Notification from '../common/Notification';
import Button from '../modules/Button';
import FormGroup from '../modules/FormGroup';
import useAdd from '../hooks/useAdd';
import styles from './AddCustomer.module.scss';

const { form, formBtns } = styles;

const AddCustomer = ({ updatedCustomers, detailsId }) => {
  const isOpen = useSelector((state) => state.ui.notification.isOpen);
  const customers = useSelector((state) => state.customer.customers);
  const customerUpdate = useSelector((state) => state.customer.customerUpdate);

  const addProps = {
    component: 'Customer',
    itemUpdate: customerUpdate.update,
    itemData: customerUpdate.customer,
    items: customers,
    updatedItems: updatedCustomers,
    detailsId,
    resetUpdateItem: resetUpdateCustomer,
    createItem: createCustomer,
    updateItem: updateCustomer,
    deleteItem: deleteCustomer,
  };

  const {
    handleChange, handleSubmit, handleUpdate, handleDelete, name, update, newItems: newCustomers,
  } = useAdd(addProps);

  return (
    <>
      <InputWrapper>
        <form onSubmit={handleSubmit}>
          <div className={form}>
            <FormGroup type="text" name="name" value={name} title="Customer Name" handleChange={handleChange} />
            <div className={formBtns}>
              {!update && (<Button type="submit" classname="addBtn" />)}
              {update && (<Button type="submit" classname="updateBtn" />)}
            </div>
          </div>
        </form>
      </InputWrapper>
      {isOpen && <Notification />}
      <ListWrapper height="AddCustomer">
        <ListDetail
          items={newCustomers}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          update={update}
          page="main"
        />
      </ListWrapper>
    </>
  );
};

AddCustomer.propTypes = {
  updatedCustomers: PropTypes.func.isRequired,
  detailsId: PropTypes.number.isRequired,
};

export default AddCustomer;
