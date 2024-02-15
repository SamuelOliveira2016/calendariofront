import React, { useState } from 'react';
import axios from 'axios';
import FormGroup from "../../components/Form/FormGroup";

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
                ? await axios.put(`http://10.92.6.122:8000/api/calendario-academico/${editId}/`, calendario)
                : await axios.post('http://10.92.6.122:8000/api/calendario-academico/', calendario);
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
            await axios.delete(`http://10.92.6.122:8000/calendario-academico/${editId}/`);
            console.log('Calendário Acadêmico excluído com sucesso.');
            setEditId(null);
        } catch (error) {
            console.error('Erro ao excluir os dados', error);
        }
    };

    return (
        <form className="row" onSubmit={handleSubmit}>
            <div className='col-md-4'>
                <FormGroup
                    id="nome"
                    name="nome"
                    label="Nome do Calendário"
                    value={calendario.nome}
                    funChange={handleChange}
                />
            </div>

            <div className='col-md-4'>
                <FormGroup
                    type="number"
                    id="ano_letivo"
                    name="ano_letivo"
                    label="Ano Letivo"
                    value={calendario.ano_letivo}
                    funChange={handleChange}
                />
            </div>

            <div className='col-md-4'>
                <FormGroup
                    type="number"
                    id="semestre"
                    name="semestre"
                    label="Semestre"
                    value={calendario.semestre}
                    funChange={handleChange}
                />
            </div>

            <div className='col-md-6'>
                <FormGroup
                    type="date"
                    id="inicio"
                    name="inicio"
                    label="Início"
                    value={calendario.inicio}
                    funChange={handleChange}
                />
            </div>

            <div className='col-md-6'>
                <FormGroup
                    type="date"
                    id="termino"
                    name="termino"
                    label="Término"
                    value={calendario.termino}
                    funChange={handleChange}
                />
            </div>

            <div className="col-md-12">
                <button className="btn btn-primary" type="submit">
                    {editId ? 'Atualizar Calendário' : 'Adicionar Calendário'}
                </button>

                {editId && (
                    <button className="btn btn-secondary" onClick={handleDelete}>Excluir Calendário</button>
                )}
            </div>
        </form>
    );
};

export default CalendarioAcademicoForm;
