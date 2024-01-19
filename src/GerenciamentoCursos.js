import React from 'react';
import AddAreaTecnologica from './AddAreaTecnologica';
import AddCurso from './AddCurso';
import AddUnidadeCurricular from './AddUnidadeCurricular'

const GerenciamentoCursos = () => {
    return (
        <div>
            <h1>Gerenciamento de Cursos</h1>
            <h2>Adiciona Áreas Tecnológicas </h2>
            <AddAreaTecnologica />
            <h2>Adiciona Curso</h2>
            <AddCurso />
            <h2>Adiciona Unidade Curricular</h2>
            <AddUnidadeCurricular />
        </div>
    );
};

export default GerenciamentoCursos;
