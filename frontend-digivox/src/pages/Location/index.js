import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

import api from '../../services/api';

import { getValueLocation } from '../../util/func';

import { Container, CardLocation } from './styles';

function Location() {
  const [list, setList] = useState([]);

  useEffect(() => {
    async function getList() {
      const response = await api.get('/location');
      setList(response.data);
    }
    getList();
  }, []);
  async function handleCancel(id) {
    try {
      const response = await api.delete(`/location/${id}`);
      if (response.status === 204) {
        setList(list.filter((item) => item.id !== id));
        toast.success('Item devolvido');
      }
    } catch (error) {
      toast.error('Verifique se existem itens locados');
    }
  }
  return (
    <Container>
      <Link to="/location-add">Adicione uma Locação</Link>
      <h1>Locações</h1>
      <div className="container-list">
        {list.length > 0 ? (
          list.map((location) => (
            <CardLocation key={location.id}>
              <div className="delete">
                <button type="button" onClick={() => handleCancel(location.id)}>
                  Devolver
                </button>
              </div>
              <h3>{location.item.name}</h3>
              <p>{location.item.type.name}</p>
              <div className="dates">
                <p>
                  Retirada:
                  <b>{format(new Date(location.initialDate), 'dd/MM/yyyy')}</b>
                </p>
                <p>
                  Devolução:
                  <b>{format(new Date(location.returnDate), 'dd/MM/yyyy')}</b>
                </p>
              </div>
              <div className="valor">
                <h4>
                  R$
                  {getValueLocation(
                    location.item.price,
                    location.returnDate,
                    location.initialDate
                  )}
                </h4>
              </div>
            </CardLocation>
          ))
        ) : (
          <h2>Nenhuma locação encontrada</h2>
        )}
      </div>
    </Container>
  );
}

export default Location;
