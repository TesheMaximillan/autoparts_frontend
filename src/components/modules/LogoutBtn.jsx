import React from 'react';
import { FaUserSlash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../store/actions/userActions';
import { logout } from '../../store/reducers/userReducer';
import styles from './LogoutBtn.module.scss';

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logoutBtn, container } = styles;

  const handleLogout = () => {
    navigate('/');
    sessionStorage.removeItem('LOGGED_IN');
    dispatch(logout());
    dispatch(logoutUser());
  };

  return (
    <div className={container}>
      <FaUserSlash className={logoutBtn} onClick={handleLogout} />
    </div>
  );
};

export default LogoutBtn;
