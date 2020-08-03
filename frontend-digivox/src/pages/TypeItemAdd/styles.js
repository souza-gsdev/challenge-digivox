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
  form {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    & > button {
      width: 50%;
      background: var(--color-secondary);
      height: 40px;
      color: #fff;
      font-weight: bold;
      margin: auto;
      border: none;
      border-radius: 50px;
      margin-top: 10px;
    }
    .input-label {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin: 10px;
      input {
        width: 100%;
        height: 44px;
        border: none;
        color: #fff;
        background: var(--color-primary);
        padding: 2px 8px;
        border-radius: 4px;
        &::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }
      }
    }
  }
`;
