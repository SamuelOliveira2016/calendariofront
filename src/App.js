import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GerenciamentoCursos from './GerenciamentoCursos';
import GerenciamentoPessoas from './GerenciamentoPessoas';
import GerenciamentoProfessor from './GerenciamentoProfessor';
import GerenciamentoDatas from './GerenciamentoDatas';
import GerenciamentoCalendario from './GerenciamentoCalendario';
import 'react-big-calendar/lib/css/react-big-calendar.css';

function App() {
    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/gerenciamentocursos">Gerenciamento de Cursos</Link></li>
                    <li><Link to="/gerenciamentopessoas">Gerenciamento de Pessoas</Link></li>
                    <li><Link to="/gerenciamentoprofessor">Gerenciamento de Professores</Link></li>
                    <li><Link to="/gerenciamentodatas">Gerenciamento de Datas</Link></li>
                    <li><Link to="/gerenciamentocalendario">Gerenciamento de Caledarios</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/gerenciamentocursos" element={<GerenciamentoCursos />} />
                <Route path="/gerenciamentopessoas" element={<GerenciamentoPessoas />} />
                <Route path="/gerenciamentoprofessor" element={<GerenciamentoProfessor />} />
                <Route path="/gerenciamentodatas" element={<GerenciamentoDatas />} />
                <Route path="/gerenciamentocalendario" element={<GerenciamentoCalendario />} />

            </Routes>
        </Router>
    );
}

export default App;
