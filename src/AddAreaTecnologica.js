import React, { useState } from 'react';
import axios from 'axios';

const AddAreaTecnologica = () => {
    const [areaTecnologica, setAreaTecnologica] = useState({
        nome: '',
        descricao: ''
    });

    const handleChange = (e) => {
        setAreaTecnologica({ ...areaTecnologica, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/areastecnologicas/', areaTecnologica);
            console.log(response.data);
            // Resetar o formulário ou mostrar mensagem de sucesso
        } catch (error) {
            console.error('Erro ao enviar os dados', error);
            // Mostrar mensagem de erro
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nome:
                <input type="text" name="nome" value={areaTecnologica.nome} onChange={handleChange} />
            </label>
            <br />
            <label>
                Descrição:
                <textarea name="descricao" value={areaTecnologica.descricao} onChange={handleChange}></textarea>
            </label>
            <br />
            <button type="submit">Adicionar Área Tecnológica</button>
        </form>
    );
};

export default AddAreaTecnologica;
