import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

export default function Input({ name, label, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue = '', registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <>
      <div className="input-label">
        {label !== '' ? <label htmlFor={name}>{label}</label> : ''}
        <input
          ref={inputRef}
          defaultValue={defaultValue}
          className={error ? 'has-error' : ''}
          {...rest}
        />
      </div>
      {error && <span className="error">{error}</span>}
    </>
  );
}

Input.defaultProps = {
  label: '',
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};
