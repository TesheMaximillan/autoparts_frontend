import React from 'react';
import { RiLogoutCircleFill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logoutUser } from '../store/actions/userActions';
import { logout } from '../store/reducers/userReducer';

const LogoutBtn = ({ icon }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
    localStorage.removeItem('LOGGED_IN');
    dispatch(logout());
    dispatch(logoutUser());
  };

  return (
    <button type="button" className="btn btn__logout" onClick={handleLogout}>
      <RiLogoutCircleFill className={icon} />
      Logout
    </button>
  );
};

LogoutBtn.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default LogoutBtn;
