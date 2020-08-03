import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  box-shadow: 3px 0px 6px #0202;
  position: fixed;
  height: 100vh;
  z-index: 99;
  .logo {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      max-width: 90%;
      object-fit: contain;
    }
  }
  .menu {
    display: flex;
    flex-direction: column;
    flex: 1;
    background: var(--color-secondary);
    justify-content: flex-start;
    padding-top: 100px;
    a {
      text-align: end;
      padding-right: 20px;
      color: var(--color-primary);
      text-decoration: none;
      font-size: 18px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 70%;
      align-self: flex-end;
      &.active {
        font-weight: bold;
        background: #fff;
        color: var(--color-primary);
        height: 40px;
        margin-left: 50px;
        display: flex;
        align-items: center;
        padding-left: 10px;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
      }
    }
  }
`;
