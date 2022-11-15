/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Notification.module.scss';

const { notification, success, errors } = styles;

const Notification = () => {
  const { message, isError } = useSelector((state) => state.ui.notification);
  const status = isError ? errors : success;

  return (
    <>
      <div className={`${notification} ${status}`}>
        {Object.keys(message).map((key) => (
          <p key={key}>
            {`${key} ${message[key]}`}
          </p>
        ))}
      </div>
    </>
  );
};

export default Notification;
