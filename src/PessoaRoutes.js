import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddPessoa from './AddPessoa';
import AddVinculo from './AddVinculo';
import AddHoraTrabProf from './AddHoraTrabProf';

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
