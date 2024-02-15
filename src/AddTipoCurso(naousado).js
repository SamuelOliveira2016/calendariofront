import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddTipoCurso = () => {
    const [tiposCurso, setTiposCurso] = useState([]);
    const [tipoCursoSelecionado, setTipoCursoSelecionado] = useState('');

    useEffect(() => {
        axios.get('http://10.92.6.122:8000/api/tipocurso/')
            .then(res => {
                setTiposCurso(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://10.92.6.122:8000/api/tipocurso/', { nome_tipo_curso: tipoCursoSelecionado });
            console.log(response.data);
            setTipoCursoSelecionado('');
        } catch (error) {
            console.error('Erro ao enviar os dados', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Tipo de Curso:
                <select 
                    value={tipoCursoSelecionado} 
                    onChange={(e) => setTipoCursoSelecionado(e.target.value)}
                >
                    <option value="">Selecione um Tipo de Curso</option>
                    {tiposCurso.map((tipo, index) => (
                        <option key={index} value={tipo.id}>{tipo.nome_tipo_curso}</option>
                    ))}
                </select>
            </label>
            <button type="submit">Adicionar Tipo de Curso</button>
        </form>
    );
};

export default AddTipoCurso;
