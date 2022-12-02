import React from 'react';
import PropTypes from 'prop-types';
import styles from './Title.module.scss';

const Title = ({ titleName, iconType }) => {
  const { title } = styles;
  return (
    <div className={title}>
      <h1 className={title}>
        {iconType}
        {titleName}
      </h1>
    </div>
  );
};

Title.propTypes = {
  titleName: PropTypes.string.isRequired,
  iconType: PropTypes.node.isRequired,
};

export default Title;
