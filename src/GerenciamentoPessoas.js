import React from 'react';
import AddPessoa from './AddPessoa';
import AddVinculo from './AddVinculo';
import AddHoraTrabProf from './AddHoraTrabProf';

const GerenciamentoPessoas = () => {
    return (
        <div>
            <h1>Gerenciamento de Pessoas</h1>
            <h2>Adicionar Nova Pessoa</h2>
            <AddPessoa />
            <h2>Adicionar Vinculo</h2>
            <AddVinculo />
            <h2>Adicionar Horário de Trabalho e jornada</h2>
            <AddHoraTrabProf />
        </div>
    );
};

export default GerenciamentoPessoas;
