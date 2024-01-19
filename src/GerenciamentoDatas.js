import React from 'react';
import CalendarioAcademico from './CalendarioAcademico';
import AddEventos from './AddEventos';
import AddAula from './AddAula';

const GerenciamentoDatas = () => {
    return (
        <div>
            <h1>Gerenciamento de Datas</h1>
            <h2>Calendário Acadêmico </h2>
            <CalendarioAcademico />
            <h2>Adicione Eventos ao seu Calendário Acadêmico </h2>
            <AddEventos />
            <h2>Adicione as Aulas</h2>
            <AddAula />           
        </div>
    );
};

export default GerenciamentoDatas;
