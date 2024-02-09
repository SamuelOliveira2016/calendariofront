import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    // Aplicar o token de autenticação para cada solicitação se logado
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // Deletar o header de autenticação
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
