import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api';

import { Container } from './styles';

function TypeItem() {
  const [list, setList] = useState([]);

  useEffect(() => {
    async function getList() {
      const response = await api.get('/type-items/');
      setList(response.data);
    }
    getList();
  }, []);

  async function handleCancel(id) {
    try {
      const response = await api.delete(`/type-items/${id}`);
      if (response.status === 204) {
        setList(list.filter((item) => item.id !== id));
      }
      toast.success('Tipo de item apagado');
    } catch (error) {
      toast.error('Verifique se existem itens deste tipo');
    }
  }

  return (
    <Container>
      <Link to="/types-add">Novo Tipo de Item</Link>
      <h1>Tipos de Item</h1>
      <div className="container-list">
        {list.length > 0 ? (
          list.map((type) => (
            <div key={type.id} className="type-item">
              <h4>{type.name}</h4>
              <div className="delete">
                <button type="button" onClick={() => handleCancel(type.id)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <h2>Nenhum tipo de item encontrado</h2>
        )}
      </div>
    </Container>
  );
}

export default TypeItem;
