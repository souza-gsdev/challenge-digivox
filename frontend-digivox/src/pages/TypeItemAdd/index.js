import React, { useRef } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import Input from '../../components/Input';

import { Container } from './styles';

function TypeItemAdd() {
  const formRef = useRef(null);
  const history = useHistory();

  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      const { name } = data;
      await api
        .post('type-items', { name })
        .then(() => {
          toast.success('Tipo de item adicionado com sucesso');
          history.push('/types');
        })
        .catch(() => {
          toast.error('Não foi possível adicionar tipo de item');
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
  return (
    <Container>
      <h1>Novo Tipo de Item</h1>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <Input label="Nome:" name="name" placeholder="Nome" />
        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
}

export default TypeItemAdd;
