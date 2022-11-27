import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Alert.module.scss';

const { alert, success, error } = styles;

const Alert = () => {
  const { message, isError } = useSelector((state) => state.ui.alert);
  const status = isError ? error : success;
  return (
    <div className={`${alert} ${status}`}>
      {message}
      Something will happen
    </div>
  );
};

export default Alert;
