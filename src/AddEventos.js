import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddEventos = () => {
    const [evento, setEvento] = useState({
        nome: '',
        data_inicio: '',
        data_fim: '',
        descricao: '',
        calendario_academico: '' 
    });
    const [calendarios, setCalendarios] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/calendario-academico/')
            .then(res => {
                console.log("Calendários acadêmicos carregados:", res.data);
                setCalendarios(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Ajuste para garantir que estamos lidando com números para IDs
        const updatedValue = name === 'calendario_academico' ? parseInt(value, 10) || '' : value;
        setEvento({ ...evento, [name]: updatedValue });
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Enviando dados do evento:", evento);
        try {
            const response = await axios.post('http://localhost:8000/api/eventos/', evento);
            console.log(response.data);
            // Resetar o formulário ou redirecionar o usuário
        } catch (error) {
            console.error('Erro ao enviar os dados do evento', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Nome do Evento */}
            <label>
                Nome do Evento:
                <input type="text" name="nome" value={evento.nome} onChange={handleChange} />
            </label>

            {/* Data de Início */}
            <label>
                Data de Início:
                <input type="date" name="data_inicio" value={evento.data_inicio} onChange={handleChange} />
            </label>

            {/* Data de Fim */}
            <label>
                Data de Fim:
                <input type="date" name="data_fim" value={evento.data_fim} onChange={handleChange} />
            </label>

            {/* Descrição */}
            <label>
                Descrição:
                <textarea name="descricao" value={evento.descricao} onChange={handleChange}></textarea>
            </label>

            {/* Seletor de Calendário Acadêmico */}
<label>
    Calendário Acadêmico:
    <select 
    name="calendario_academico" 
    value={evento.calendario_academico} 
    onChange={handleChange}
>
    <option value="">Selecione um Calendário</option>
    {calendarios.map(calendario => (
        <option key={calendario.id} value={calendario.id}>
            {calendario.nome}
        </option>
    ))}
</select>

</label>


            <button type="submit">Adicionar Evento</button>
        </form>
    );
};

export default AddEventos;
