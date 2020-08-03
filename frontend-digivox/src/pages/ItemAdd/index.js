import React, { useRef, useState, useEffect } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import Input from '../../components/Input';
import ReactSelect from '../../components/ReactSelect';

import { Container } from './styles';

function ItemAdd() {
  const formRef = useRef(null);
  const history = useHistory();
  const [typeList, setTypeList] = useState([]);

  useEffect(() => {
    async function getTypeList() {
      const response = await api.get('type-items');
      const types = response.data;

      types.forEach(({ id, name }) => {
        setTypeList((auxListType) => [
          ...auxListType,
          { value: id, label: name },
        ]);
      });
    }

    getTypeList();
  }, []);

  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        shortDescription: Yup.string().required(
          'A Descrição curta é obrigatória'
        ),
        price: Yup.string().required('O preço é obrigatório'),
        typeId: Yup.string().required('O tipo de item é obrigatório'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      const { name, shortDescription, price, typeId } = data;
      await api
        .post(`/item/${typeId}`, {
          name,
          shortDescription,
          price,
          status: true,
        })
        .then(() => {
          toast.success('Item adicionado com sucesso');
          history.push('/items');
        })
        .catch(() => {
          toast.error('Não foi possível adicionar o item');
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
  return (
    <Container>
      <h1>Novo Item</h1>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <Input label="Nome:" name="name" placeholder="Nome" />
        <Input
          label="Descrição Curta:"
          name="shortDescription"
          placeholder="Descrição Curta"
        />
        <Input label="Preço:" name="price" placeholder="Preço" />
        <ReactSelect
          placeholder="Tipo de Item"
          id="select-type"
          name="typeId"
          label="Tipo de Item:"
          options={typeList}
          styles={customStyles}
        />
        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
}

export default ItemAdd;
