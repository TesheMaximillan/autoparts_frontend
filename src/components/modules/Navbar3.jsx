import React from 'react';
import PropTypes from 'prop-types';
import LogoutBtn from './LogoutBtn';
import styles from './Navbar2.module.scss';
const { container, containerNav, header } = styles;
const Navbar3 = ({children, title, icon }) => (
  <div className='flex flex-col'>
  <div className={container}>
    <div className={header}>
      <div className="flex text-[24px] text-white items-center gap-3" >
         {icon}  
        {title}
       
      </div>
      <LogoutBtn />
    </div>
    </div>
    <div className='flex flex-col mt-24'>
      {children}
    </div>
  </div>
);

Navbar3.propTypes = {
//   children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
//   icon: PropTypes.node.isRequired,
};
export default Navbar3;
