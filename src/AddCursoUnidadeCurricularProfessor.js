import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddCursoUnidadeCurricularProfessor = () => {
    // Estados para armazenar cursos, professores, e unidades curriculares
    const [cursos, setCursos] = useState([]);
    const [professores, setProfessores] = useState([]);
    const [unidadesCurriculares, setUnidadesCurriculares] = useState([]);
    const [selecao, setSelecao] = useState({
        curso: '',
        professor: '',
        unidadeCurricular: '',
    });

    // Carregar cursos e professores ao montar o componente
    useEffect(() => {
        axios.get('http://localhost:8000/api/cursos/')
            .then(res => setCursos(res.data))
            .catch(err => console.error("Erro ao carregar cursos", err));

        axios.get('http://localhost:8000/api/professores/')
            .then(res => setProfessores(res.data))
            .catch(err => console.error("Erro ao carregar professores", err));
    }, []);

    const carregarUnidadesCurriculares = (cursoId) => {
        axios.get(`http://localhost:8000/api/curso-uc-professor/${cursoId}/`)
            .then(res => setUnidadesCurriculares(res.data))
            .catch(err => console.error("Erro ao carregar unidades curriculares", err));
    };
    
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'professor') {
            // Supondo que seja um select múltiplo, converte os valores selecionados em um array
            const selectedProfessors = Array.from(e.target.selectedOptions, option => option.value);
            setSelecao(prevSelecao => ({
                ...prevSelecao,
                [name]: selectedProfessors,
            }));
        } else {
            setSelecao(prevSelecao => ({
                ...prevSelecao,
                [name]: value
            }));
        }
        
        // Carregar unidades curriculares quando um curso é selecionado
        if (name === 'curso') {
            carregarUnidadesCurriculares(value);
        }
    };
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Certifique-se de que os IDs sejam inteiros
        const dataParaEnviar = {
            curso: parseInt(selecao.curso),
            unidadeCurricular: parseInt(selecao.unidadeCurricular),
            professor: parseInt(selecao.professor) // Agora enviando um único ID
        };
    
        console.log("Enviando dados:", dataParaEnviar); // Para depuração
    
        try {
            const response = await axios.post('http://localhost:8000/api/curso-uc-professor/', dataParaEnviar);
            console.log("Associação adicionada:", response.data);
        } catch (error) {
            console.error('Erro ao adicionar associação', error);
        }
    };
    
    
    
    

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Curso:
                <select name="curso" value={selecao.curso} onChange={handleChange}>
                    <option value="">Selecione um Curso</option>
                    {cursos.map(curso => (
                        <option key={curso.id} value={curso.id}>{curso.nome}</option>
                    ))}
                </select>
            </label>

            <label>
                Professor:
                <select name="professor" value={selecao.professor} onChange={handleChange}>
    <option value="">Selecione um Professor</option>
    {professores.map(professor => (
        <option key={professor.id} value={professor.id}>{professor.nome}</option>
    ))}
</select>

            </label>

            <label>
                Unidade Curricular:
                <select name="unidadeCurricular" value={selecao.unidadeCurricular} onChange={handleChange}>
                    <option value="">Selecione uma Unidade Curricular</option>
                    {unidadesCurriculares.map(uc => (
                        <option key={uc.id} value={uc.id}>{uc.nome}</option>
                    ))}
                </select>
            </label>

            <button type="submit">Adicionar Associação</button>
        </form>
    );
};

export default AddCursoUnidadeCurricularProfessor;
