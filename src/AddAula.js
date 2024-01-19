import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddAula = () => {
    const [aula, setAula] = useState({
        curso_uc_professor: '',
        infraestrutura: '',
        horario_inicio: '',
        horario_fim: ''
    });
    const [cursoUCProfessores, setCursoUCProfessores] = useState([]);
    const [infraestruturas, setInfraestruturas] = useState([]);
    const [horasDetalhes, setHorasDetalhes] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8000/api/curso-uc-professor/')
            .then(res => {
                console.log("Cursos UC Professores carregados:", res.data);
                setCursoUCProfessores(res.data);
            })
            .catch(err => console.log(err));

        axios.get('http://localhost:8000/api/infraestruturas/')
            .then(res => {
                setInfraestruturas(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("Campo alterado:", name, "Valor:", value);
        setAula({ ...aula, [name]: value });
    
        if (name === 'curso_uc_professor') {
            console.log("ID para encontrar:", value);
            //const selecionado = cursoUCProfessores.find(c => c.unidadeCurricular.id.toString() === value);
            const selecionado = cursoUCProfessores.find(c => c.id.toString() === value);

            console.log("Selecionado:", selecionado);
            if (selecionado && selecionado.unidadeCurricular) {
                setHorasDetalhes({
                horasSalaAula: selecionado.unidadeCurricular.horas_sala_aula,
                horasLaboratorio: selecionado.unidadeCurricular.horas_laboratorio,
                horasOficina: selecionado.unidadeCurricular.horas_oficina
                });
            } else {
                // Tratar caso não encontre ou não tenha unidadeCurricular
                setHorasDetalhes({});
            }
        }
    };
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/aulas/', aula);
            // Tratamento da resposta - ex.: exibir mensagem de sucesso
        } catch (error) {
            console.error('Erro ao enviar os dados', error);
            // Tratamento do erro - ex.: exibir mensagem de erro
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* ... campos de seleção e horários ... */}
            <select name="curso_uc_professor" value={aula.curso_uc_professor} onChange={handleChange}>
    <option value="">Selecione o Curso/UC/Professor</option>
    {cursoUCProfessores.map((item, index) => (
        <option key={`${item.curso.id}-${item.unidadeCurricular.id}-${index}`} value={item.id}>
        {`${item.curso.nome} - ${item.unidadeCurricular.nome} - Professor: ${item.professor && item.professor.pessoa ? item.professor.pessoa.nome : "Não definido"}`}
    </option>
    
    ))}
</select>


            <select name="infraestrutura" value={aula.infraestrutura} onChange={handleChange}>
                <option value="">Selecione a Infraestrutura</option>
                {infraestruturas.map(infra => (
                    // Supondo que cada 'infra' tenha um campo 'id' único
                    <option key={infra.id} value={infra.id}>{infra.nome}</option>
    ))}
</select>

<label htmlFor="horario_inicio">Horário de Início:</label>
            <input 
                type="time" 
                id="horario_inicio" 
                name="horario_inicio" 
                value={aula.horario_inicio} 
                onChange={handleChange} 
            />

            <label htmlFor="horario_fim">Horário de Fim:</label>
            <input 
                type="time" 
                id="horario_fim" 
                name="horario_fim" 
                value={aula.horario_fim} 
                onChange={handleChange} 
            />

            {aula.curso_uc_professor && (
                <div>
                    <p>Horas em Sala de Aula: {horasDetalhes.horasSalaAula}</p>
                    <p>Horas em Laboratório: {horasDetalhes.horasLaboratorio}</p>
                    <p>Horas em Oficina: {horasDetalhes.horasOficina}</p>
                </div>
            )}

            <button type="submit">Criar Aula</button>
        </form>
    );
};

export default AddAula;
