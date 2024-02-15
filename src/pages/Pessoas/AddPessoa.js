import React, { useState } from 'react';
import axios from 'axios';
import FormGroup from "../../components/Form/FormGroup";

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
            await axios.post('http://10.92.6.122:8000/api/pessoas/', pessoa);
            // Adicione a lógica para lidar com a resposta bem-sucedida
        } catch (error) {
            console.error('Houve um erro ao enviar os dados', error);
            // Adicione a lógica para lidar com erros
        }
    };

    return (
        <form className="row" onSubmit={handleSubmit}>
            <div className='col-md-4'>
                <FormGroup
                    id="nome"
                    name="nome"
                    label="Nome"
                    placeholder="Nome"
                    value={pessoa.nome}
                    funChange={handleChange}
                />
            </div>

            <div className='col-md-4'>
                <FormGroup
                    type="tel"
                    id="telefone"
                    name="telefone"
                    label="Telefone"
                    placeholder="Informe seu telefone"
                    value={pessoa.telefone}
                    funChange={handleChange}
                />
            </div>

            <div className='col-md-4'>
                <FormGroup
                    type="email"
                    id="email"
                    name="email"
                    label="E-mail"
                    placeholder="Informe seu e-mail"
                    value={pessoa.email}
                    funChange={handleChange}
                />
            </div>

            <div className="col-md-12">
                <button className="btn btn-primary" type="submit">Adicionar Pessoa</button>
            </div>
        </form>
    );
};

export default AddPessoa;
