import React, { useState } from 'react';
import axios from 'axios'; // Importando axios
import { useNavigate } from 'react-router-dom';
import setAuthToken from '../../axiosConfig'; // Garanta que este arquivo exista e esteja configurado corretamente


export default () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/token/', {
                username: username,
                password: password
            });
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            setAuthToken(response.data.access); // Configura o token de autenticação para futuras requisições

            console.log('Login bem-sucedido!');
            navigate('/home'); // Redireciona para a página inicial
        } catch (error) {
            console.warn('Erro de login:', error.response);
        }
    };

    return (
        <div className="row">
            <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto">
              <div className="card card-plain">
                <div className="card-header pb-0 text-start">
                  <h4 className="font-weight-bolder">Acessar o sistema</h4>
                  <p className="mb-0">Informe seu e-mail e senha para entrar</p>
                </div>
                <div className="card-body">
                  <form role="form">
                    <div className="mb-3">
                      <input type="email" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="form-control form-control-lg" 
                        placeholder="E-mail" aria-label="E-mail" />
                    </div>
                    <div className="mb-3">
                      <input type="password" 
                        value={username}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="form-control form-control-lg" 
                        placeholder="********" aria-label="********" />
                    </div>
                    <div className="text-center">
                      <button type="button"
                       onClick={(e) => handleSubmit(e)}
                       style={{backgroundColor: "#D10E0E", color: "#fff"}}
                       className="btn btn-lg btn-lg w-100 mt-4 mb-0">Acessar</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
        </div>
    )
}