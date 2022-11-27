import React from 'react';
import styles from './Loading.module.scss';

const { container, loading } = styles;

const Loading = () => (
  <div className={container}>
    <div className={loading} />
  </div>
);

export default Loading;
