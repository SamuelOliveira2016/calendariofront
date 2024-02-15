import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';

const localizer = momentLocalizer(moment);

function BigCalendar() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('http://10.92.6.122:8000/api/calendario_aulas/')
            .then(response => {
                const eventosFormatados = response.data.map(evento => ({
                    title: evento.aula.curso_uc_professor.curso.nome,
                    start: new Date(evento.dia_letivo.data + 'T' + evento.aula.horario_inicio),
                    end: new Date(evento.dia_letivo.data + 'T' + evento.aula.horario_fim),
                }));
                console.log(eventosFormatados); // Verifique os eventos formatados
                setEvents(eventosFormatados);
            })
            .catch(error => console.error('Erro ao buscar eventos:', error));
    }, []);



    return (
        <div style={{ height: '500px', margin: '50px' }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                titleAccessor="title"  // Usa 'title' como título do evento
                style={{ height: '100%' }}
            />
        </div>
    );
}

export default BigCalendar;
