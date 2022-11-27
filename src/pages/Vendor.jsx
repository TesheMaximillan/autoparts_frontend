import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { MdOutlineAddCircle } from 'react-icons/md';
import { ImUserTie } from 'react-icons/im';
import styles from './Vendor.module.scss';
import AddVendor from '../components/vendors/AddVendor';
import MainContainer from '../components/common/MainContainer';
import Sidebar from '../components/common/Sidebar';
import SubContainer from '../components/common/SubContainer';
import TopBar from '../components/common/Topbar';
import Navbar from '../components/common/Navbar';
import MainBody from '../components/common/MainBody';
import VendorDetails from '../components/vendors/VendorDetails';
import Loading from '../components/common/Loading';

const { icon } = styles;

const Vendor = () => {
  const [show, setShow] = useState(true);
  const changeShow = () => { setShow(true); };
  const vendors = useSelector((state) => state.vendor.fetching);

  const navLinks = [
    {
      id: 1, name: 'New Vendor', icon: <MdOutlineAddCircle className={icon} />, show: true,
    },
    {
      id: 2, name: 'Vendors', icon: <ImUserTie className={icon} />, show: false,
    },
  ];

  const [vendorrs, setVendorrs] = useState();
  const [id, setId] = useState(0);

  const updatedVendors = (vendor) => {
    setVendorrs(vendor);
  };

  const selectId = (vendorId) => {
    setId(vendorId);
  };

  return (
    <MainContainer>
      <Sidebar />
      <SubContainer>
        <TopBar>
          <Navbar navLinks={navLinks} setShow={setShow} titleName="Vendors" />
        </TopBar>
        <MainBody>
          {vendors && <Loading />}
          {!vendors && show
          && <AddVendor updatedVendors={updatedVendors} detailsId={id} />}
          {!vendors && !show
          && (
            <VendorDetails
              changeShow={changeShow}
              newVendors={vendorrs}
              selectId={selectId}
            />
          )}
        </MainBody>
      </SubContainer>
    </MainContainer>
  );
};

export default Vendor;
