import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5em;
  flex: 1;
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
  h1 {
    margin-bottom: 30px;
    border-bottom: 3px solid var(--color-secondary);
  }
  .container-list {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
`;
export const CardItem = styled.div`
  min-width: 250px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px;
  border: 2px solid var(--color-secondary);
  border-radius: 10px;
  overflow: hidden;
  padding: 10px;
  position: relative;
  .delete {
    position: absolute;
    top: -3px;
    right: -3px;
    padding: 0;
    button {
      background: #900;
      color: #fff;
      border: none;
      padding-right: 8px;
      padding-left: 5px;
      padding-top: 8px;
      border-radius: 4px;
      padding-bottom: 5px;
    }
  }
`;
