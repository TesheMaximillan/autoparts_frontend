import React from 'react';
import PropTypes from 'prop-types';
import styles from './InputWrapper.module.scss';

const InputWrapper = ({ children }) => {
  const { container } = styles;
  return (
    <div className={container}>{children}</div>
  );
};

InputWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default InputWrapper;
