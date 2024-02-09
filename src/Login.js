import React, { useState } from 'react';
import axios from 'axios'; // Importando axios
import { useNavigate } from 'react-router-dom';
import setAuthToken from './axiosConfig'; // Garanta que este arquivo exista e esteja configurado corretamente

function Login() {
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
            console.error('Erro de login:', error.response);
            // Aqui você pode adicionar a lógica para lidar com o erro de login,
            // como exibir uma mensagem de erro ao usuário.
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Nome de Usuário:</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Senha:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}

export default Login;
