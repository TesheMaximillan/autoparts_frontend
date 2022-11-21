/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './Navbar.module.scss';
import LogoutBtn from '../modules/LogoutBtn';
import Title from '../modules/Title';

const Navbar = ({ navLinks, setShow, titleName }) => {
  const {
    nav, navBtn, icon, header,
  } = styles;
  return (
    <div className={header}>
      <Title titleName={titleName} iconType={navLinks[1].icon} />
      {navLinks.length > 0 && (
      <div className={nav}>
        <ul>
          {navLinks.map((link) => (
            <li key={link.id}>
              <button type="button" className={`btn ${navBtn}`} onClick={() => setShow(link.show)}>
                {link.icon}
                {link.name}
              </button>
            </li>
          ))}
        </ul>
        <LogoutBtn icon={icon} />
      </div>
      )}
    </div>
  );
};

Navbar.propTypes = {
  navLinks: PropTypes.arrayOf(PropTypes.object).isRequired,
  setShow: PropTypes.func.isRequired,
  titleName: PropTypes.string.isRequired,
};

export default Navbar;
