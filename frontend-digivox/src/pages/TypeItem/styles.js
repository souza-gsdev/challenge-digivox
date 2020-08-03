import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5em;
  flex: 1;
  h1 {
    margin-bottom: 30px;
    border-bottom: 3px solid var(--color-secondary);
  }
  & > a {
    position: absolute;
    top: 50px;
    right: 50px;
    background: var(--color-primary);
    padding: 5px 15px;
    border-radius: 30px;
    color: #fff;
    text-decoration: none;
    font-weight: bold;
  }
  .container-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    .type-item {
      width: 40%;
      height: 30px;
      align-items: center;
      margin: 10px;
      padding: 0 30px;
      border: 2px solid var(--color-secondary);
      border-radius: 5px;
      overflow: hidden;
      text-align: center;
      display: flex;
      justify-content: space-between;
      button {
        background: none;
        border: none;
        svg {
          color: #900;
        }
      }
    }
  }
`;
