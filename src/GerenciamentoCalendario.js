import React from 'react';
import BigCalendar from './BigCalendar';
import AulaForm from './AulaForm'

const GerenciamentoCalendario = () => {
    return (
        <div>
            <h1>Gerenciamento de Calendários</h1>
            <h2>Calendário</h2>
            <AulaForm />
            <BigCalendar />
           
        </div>
    );
};

export default GerenciamentoCalendario;
