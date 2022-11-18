import React from 'react';
import PropTypes from 'prop-types';
import styles from './Topbar.module.scss';

const TopBar = ({ children }) => {
  const { topbar, topSpacer } = styles;
  return (
    <div className={topbar}>
      <div className={topSpacer} />
      {children}
    </div>
  );
};

TopBar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TopBar;
