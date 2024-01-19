import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
        <form onSubmit={handleSubmit}>
            <label>
    Pessoa:
    <select name="pessoa" value={professor.pessoa} onChange={handleChange}>
        <option value="">Selecione uma Pessoa</option>
        {pessoas.map(pessoa => (
            <option key={pessoa.id} value={pessoa.id}>{pessoa.nome}</option>
        ))}
    </select>
</label>

<label>
    NIF:
    <input type="text" name="nif" value={professor.nif} onChange={handleChange} />
</label>

<label>
    Nível:
    <input type="text" name="nivel" value={professor.nivel} onChange={handleChange} />
</label>

       <button type="submit">Adicionar Professor</button>
        </form>
    );
};

export default AddProfessor;
