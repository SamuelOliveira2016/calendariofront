import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormGroup from "../../components/Form/FormGroup";

const AddProfessor = () => {
    const [professor, setProfessor] = useState({
        pessoa: '', // Campo de pessoa
        nif: '',
        nivel: '',
    });

    const [pessoas, setPessoas] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/pessoas/')
            .then(res => setPessoas(res.data))
            .catch(err => console.error("Erro ao carregar pessoas", err));

    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name === 'unidadecurricular') {
            // Converte os valores selecionados em um array de IDs das unidades curriculares
            const selectedCourses = Array.from(e.target.selectedOptions, option => option.value);
    
            setProfessor(prevProfessor => ({
                ...prevProfessor,
                unidadeCurricular: selectedCourses,
            }));
        } else {
            setProfessor(prevProfessor => ({
                ...prevProfessor,
                [name]: value
            }));
        }
    };
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Enviando professor:", professor); // Depuração

        try {
            const response = await axios.post('http://localhost:8000/api/professores/', professor);
            console.log("Professor adicionado:", response.data);
        } catch (error) {
            console.error('Erro ao adicionar professor', error);
        }
    };

    return (
        <form className="row" onSubmit={handleSubmit}>
            <div className='col-md-12'>
                <FormGroup
                    type="select"
                    id="pessoa"
                    name="pessoa"
                    label="Pessoa"
                    value={professor.pessoa}
                    funChange={handleChange}
                >
                    <option value="">Selecione uma Pessoa</option>
                    {pessoas.map(pessoa => (
                        <option key={pessoa.id} value={pessoa.id}>{pessoa.nome}</option>
                    ))}
                </FormGroup>
            </div>


            <div className='col-md-6'>
                <FormGroup
                    id="nif"
                    name="nif"
                    label="NIF"
                    value={professor.nif}
                    funChange={handleChange}
                />
            </div>

            <div className='col-md-6'>
                <FormGroup
                    id="nivel"
                    name="nivel"
                    label="Nível"
                    value={professor.nivel}
                    funChange={handleChange}
                />
            </div>

            <div className='col-md-12'>
                <button className="btn btn-primary" type="submit">Adicionar Professor</button>
            </div>
        </form>
    );
};

export default AddProfessor;
