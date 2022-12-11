import React from 'react';
import PropTypes from 'prop-types';
import styles from './Navbtn.module.scss';

const { btn, active } = styles;

const Navbtn = ({ data }) => {
  const {
    name, icon, handleClick, current,
  } = data;

  const btnClass = current === name ? `${btn} ${active}` : btn;

  return (
    <button type="button" className={btnClass} onClick={handleClick}>
      {icon}
      {name}
    </button>
  );
};

Navbtn.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    handleClick: PropTypes.func.isRequired,
    current: PropTypes.string.isRequired,
  }).isRequired,
};

export default Navbtn;
