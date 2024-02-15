import React, { useState } from 'react';
import axios from 'axios';

const AddPessoa = () => {
    const [pessoa, setPessoa] = useState({
        nome: '',
        telefone: '',
        email: ''
    });

    const handleChange = (e) => {
        setPessoa({ ...pessoa, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/pessoas/', pessoa);
            // Adicione a lógica para lidar com a resposta bem-sucedida
        } catch (error) {
            console.error('Houve um erro ao enviar os dados', error);
            // Adicione a lógica para lidar com erros
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="nome"
                value={pessoa.nome}
                onChange={handleChange}
                placeholder="Nome"
            />
            <input
                type="text"
                name="telefone"
                value={pessoa.telefone}
                onChange={handleChange}
                placeholder="Telefone"
            />
            <input
                type="email"
                name="email"
                value={pessoa.email}
                onChange={handleChange}
                placeholder="Email"
            />
            <button type="submit">Adicionar Pessoa</button>
        </form>
    );
};

export default AddPessoa;
