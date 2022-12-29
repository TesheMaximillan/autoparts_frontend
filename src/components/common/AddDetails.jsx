/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import styles from './AddDetails.module.scss';
import Notification from './Notification';

const {
  container, actions, ok, cancel, updateField,
} = styles;

const AddDetails = ({ items, updateItem }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const isError = useSelector((state) => state.ui.notification.isError);
  const [id, setId] = useState(0);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setName(e.target.value.toLowerCase().trim());
  };

  const handleClick = (id, name) => {
    setOpen(true);
    setId(id);
    setName(name);
  };

  const handleOk = () => {
    items.forEach((stock) => {
      if (stock.id === id) setName(stock.name);
    });

    dispatch(updateItem({ id, name }));
    setOpen(false);
  };

  return (
    <div className={container}>
      <h2>Stock Details</h2>
      {isError && <Notification />}
      <ul>
        {items.map((item) => (
          <>
            {(!open || id !== item.id) && (
            <li key={item.id}>
              <button type="button" onClick={() => handleClick(item.id, item.name)}>
                {item.name}
              </button>
            </li>
            )}
            {open && id === item.id && (
            <li key={item.name}>
              <div className={updateField}>
                <input type="text" name="name" value={name} onChange={handleChange} />
                <div className={actions}>
                  <button type="button" className={ok} onClick={handleOk}>
                    <BsFillCheckCircleFill />
                  </button>
                  <button type="button" className={cancel} onClick={handleClose}>
                    <AiFillCloseCircle />
                  </button>
                </div>
              </div>
            </li>
            )}
          </>
        ))}
      </ul>
    </div>
  );
};

AddDetails.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateItem: PropTypes.func.isRequired,
};

export default AddDetails;
