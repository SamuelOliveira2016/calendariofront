import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
        axios.get('http://localhost:8000/api/tipocurso/')
            .then(res => setTiposCurso(res.data))

            .catch(err => console.error("Erro ao carregar tipos de curso", err));

        // Carregar áreas tecnológicas
        axios.get('http://localhost:8000/api/areastecnologicas/')
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
            await axios.post('http://localhost:8000/api/cursos/', curso);
            // Tratar sucesso
        } catch (error) {
            console.error('Erro ao adicionar curso', error);
            // Tratar erro
        }
    };
    console.log('Tipos de Curso no estado:', tiposCurso); // Aqui

    return (
        <form onSubmit={handleSubmit}>
            {/* Campos para nome e horas */}
            <label>
                Nome do Curso:
                <input type="text" name="nome" value={curso.nome} onChange={handleChange} />
            </label>
            <label>
                Quantidade de Horas Total:
                <input type="number" name="quantidade_horas_total" value={curso.quantidade_horas_total} onChange={handleChange} />
            </label>

            {/* Seletor de Tipo de Curso */}
            <label>
            Tipo de Curso:
            <select name="tipo_curso" value={curso.tipo_curso} onChange={handleChange}>
            <option value="">Selecione o Tipo de Curso</option>
            {tiposCurso.map(tipo => (
            <option key={tipo.id} value={tipo.id}>{tipo.nome_tipo_curso}</option>
            ))}
    </select>
</label>

            {/* Seletor de Área Tecnológica */}
            <label>
                Área Tecnológica:
                <select name="area_tecnologica" value={curso.area_tecnologica} onChange={handleChange}>
                    <option value="">Selecione uma Área Tecnológica</option>
                    {areasTecnologicas.map(area => (
                        <option key={area.id} value={area.id}>{area.nome}</option>
                    ))}
                </select>
            </label>

            <button type="submit">Adicionar Curso</button>
        </form>
    );
};

export default AddCurso;
