import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddPessoa from './pages/Pessoas/AddPessoa';
import AddVinculo from './pages/Pessoas/AddVinculo';
import AddHoraTrabProf from './pages/Pessoas/AddHoraTrabProf';

const PessoaRoutes = () => {
    return (
        <Routes>
            <Route path="/addpessoa" element={<AddPessoa />} />
            <Route path="/addvinculo" element={<AddVinculo />} />
            <Route path="/addhoratrabprof" element={<AddHoraTrabProf />} />
            {/* Outras rotas relacionadas a pessoas */}
        </Routes>
    );
};

export default PessoaRoutes;
