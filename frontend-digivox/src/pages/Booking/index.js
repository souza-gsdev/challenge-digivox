import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

import api from '../../services/api';

import { Container, CardBooking } from './styles';

function Booking() {
  const [list, setList] = useState([]);

  useEffect(() => {
    async function getList() {
      const response = await api.get('/booking');
      setList(response.data);
    }
    getList();
  }, []);

  async function handleCancel(id) {
    try {
      const response = await api.delete(`/booking/${id}`);
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
      <Link to="/booking-add">Nova Reserva</Link>
      <h1>Reservas</h1>
      <div className="container-list">
        {list.length > 0 ? (
          list.map((booking) => (
            <CardBooking key={booking.id}>
              <div className="delete">
                <button type="button" onClick={() => handleCancel(booking.id)}>
                  Cancelar
                </button>
              </div>
              <h3>{booking.item.name}</h3>
              <p>{booking.item.type.name}</p>
              <p>
                Cliente: <b>{booking.customer.name}</b>{' '}
              </p>
              <p>
                Reserva para:
                <b>{format(new Date(booking.bookingDate), 'dd/MM/yyyy')}</b>
              </p>
            </CardBooking>
          ))
        ) : (
          <h2>Nenhuma reserva encontrada</h2>
        )}
      </div>
    </Container>
  );
}

export default Booking;
