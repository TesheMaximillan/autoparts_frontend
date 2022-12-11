import React from 'react';
import PropTypes from 'prop-types';
import styles from './Navbar2.module.scss';
import LogoutBtn from './LogoutBtn';

const { container, containerNav, header } = styles;

const Navbar2 = ({ children, title, icon }) => (
  <div className={container}>
    <div className={header}>
      <h1>
        {icon}
        {title}
      </h1>
      <LogoutBtn />
    </div>
    <div className={containerNav}>
      {children}
    </div>
  </div>
);

Navbar2.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

export default Navbar2;
