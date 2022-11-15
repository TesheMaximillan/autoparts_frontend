/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './MainBody.module.scss';

const MainBody = ({ container, children }) => {
  const { mainBody } = styles;
  return (
    <div className={`${mainBody} ${container}`}>{children}</div>
  );
};

MainBody.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainBody;
