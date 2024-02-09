import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GerenciamentoCursos from './GerenciamentoCursos';
import GerenciamentoPessoas from './GerenciamentoPessoas';
import GerenciamentoProfessor from './GerenciamentoProfessor';
import GerenciamentoDatas from './GerenciamentoDatas';
import GerenciamentoCalendario from './GerenciamentoCalendario';
import PagLogin from './pages/Login/PagLogin';
import Dashboard from './pages/Dashboard/Dashboard';
import PrivateRoute from './middleware/PrivateRoute';
import 'react-big-calendar/lib/css/react-big-calendar.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PagLogin />} />
                <Route path="/painel" element={<PrivateRoute element={<Dashboard />} />} />
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
