/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
import { IoAddCircle } from 'react-icons/io5';
import { ImPencil2 } from 'react-icons/im';
import styles from './Button.module.scss';

const Button = ({ type, classname }) => {
  const { addBtn, updateBtn } = styles;

  const btnType = classname === 'addBtn' ? addBtn : updateBtn;
  return (
    <button type={type === 'submit' ? 'submit' : 'button'} className={btnType}>
      {classname === 'addBtn' ? <IoAddCircle /> : <ImPencil2 />}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  classname: PropTypes.string.isRequired,
};

export default Button;
