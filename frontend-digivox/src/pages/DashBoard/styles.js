import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5em;
  flex: 1;
  h1 {
    border-bottom: 3px solid var(--color-secondary);
  }
  & > p {
    color: var(--color-secondary);
    font-style: italic;
    font-size: 12px;
    margin-top: 5px;
  }
  h2 {
    margin: auto;
    margin-bottom: 20px;
    border-bottom: 2px solid var(--color-secondary);
    width: fit-content;
    align-self: center;
  }
  .container-list {
    margin-top: 30px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  .initial,
  .return {
    max-width: 50%;
    width: 300px;
    margin: 0 30px;
    h5 {
      text-align: center;
    }
  }
`;

export const CardLocation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0;
  border: 2px solid var(--color-secondary);
  border-radius: 10px;
  overflow: hidden;
  padding-top: 10px;
  & > * {
    padding: 0 10px;
  }
  .valor {
    width: 100%;
    background: var(--color-secondary);
    display: flex;
    justify-content: center;
    color: #fff;
    padding: 10px;
  }
`;
