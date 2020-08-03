import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

import api from '../../services/api';

import { getValueLocation } from '../../util/func';

import { Container, CardLocation } from './styles';

export default function DashBoard() {
  const [initialList, setInitialList] = useState([]);
  const [returnList, setReturnList] = useState([]);

  useEffect(() => {
    async function getInitialList() {
      const response = await api.get('/location-week-initial');
      setInitialList(response.data);
    }
    getInitialList();
    async function getReturnList() {
      const response = await api.get('/location-week-return');
      setReturnList(response.data);
    }
    getReturnList();
  }, []);

  return (
    <Container>
      <h1>Dashboard</h1>
      <p>Acompanhe as locações e devoluções desta semana.</p>

      <div className="container-list">
        <div className="initial">
          <h2>Locados</h2>
          {initialList.length > 0 ? (
            initialList.map((item) => (
              <CardLocation key={item.id}>
                <h3>{item.item.name}</h3>
                <p>{item.item.type.name}</p>
                <p>
                  Retirada:
                  <b>{format(new Date(item.initialDate), 'dd/MM/yyyy')}</b>
                </p>
                <div className="valor">
                  <h4>
                    R$
                    {getValueLocation(
                      item.item.price,
                      item.returnDate,
                      item.initialDate
                    )}
                  </h4>
                </div>
              </CardLocation>
            ))
          ) : (
            <h5>Nenhuma locação esta semana</h5>
          )}
        </div>
        <div className="return">
          <h2>Devolução</h2>
          {returnList.length > 0 ? (
            returnList.map((item) => (
              <CardLocation key={item.id}>
                <h3>{item.item.name}</h3>
                <p>{item.item.type.name}</p>
                <p>
                  Devolução:
                  <b>{format(new Date(item.returnDate), 'dd/MM/yyyy')}</b>
                </p>
                <div className="valor">
                  <h4>
                    R$
                    {getValueLocation(
                      item.item.price,
                      item.returnDate,
                      item.initialDate
                    )}
                  </h4>
                </div>
              </CardLocation>
            ))
          ) : (
            <h5>Nenhum item a ser devolvido esta semana</h5>
          )}
        </div>
      </div>
    </Container>
  );
}
