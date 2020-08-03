import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
 :root{
    --color-primary: #254595;
    --color-secondary: #f06022;
  }
  *{
    margin:0;
    padding:0;
    outline:0;
    box-sizing:border-box;
  }
  html,body,#root{
    min-height:100vh;
  }
  body{
    -webkit-font-smoothing: antialiased !important;
  }
  body,input,button{
    color:#003366;
    font-size:14px;
    font-family: 'Poppins', sans-serif;
  }
  button{
    cursor: pointer;
  }
`;
