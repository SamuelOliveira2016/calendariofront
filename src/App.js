import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PagLogin from './pages/Login/PagLogin';
import Dashboard from './pages/Dashboard/Dashboard';
import PrivateRoute from './middleware/PrivateRoute';
import GerenciarCursos from './pages/Cursos/GerenciarCursos';
import GerenciarPessoas from "./pages/Pessoas/GerenciarPessoas";
import GerenciarProfessor from "./pages/Professor/GerenciarProfessor";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import GerenciarDatas from "./pages/Datas/GerenciarDatas";
import GerenciarCalendario from "./pages/Calendario/GerenciarCalendario";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PagLogin />} />
                <Route path="/painel" element={<PrivateRoute element={<Dashboard />} />} />
                <Route path="/gerenciamentocursos" element={<PrivateRoute element={<GerenciarCursos />} />} />
                <Route path="/gerenciamentopessoas" element={<PrivateRoute element={<GerenciarPessoas />} />} />
                <Route path="/gerenciamentoprofessor" element={<PrivateRoute element={<GerenciarProfessor />} />} />
                <Route path="/gerenciamentodatas" element={<PrivateRoute element={<GerenciarDatas />} />} />
                <Route path="/gerenciamentocalendario" element={<PrivateRoute element={<GerenciarCalendario />} />} />
            </Routes>
        </Router>
    );
}

export default App;
