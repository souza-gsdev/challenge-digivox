import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api';

import { Container, CardItem } from './styles';

function Item() {
  const [list, setList] = useState([]);

  useEffect(() => {
    async function getList() {
      const response = await api.get('/item');
      setList(response.data);
    }
    getList();
  }, []);

  async function handleCancel(id) {
    try {
      const response = await api.delete(`/item/${id}`);
      if (response.status === 204) {
        setList(list.filter((item) => item.id !== id));
        toast.success('Item deletado');
      }
    } catch (error) {
      toast.error('Verifique se existem itens locados');
    }
  }

  return (
    <Container>
      <Link to="/items-add">Novo Item</Link>
      <h1>Itens</h1>
      <div className="container-list">
        {list.length > 0 ? (
          list.map((item) => (
            <CardItem key={item.id}>
              <div className="delete">
                <button type="button" onClick={() => handleCancel(item.id)}>
                  Deletar
                </button>
              </div>
              <h4>{item.name}</h4>
              <p>{item.type.name}</p>
              <p>{item.shortDescription}</p>
              <h5>R${item.price}</h5>
              <h4>{item.status ? 'Disponível' : 'Locado'}</h4>
            </CardItem>
          ))
        ) : (
          <h2>Nenhum item encontrado</h2>
        )}
      </div>
    </Container>
  );
}

export default Item;
