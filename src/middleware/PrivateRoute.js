import React from "react";
import { Navigate } from 'react-router-dom';

export default ({ element: Component, ...rest }) => {
    //const token = localStorage.getItem('access_token');
    const token = "aa"

    // Verifica se não possui um token, caso não tenha redireciona para o login
    if (!token) return <Navigate to="/" replace />

    // Como possui token exibe o conteudo 
    return Component
};