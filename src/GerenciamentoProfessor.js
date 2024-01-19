import React from 'react';
import AddProfessor from './AddProfessor';
import AddCursoUnidadeCurricularProfessor from './AddCursoUnidadeCurricularProfessor'
import ProfessorDetails from './ProfessorDetails'
const GerenciamentoProfessor = () => {
    return (
        <div>
            <h1>Gerenciamento de professores</h1>
            <h2>Adiciona Professor</h2>
            <AddProfessor />
            <h2>Atribua Professor ao curso e Unidade Curricular</h2>
            <AddCursoUnidadeCurricularProfessor />
            <h2>Detalhes Professor</h2>
            <ProfessorDetails />

        
        </div>
    );
};

export default GerenciamentoProfessor;
