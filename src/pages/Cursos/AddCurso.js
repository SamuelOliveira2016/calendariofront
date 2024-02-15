import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormGroup from '../../components/Form/FormGroup';

const AddCurso = () => {
    const [curso, setCurso] = useState({
        nome: '',
        quantidade_horas_total: '',
        tipo_curso: '',
        area_tecnologica: ''
    });
    const [tiposCurso, setTiposCurso] = useState([]);
    const [areasTecnologicas, setAreasTecnologicas] = useState([]);

    useEffect(() => {
        // Carregar tipos de curso
        axios.get('http://10.92.6.122:8000/api/tipocurso/')
            .then(res => setTiposCurso(res.data))

            .catch(err => console.error("Erro ao carregar tipos de curso", err));

        // Carregar áreas tecnológicas
        axios.get('http://10.92.6.122:8000/api/areastecnologicas/')
            .then(res => setAreasTecnologicas(res.data))
            .catch(err => console.error("Erro ao carregar áreas tecnológicas", err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`Campo alterado - ${name}: ${value}`); // Aqui
        setCurso({ ...curso, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Enviando dados do curso:', curso); // Aqui

        try {
            await axios.post('http://10.92.6.122:8000/api/cursos/', curso);
            // Tratar sucesso
        } catch (error) {
            console.error('Erro ao adicionar curso', error);
            // Tratar erro
        }
    };
    console.log('Tipos de Curso no estado:', tiposCurso); // Aqui

    return (
        <form className='row' onSubmit={handleSubmit}>
            {/* Campos para nome e horas */}
            <div className='col-md-6'>
                <FormGroup 
                    id="nome"
                    name="nome"
                    label="Nome do Curso"
                    value={curso.nome}
                    funChange={handleChange}
                />
            </div>

            <div className='col-md-6'>
                <FormGroup 
                    type="number"
                    id="quantidade_horas_total"
                    name="quantidade_horas_total"
                    label="Quantidade de Horas Total"
                    value={curso.quantidade_horas_total}
                    funChange={handleChange}
                />
            </div>

            {/* Seletor de Tipo de Curso */}
            <div className='col-md-6'>
                <FormGroup 
                    type="select"
                    id="tipo_curso"
                    name="tipo_curso"
                    label="Tipo de Curso"
                    value={curso.tipo_curso}
                    funChange={handleChange}
                >
                    <option value="" disabled>Selecione o Tipo de Curso</option>
                    {tiposCurso.map(tipo => (
                        <option key={tipo.id} value={tipo.id}>{tipo.nome_tipo_curso}</option>
                    ))}
                </FormGroup>
            </div>


            {/* Seletor de Área Tecnológica */}
            <div className='col-md-6'>
                <FormGroup 
                    type="select"
                    id="area_tecnologica"
                    name="area_tecnologica"
                    label="Área Tecnológica"
                    value={curso.area_tecnologica}
                    funChange={handleChange}
                >
                    <option value="" disabled>Selecione uma Área Tecnológica</option>
                    {areasTecnologicas.map(area => (
                        <option key={area.id} value={area.id}>{area.nome}</option>
                    ))}
                </FormGroup>
            </div>

            <div className='col-md-12'>
                <button className='btn btn-primary' type="submit">
                    Adicionar Curso
                </button>
            </div>
        </form>
    );
};

export default AddCurso;
