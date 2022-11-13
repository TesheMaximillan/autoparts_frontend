import React from 'react';
import MainContainer from '../components/MainContainer';
import Sidebar from '../components/Sidebar';
import SubContainer from '../components/SubContainer';
import Topbar from '../components/Topbar';
import MainBody from '../components/MainBody';
import styles from './Dashboard.module.scss';

const Dashboard = () => {
  const { header, body, title } = styles;
  return (
    <MainContainer>
      <Sidebar />
      <SubContainer>
        <Topbar container={header}>
          <h1 className={title}>Dashboard</h1>
        </Topbar>
        <MainBody container={body}>
          <h2>body</h2>
        </MainBody>
      </SubContainer>
    </MainContainer>
  );
};

export default Dashboard;
