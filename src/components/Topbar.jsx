import React from 'react';
import PropTypes from 'prop-types';
import styles from './Topbar.module.scss';

const TopBar = ({ container, children }) => {
  const { topbar } = styles;
  return (
    <div className={`${topbar} ${container}`}>{children}</div>
  );
};

TopBar.propTypes = {
  children: PropTypes.node.isRequired,
  container: PropTypes.string.isRequired,
};

export default TopBar;
