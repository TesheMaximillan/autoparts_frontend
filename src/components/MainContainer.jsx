import React from 'react';
import PropTypes from 'prop-types';
import styles from './MainContainer.module.scss';

const MainContainer = ({ children }) => {
  const { mainContainer } = styles;
  return (
    <div className={mainContainer}>{children}</div>
  );
};

MainContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainContainer;
