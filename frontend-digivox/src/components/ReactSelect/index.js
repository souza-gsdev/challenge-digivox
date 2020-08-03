import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { useField } from '@unform/core';

function ReactSelect({ name, label, options, ...rest }) {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'state.value',
      getValue: (ref) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  function getDefault() {
    if (options.length > 0) {
      if (Array.isArray(defaultValue)) {
        const arraySample = [];
        defaultValue.forEach((sample) => {
          arraySample.push({
            value: sample,
            label: options.filter((value) => {
              return value.value === sample;
            })[0].label,
          });
        });

        return arraySample;
      }
      return (
        defaultValue && options.find((option) => option.value === defaultValue)
      );
    }
    return defaultValue;
  }

  return (
    <>
      <div className="input-label">
        {label !== '' ? <label htmlFor={name}>{label}</label> : ''}
        <Select
          defaultValue={getDefault()}
          ref={selectRef}
          classNamePrefix="react-select"
          options={options}
          {...rest}
        />
      </div>
      {error && <span className="error">{error}</span>}
    </>
  );
}

ReactSelect.defaultProps = {
  label: '',
  options: [],
};

ReactSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.any, PropTypes.string])
  ),
};

export default ReactSelect;
