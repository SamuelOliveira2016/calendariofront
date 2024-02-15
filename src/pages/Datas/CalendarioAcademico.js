import React, { useState } from 'react';
import axios from 'axios';

const CalendarioAcademicoForm = () => {
    const [calendario, setCalendario] = useState({
        nome : '',
        ano_letivo: '',
        semestre: '',
        inicio: '',
        termino: ''
    });
    const [editId, setEditId] = useState(null);

    const handleChange = (e) => {
        setCalendario({ ...calendario, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = editId 
                ? await axios.put(`http://localhost:8000/api/calendario-academico/${editId}/`, calendario)
                : await axios.post('http://localhost:8000/api/calendario-academico/', calendario);
            console.log('Resposta:', response.data);
            // Limpa o formulário após a operação
            setCalendario({ nome: '', ano_letivo: '', semestre: '', inicio: '', termino: '' });
            setEditId(null); // Reset editId após a operação
        } catch (error) {
            console.error('Erro ao enviar os dados', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8000/calendario-academico/${editId}/`);
            console.log('Calendário Acadêmico excluído com sucesso.');
            setEditId(null);
        } catch (error) {
            console.error('Erro ao excluir os dados', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nome"
                    value={calendario.nome}
                    onChange={handleChange}
                    placeholder="Nome do Calendário"
                />
                <input
                    type="number"
                    name="ano_letivo"
                    value={calendario.ano_letivo}
                    onChange={handleChange}
                    placeholder="Ano Letivo"
                />
                <input
                    type="number"
                    name="semestre"
                    value={calendario.semestre}
                    onChange={handleChange}
                    placeholder="Semestre"
                />
                <input
                    type="date"
                    name="inicio"
                    value={calendario.inicio}
                    onChange={handleChange}
                    placeholder="Início"
                />
                <input
                    type="date"
                    name="termino"
                    value={calendario.termino}
                    onChange={handleChange}
                    placeholder="Término"
                />
                <button type="submit">{editId ? 'Atualizar Calendário' : 'Adicionar Calendário'}</button>
            </form>
            {editId && (
                <button onClick={handleDelete}>Excluir Calendário</button>
            )}
        </div>
    );
};

export default CalendarioAcademicoForm;
