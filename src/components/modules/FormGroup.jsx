/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './FormGroup.module.scss';

const FormGroup = (props) => {
  const {
    type, name, handleChange, title, value, options, handleInputFocus, handleInputBlur, classname,
  } = props;

  const { formGroup } = styles;

  const classtype = classname ? `${formGroup} ${classname}` : formGroup;

  return (
    <div className={classtype}>
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
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
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
};

export default FormGroup;
