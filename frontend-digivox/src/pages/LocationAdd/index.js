import React, { useRef, useState, useEffect } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { getValueLocation } from '../../util/func';

import api from '../../services/api';

import DatePicker from '../../components/DatePicker';
import ReactSelect from '../../components/ReactSelect';

import { Container } from './styles';

const customStyles = {
  container: (provided, state) => ({
    ...provided,
    width: '100%',
    height: '100%',
  }),
  menu: (provided, state) => ({
    ...provided,
    color: '#fff',
    background: 'var(--color-primary)',
  }),
  menuList: (provided, state) => ({
    ...provided,
    color: '#fff',
    background: 'var(--color-primary)',
  }),
  option: (provided, state) => ({
    ...provided,
    color: '#fff',
    background: 'var(--color-primary)',
    padding: 20,
    height: 44,
  }),
  control: (provided, state) => ({
    ...provided,
    color: '#fff',
    background: 'var(--color-primary)',
    height: 44,
    border: 'none',
  }),
  input: (provided, state) => ({
    ...provided,
    color: '#fff',
    height: '100%',
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: 'rgba(255, 255, 255, 0.7)',
    height: '100%',
    transform: 'translateY(0%)',
    display: 'flex',
    alignItems: 'center',
    top: '0',
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    height: '100%',
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return {
      ...provided,
      opacity,
      transition,
      color: '#fff',
    };
  },
};

function LocationAdd() {
  const formRef = useRef(null);
  const history = useHistory();
  const [clientList, setClientList] = useState([]);
  const [listItemOption, setListItemOption] = useState([]);
  const [listItem, setListItem] = useState([]);
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [dateFinal, setDateFinal] = useState(new Date());

  useEffect(() => {
    async function getCustomerList() {
      const response = await api.get('customer');
      const customers = response.data;

      customers.forEach(({ id, name }) => {
        setClientList((auxListCustomer) => [
          ...auxListCustomer,
          { value: id, label: name },
        ]);
      });
    }
    getCustomerList();

    async function getList() {
      const response = await api.get('item-free');
      const items = response.data;
      setListItem(items);
      items.forEach(({ id, name }) => {
        setListItemOption((auxListCustomer) => [
          ...auxListCustomer,
          { value: id, label: name },
        ]);
      });
    }
    getList();
  }, []);

  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        returnDate: Yup.date().required('O nome é obrigatório'),
        itemId: Yup.string().required('O item é obrigatório'),
        customerId: Yup.string().required('O cliente é obrigatório'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      const { itemId, customerId, returnDate } = data;
      await api
        .post(`/location?itemId=${itemId}&customerId=${customerId}`, {
          returnDate,
          initialDate: new Date(),
        })
        .then(() => {
          toast.success('Item locado');
          history.push('/location');
        })
        .catch(() => {
          toast.error('Item indisponível');
        });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errMessages = {};

        error.inner.forEach((err) => {
          errMessages[err.path] = err.message;
        });

        formRef.current.setErrors(errMessages);
      }
    }
  }

  function handleChangeItem({ value }) {
    const item = listItem.find(({ id }) => id === value);
    console.log(item);
    setPrice(item.price);
  }
  function handleChangeDate(returnDate) {
    setDateFinal(returnDate);
    setTotal(getValueLocation(price, returnDate, new Date()));
  }
  return (
    <Container>
      <h1>Nova Locação</h1>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <ReactSelect
          placeholder="Cliente"
          id="select-customer"
          noOptionsMessage={() => 'Não Existe Cliente'}
          name="customerId"
          label="Cliente:"
          options={clientList}
          styles={customStyles}
        />
        <ReactSelect
          placeholder="Item"
          id="select-item"
          name="itemId"
          label="Item:"
          noOptionsMessage={() => 'Nenhum Item disponível'}
          onChange={handleChangeItem}
          options={listItemOption}
          styles={customStyles}
        />
        <DatePicker
          label="Devolução:"
          name="returnDate"
          placeholderText="01/01/2025"
          selected={dateFinal}
          onChange={handleChangeDate}
        />
        <div className="total">
          <h4>Valor Total:</h4>
          <h2>{total}</h2>
        </div>
        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
}

export default LocationAdd;
