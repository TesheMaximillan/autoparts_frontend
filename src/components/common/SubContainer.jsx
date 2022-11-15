import React from 'react';
import PropTypes from 'prop-types';
import styles from './SubContainer.module.scss';

const SubContainer = ({ children }) => {
  const { container } = styles;
  return (
    <div className={container}>{children}</div>
  );
};

SubContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SubContainer;
