import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormGroup from "../../components/Form/FormGroup";

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
        axios.get('http://10.92.6.122:8000/api/cursos/')
            .then(res => setCursos(res.data))
            .catch(err => console.error("Erro ao carregar cursos", err));

        axios.get('http://10.92.6.122:8000/api/professores/')
            .then(res => setProfessores(res.data))
            .catch(err => console.error("Erro ao carregar professores", err));
    }, []);

    const carregarUnidadesCurriculares = (cursoId) => {
        axios.get(`http://10.92.6.122:8000/api/curso-uc-professor/${cursoId}/`)
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
            const response = await axios.post('http://10.92.6.122:8000/api/curso-uc-professor/', dataParaEnviar);
            console.log("Associação adicionada:", response.data);
        } catch (error) {
            console.error('Erro ao adicionar associação', error);
        }
    };
    
    
    
    

    return (
        <form className="row" onSubmit={handleSubmit}>
            <div className='col-md-4'>
                <FormGroup
                    type="select"
                    id="curso"
                    name="curso"
                    label="Curso"
                    value={selecao.curso}
                    funChange={handleChange}
                >
                    <option value="" disabled>Selecione um Curso</option>
                    {cursos.map(curso => (
                        <option key={curso.id} value={curso.id}>{curso.nome}</option>
                    ))}
                </FormGroup>
            </div>

            <div className='col-md-4'>
                <FormGroup
                    type="select"
                    id="professor"
                    name="professor"
                    label="Professor"
                    value={selecao.professor}
                    funChange={handleChange}
                >
                    <option value="">Selecione um Professor</option>
                    {professores.map(professor => (
                        <option key={professor.id} value={professor.id}>{professor.nome}</option>
                    ))}
                </FormGroup>
            </div>


            <div className='col-md-4'>
                <FormGroup
                    type="select"
                    id="unidadeCurricular"
                    name="unidadeCurricular"
                    label="Unidade Curricular"
                    value={selecao.unidadeCurricular}
                    funChange={handleChange}
                >
                    <option value="">Selecione uma Unidade Curricular</option>
                    {unidadesCurriculares.map(uc => (
                        <option key={uc.id} value={uc.id}>{uc.nome}</option>
                    ))}
                </FormGroup>
            </div>

            <div className="col-md-12">
                <button className="btn btn-primary" type="submit">Adicionar Associação</button>
            </div>
        </form>
    );
};

export default AddCursoUnidadeCurricularProfessor;
