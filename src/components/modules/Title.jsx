import React from 'react';
import PropTypes from 'prop-types';
// import { FaProductHunt } from 'react-icons/fa';
// import { AiFillDashboard } from 'react-icons/ai';
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
  iconType: PropTypes.string.isRequired,
};

export default Title;
