import React, { useState } from 'react';
import axios from 'axios';
import FormGroup from '../../components/Form/FormGroup';

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
            const response = await axios.post('http://10.92.6.122:8000/api/areastecnologicas/', areaTecnologica);
            console.log(response.data);
            // Resetar o formulário ou mostrar mensagem de sucesso
        } catch (error) {
            console.error('Erro ao enviar os dados', error);
            // Mostrar mensagem de erro
        }
    };

    return (
        <form className='row' onSubmit={handleSubmit}>
            <div className='col-md-6'>
                <FormGroup 
                    id="nome"
                    name="nome"
                    label="Nome"
                    value={areaTecnologica.nome}
                    funChange={handleChange}
                />
            </div>

            <div className='col-md-6'>
                <FormGroup 
                    id="descricao"
                    name="descricao"
                    label="Descrição"
                    value={areaTecnologica.descricao}
                    funChange={handleChange}
                />
            </div>

            <div className='col-md-12'>
                <button className="btn btn-primary" type="submit">
                    Adicionar Área Tecnológica
                </button>
            </div>
        </form>
    );
};

export default AddAreaTecnologica;
