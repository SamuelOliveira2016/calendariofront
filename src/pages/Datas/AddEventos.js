import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormGroup from "../../components/Form/FormGroup";

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
        axios.get('http://10.92.6.122:8000/api/calendario-academico/')
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
            const response = await axios.post('http://10.92.6.122:8000/api/eventos/', evento);
            console.log(response.data);
            // Resetar o formulário ou redirecionar o usuário
        } catch (error) {
            console.error('Erro ao enviar os dados do evento', error);
        }
    };

    return (
        <form className="row" onSubmit={handleSubmit}>
            {/* Nome do Evento */}
            <div className='col-md-4'>
                <FormGroup
                    id="nome"
                    name="nome"
                    label="Nome do Evento"
                    value={evento.nome}
                    funChange={handleChange}
                />
            </div>

            <div className='col-md-4'>
                <FormGroup
                    type="date"
                    id="data_inicio"
                    name="data_inicio"
                    label="Data de Início"
                    value={evento.data_inicio}
                    funChange={handleChange}
                />
            </div>

            <div className='col-md-4'>
                <FormGroup
                    type="date"
                    id="data_fim"
                    name="data_fim"
                    label="Data de Fim"
                    value={evento.data_fim}
                    funChange={handleChange}
                />
            </div>

            <div className='col-md-12'>
                <FormGroup
                    type="select"
                    id="calendario_academico"
                    name="calendario_academico"
                    label="Calendário Acadêmico"
                    value={evento.descricao}
                    funChange={handleChange}
                >
                    <option value="">Selecione um Calendário</option>
                    {calendarios.map(calendario => (
                        <option key={calendario.id} value={calendario.id}>
                            {calendario.nome}
                        </option>
                    ))}
                </FormGroup>
            </div>

            <div className='col-md-12'>
                <FormGroup
                    type="textarea"
                    id="descricao"
                    name="descricao"
                    label="Descrição"
                    value={evento.descricao}
                    funChange={handleChange}
                />
            </div>

            <div className="col-md-12">
                <button className="btn btn-primary" type="submit">Adicionar Evento</button>
            </div>
        </form>
    );
};

export default AddEventos;
