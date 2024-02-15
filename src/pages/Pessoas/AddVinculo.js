import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormGroup from "../../components/Form/FormGroup";

const AddVinculo = () => {
    const [vinculo, setVinculo] = useState({
        vinculo: '',
        pessoa: ''
    });
    const [pessoas, setPessoas] = useState([]);

    useEffect(() => {
        axios.get('http://10.92.6.122:8000/api/pessoas/')
            .then(res => {
                setPessoas(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        // Se o campo alterado for 'pessoaId', converte o valor para inteiro
        // Caso contrário, usa o valor como está
        const updatedValue = name === 'pessoa' ? parseInt(value, 10) || '' : value;
    
        setVinculo({ ...vinculo, [name]: updatedValue });

    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Enviando vínculo:', vinculo);
        try {
            await axios.post('http://10.92.6.122:8000/api/vinculos/', vinculo);
            // Adicione a lógica para lidar com a resposta bem-sucedida
        } catch (error) {
            console.error('Houve um erro ao enviar os dados', error);
            // Adicione a lógica para lidar com erros
        }
    };

    return (
        <form className="row" onSubmit={handleSubmit}>
            <div className='col-md-6'>
                <FormGroup
                    type="select"
                    id="vinculo"
                    name="vinculo"
                    label="Vinculo"
                    value={vinculo.vinculo}
                    funChange={handleChange}
                >
                    <option value="">Selecione o Tipo de Vínculo</option>
                    <option value="horista">Horista</option>
                    <option value="prazo_indeter">Prazo Indeterminado</option>
                    <option value="temporario">Temporário</option>
                    <option value="prazo_determinado">Prazo Determinado</option>
                </FormGroup>
            </div>


            <div className='col-md-6'>
                <FormGroup
                    type="select"
                    id="pessoa"
                    name="pessoa"
                    label="Pessoa"
                    value={vinculo.pessoa}
                    funChange={handleChange}
                >
                    <option value="">Selecione a Pessoa</option>
                    {pessoas.map(pessoa => (
                        <option key={pessoa.id} value={pessoa.id}>{pessoa.nome}</option>
                    ))}
                </FormGroup>
            </div>

            <div className="col-md-12">
                <button className="btn btn-primary" type="submit">Adicionar Vínculo</button>
            </div>
        </form>
    );
};

export default AddVinculo;
