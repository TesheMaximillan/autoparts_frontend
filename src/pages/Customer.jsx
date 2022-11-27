import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { MdOutlineAddCircle } from 'react-icons/md';
import { ImUserTie } from 'react-icons/im';
import styles from './Customer.module.scss';
import MainContainer from '../components/common/MainContainer';
import Sidebar from '../components/common/Sidebar';
import TopBar from '../components/common/Topbar';
import Navbar from '../components/common/Navbar';
import MainBody from '../components/common/MainBody';
import SubContainer from '../components/common/SubContainer';
import AddCustomer from '../components/customers/AddCustomer';
import CustomerDetails from '../components/customers/CustomerDetails';
import Loading from '../components/common/Loading';

const { icon } = styles;

const Customer = () => {
  const [show, setShow] = useState(true);
  const changeShow = () => { setShow(true); };
  const customers = useSelector((state) => state.customer.fetching);

  const navLinks = [
    {
      id: 1, name: 'New Customer', icon: <MdOutlineAddCircle className={icon} />, show: true,
    },
    {
      id: 2, name: 'Customers', icon: <ImUserTie className={icon} />, show: false,
    },
  ];

  const [customerrs, setCustomerrs] = useState();
  const [id, setId] = useState(0);

  const updatedCustomers = (customer) => {
    setCustomerrs(customer);
  };

  const selectId = (customerId) => {
    setId(customerId);
  };

  return (
    <MainContainer>
      <Sidebar />
      <SubContainer>
        <TopBar>
          <Navbar navLinks={navLinks} setShow={setShow} titleName="Customers" />
        </TopBar>
        <MainBody>
          {customers && <Loading />}
          {!customers && show
          && <AddCustomer updatedCustomers={updatedCustomers} detailsId={id} />}
          {!customers && !show
          && (
            <CustomerDetails
              changeShow={changeShow}
              newCustomers={customerrs}
              selectId={selectId}
            />
          )}
        </MainBody>
      </SubContainer>
    </MainContainer>
  );
};

export default Customer;
