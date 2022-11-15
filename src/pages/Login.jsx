/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import Notification from '../components/common/Notification';
import { loginUser } from '../store/actions/userActions';
import styles from './Login.module.scss';

const Login = () => {
  const userRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const loggedIn = sessionStorage.getItem('LOGGED_IN');
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({ username: '', password: '' });
  const notification = useSelector((state) => state.ui.notification);

  const { username, password } = user;
  const {
    container, containerMain, logo, message, side, sideTitle, loadiing,
  } = styles;

  if (loggedIn) {
    navigate('/dashboard');
  }

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(loginUser(user))
      .unwrap()
      .then(() => {
        sessionStorage.setItem('LOGGED_IN', user.username);
      })
      .catch(() => { setLoading(false); });
    setUser({
      username: '',
      password: '',
    });
  };

  return (
    <>
      {isLoggedIn && <Navigate to="/dashboard" replace />}
      <section className={container}>
        <div className={logo} />
        <div className={containerMain}>
          <form onSubmit={onFormSubmit}>
            <input
              type="text"
              name="username"
              value={username}
              onChange={onInputChange}
              ref={userRef}
              placeholder="Username"
              required
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={onInputChange}
              placeholder="Password"
              required
              min={6}
            />
            <button className="btn btn__default" type="submit">
              Login
            </button>
            {loading && (<p className={loadiing}>Loading ...</p>)}
            <p className={message}>
              You forgot your password?
              {' '}
              <br />
              please contact
              {' '}
              <span>Ato Teshome</span>
              {' '}
              +251911017684
            </p>
            {notification.isOpen && (
            <Notification
              message={notification.message}
              error={notification.isError}
            />
            )}
          </form>
          <div className={side}>
            <h1 className={sideTitle}>Stock Management System</h1>
            <p>
              This stock management system is used to manage
              your stock, sales, purchases, and transfers.
              <br />
              <span>Enjoy it!</span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
