import React, { useRef, useState, useEffect } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { useField } from '@unform/core';
import ptBR from 'date-fns/locale/pt-BR';
import PropTypes from 'prop-types';

import 'react-datepicker/dist/react-datepicker.css';

// import { Container } from './styles';

function DatePicker({ name, label, ...rest }) {
  const datepickerRef = useRef(null);
  const { fieldName, registerField, defaultValue } = useField(name);
  const [date, setDate] = useState(defaultValue || null);
  registerLocale('pt-BR', ptBR);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datepickerRef.current,
      path: 'props.selected',
      clearValue: (ref) => {
        ref.clear();
      },
    });
  }, [date, fieldName, registerField]);

  return (
    <div className="date-label">
      {label !== '' ? <label htmlFor={name}>{label}</label> : ''}
      <ReactDatePicker
        ref={datepickerRef}
        selected={date}
        locale="pt-BR"
        onChange={setDate}
        dateFormat="dd/MM/yyyy"
        {...rest}
      />
    </div>
  );
}

export default DatePicker;

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

DatePicker.defaultProps = {
  label: '',
};
