import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api';

import { Container, CardClient } from './styles';

function Customer() {
  const [list, setList] = useState([]);

  useEffect(() => {
    async function getList() {
      const response = await api.get('/customer');
      setList(response.data);
    }
    getList();
  }, []);

  async function handleCancel(id) {
    try {
      const response = await api.delete(`customer/${id}`);
      if (response.status === 204) {
        setList(list.filter((item) => item.id !== id));
        toast.error('Cliente deletado');
      }
    } catch (error) {
      toast.error('Verifique se existem clientes ativos');
    }
  }

  return (
    <Container>
      <Link to="/customer-add">Novo Cliente</Link>
      <h1>Clientes</h1>
      <div className="container-list">
        {list.length > 0 ? (
          list.map((customer) => (
            <CardClient key={customer.id}>
              <div className="delete">
                <button type="button" onClick={() => handleCancel(customer.id)}>
                  Deletar
                </button>
              </div>
              <h4>{customer.name}</h4>
              <p>{customer.email}</p>
              <p>
                CPF: <b>{customer.cpf}</b>{' '}
              </p>
              <p>
                Telefone: <b>{customer.phone}</b>{' '}
              </p>
            </CardClient>
          ))
        ) : (
          <h2>Nenhum cliente encontrado</h2>
        )}
      </div>
    </Container>
  );
}

export default Customer;
