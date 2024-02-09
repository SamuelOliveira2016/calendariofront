import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import GerenciamentoCursos from './GerenciamentoCursos';
import GerenciamentoPessoas from './GerenciamentoPessoas';
import GerenciamentoProfessor from './GerenciamentoProfessor';
import GerenciamentoDatas from './GerenciamentoDatas';
import GerenciamentoCalendario from './GerenciamentoCalendario';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Login from './Login';

const PrivateRoute = ({ element: Component, ...rest }) => {
    const token = localStorage.getItem('access_token');
    return token ? Component : <Navigate to="/" replace />;
};

function App() {
    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/gerenciamentocursos">Gerenciamento de Cursos</Link></li>
                    <li><Link to="/gerenciamentopessoas">Gerenciamento de Pessoas</Link></li>
                    <li><Link to="/gerenciamentoprofessor">Gerenciamento de Professores</Link></li>
                    <li><Link to="/gerenciamentodatas">Gerenciamento de Datas</Link></li>
                    <li><Link to="/gerenciamentocalendario">Gerenciamento de Calendarios</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/gerenciamentocursos" element={<PrivateRoute element={<GerenciamentoCursos />} />} />
                <Route path="/gerenciamentopessoas" element={<PrivateRoute element={<GerenciamentoPessoas />} />} />
                <Route path="/gerenciamentoprofessor" element={<PrivateRoute element={<GerenciamentoProfessor />} />} />
                <Route path="/gerenciamentodatas" element={<PrivateRoute element={<GerenciamentoDatas />} />} />
                <Route path="/gerenciamentocalendario" element={<PrivateRoute element={<GerenciamentoCalendario />} />} />
            </Routes>
        </Router>
    );
}

export default App;
