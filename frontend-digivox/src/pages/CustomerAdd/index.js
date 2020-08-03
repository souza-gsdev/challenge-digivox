import React, { useRef } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import Input from '../../components/Input';

import { Container } from './styles';

function CustomerAdd() {
  const formRef = useRef(null);
  const history = useHistory();

  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string().email().required('O email é obrigatório'),
        cpf: Yup.string().required('O CPF é obrigatório'),
        phone: Yup.string().required('O Telefone é obrigatório'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      const { name, email, cpf, phone } = data;
      await api
        .post('/customer/', {
          name,
          email,
          cpf,
          phone,
        })
        .then(() => {
          toast.success('Cliente adicionado com sucesso');
          history.push('/customer');
        })
        .catch(() => {
          toast.error('Não foi possível adicionar o cliente');
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
      <h1>Novo Cliente</h1>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <Input label="Nome:" name="name" placeholder="Nome" />
        <Input label="Email:" name="email" placeholder="Email" type="email" />
        <Input label="CPF:" name="cpf" placeholder="CPF" />
        <Input label="Telefone:" name="phone" placeholder="Telefone" />
        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
}

export default CustomerAdd;
