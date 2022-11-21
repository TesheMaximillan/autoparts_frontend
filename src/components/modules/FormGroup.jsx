/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './FormGroup.module.scss';

const FormGroup = (props) => {
  const {
    type, name, handleChange, title, value, options,
  } = props;

  const { formGroup } = styles;

  return (
    <div className={formGroup}>
      <label htmlFor={name}>
        {title}
        {' '}
        {options ? (
          <select id={name} name={name} value={value} onChange={handleChange} required>
            {options}
          </select>
        ) : (
          <input
            type={type}
            id={name}
            placeholder={title}
            name={name}
            value={value}
            onChange={handleChange}
            required
          />
        )}
      </label>

    </div>
  );
};

FormGroup.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FormGroup;
