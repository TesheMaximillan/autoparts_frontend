import React from 'react';
import { AiFillDashboard } from 'react-icons/ai';
import MainContainer from '../components/common/MainContainer';
import Sidebar from '../components/common/Sidebar';
import SubContainer from '../components/common/SubContainer';
import Topbar from '../components/common/Topbar';
import MainBody from '../components/common/MainBody';
import styles from './Dashboard.module.scss';
import Title from '../components/modules/Title';

const Dashboard = () => {
  const { icon, header } = styles;

  const iconType = <AiFillDashboard className={icon} />;

  return (
    <MainContainer>
      <Sidebar />
      <SubContainer>
        <Topbar>
          <div className={header}>
            <Title titleName="Dashboard" iconType={iconType} />
          </div>
        </Topbar>
        <MainBody>
          Dashboard Body
        </MainBody>
      </SubContainer>
    </MainContainer>
  );
};

export default Dashboard;
