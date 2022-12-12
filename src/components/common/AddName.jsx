import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styles from './AddName.module.scss';
import Notification from './Notification';
import Button from '../modules/Button';

const {
  form, formBtns, container, formContainer,
} = styles;

const AddName = (props) => {
  const isError = useSelector((state) => state.ui.notification.isError);

  const {
    handleChange, handleSubmit, name, title,
  } = props;

  return (
    <div className={container}>
      {isError && <Notification />}
      <form onSubmit={handleSubmit}>
        <div className={formContainer}>
          <h2>{title}</h2>
          <div className={form}>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
            <div className={formBtns}>
              <Button type="submit" classname="addBtn" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

AddName.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default AddName;
