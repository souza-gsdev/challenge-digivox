import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from './styles';

import logo from '../../assets/images/logo-digivox-for-rental.png';

function Header() {
  const [activeIndex, setActiveIndex] = useState(0);
  const param = window.location.pathname;

  function handleToggle(index) {
    setActiveIndex(index);
  }

  useEffect(() => {
    if (param.includes('location')) {
      handleToggle(1);
    } else if (param.includes('booking')) {
      handleToggle(2);
    } else if (param.includes('customer')) {
      handleToggle(3);
    } else if (param.includes('items')) {
      handleToggle(4);
    } else if (param.includes('types')) {
      handleToggle(5);
    }
  }, [param]);

  return (
    <Container>
      <div className="logo">
        <img src={logo} alt="logo-for-rental" />
      </div>
      <nav className="menu">
        <Link
          className={activeIndex === 0 ? 'active' : null}
          onClick={() => handleToggle(0)}
          to="/"
        >
          Dashboard
        </Link>
        <Link
          className={activeIndex === 1 ? 'active' : null}
          onClick={() => handleToggle(1)}
          to="/location"
        >
          Locação
        </Link>
        <Link
          className={activeIndex === 2 ? 'active' : null}
          onClick={() => handleToggle(2)}
          to="/booking"
        >
          Reservas
        </Link>
        <Link
          className={activeIndex === 3 ? 'active' : null}
          onClick={() => handleToggle(3)}
          to="/customer"
        >
          Clientes
        </Link>
        <Link
          className={activeIndex === 4 ? 'active' : null}
          onClick={() => handleToggle(4)}
          to="/items"
        >
          Itens
        </Link>
        <Link
          className={activeIndex === 5 ? 'active' : null}
          onClick={() => handleToggle(5)}
          to="/types"
        >
          Tipo de Itens
        </Link>
      </nav>
    </Container>
  );
}

export default Header;
