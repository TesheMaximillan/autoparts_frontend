import React from 'react';
import PropTypes from 'prop-types';
import styles from './InputWrapper.module.scss';

const InputWrapper = ({ children, classname }) => {
  const { container } = styles;
  return (
    <div className={`${container} ${classname}`}>{children}</div>
  );
};

InputWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  classname: PropTypes.string.isRequired,
};

export default InputWrapper;
