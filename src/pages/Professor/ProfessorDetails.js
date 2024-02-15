import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormGroup from "../../components/Form/FormGroup";

const ProfessorDetails = () => {
    const [professores, setProfessores] = useState([]);
    const [selectedProfessorId, setSelectedProfessorId] = useState('');
    const [detalhesProfessor, setDetalhesProfessor] = useState(null);

    // Carregar professores ao montar o componente
    useEffect(() => {
        axios.get('http://localhost:8000/api/professores/')
            .then(res => setProfessores(res.data))
            .catch(err => console.error("Erro ao carregar professores", err));
    }, []);

    // Carregar detalhes do professor quando um é selecionado
    useEffect(() => {
        if (selectedProfessorId) {
            axios.get(`http://localhost:8000/api/professor-details/${selectedProfessorId}/`)
                .then(res => setDetalhesProfessor(res.data))
                .catch(err => console.error("Erro ao carregar detalhes do professor", err));
        }
    }, [selectedProfessorId]);

    const handleProfessorChange = (event) => {
        setSelectedProfessorId(event.target.value);
        setDetalhesProfessor(null);  // Resetar detalhes ao trocar de professor
    };

    return (
        <div className="row">
            <div className='col-md-12'>
                <FormGroup
                    type="select"
                    id="selc_professor"
                    name="selc_professor"
                    label="Selecione um professor"
                    value={selectedProfessorId}
                    funChange={handleProfessorChange}
                >
                    <option value="">Selecione um Professor</option>
                    {professores.map(professor => (
                        <option key={professor.id} value={professor.id}>{professor.nome}</option>
                    ))}
                </FormGroup>
            </div>

            {detalhesProfessor && (
                <div>
                    {/* Exibindo informações de horas de trabalho e dias da semana da Pessoa associada */}
                    {/* Exibindo informações de horário de trabalho */}
                    {detalhesProfessor.horarios_trabalho.map((horario, index) => (
                        <div key={index}>
                            <p>Horário de Trabalho: {horario.horatrabIni} - {horario.horatrabFim}</p>
                            <p>Dias da Semana: {horario.selected_days.join(', ')}</p>
                            <p>Total de Horas por Mês: {horario.quanthorames}</p>
                        </div>
                    ))}
                    <table>
                        <thead>
                            <tr>
                                <th>Curso</th>
                                <th>Unidade Curricular</th>
                                <th>Carga Horária</th>
                                <th>Capacidades Sociais</th>
                                <th>Capacidade Técnica Fundamentos</th>
                                <th>Horas em Sala de Aula</th>
                                <th>Horas em Laboratório</th>
                                <th>Horas em Oficina</th>
                                {/* Outros cabeçalhos de coluna conforme necessário */}
                            </tr>
                        </thead>
                        <tbody>
                            {detalhesProfessor.cursos_unidades_curriculares.map((cuc, index) => (
                                <tr key={`${cuc.curso.id}-${index}`}>
                                    <td>{cuc.curso.nome}</td>
                                    <td>{cuc.unidadeCurricular.nome}</td>
                                    <td>{cuc.unidadeCurricular.carga_horaria}</td>
                                    <td>{cuc.unidadeCurricular.capacidadesSociais}</td>
                                    <td>{cuc.unidadeCurricular.capacidadeTecnicaFundamentos}</td>
                                    <td>{cuc.unidadeCurricular.horas_sala_aula}</td>
                                    <td>{cuc.unidadeCurricular.horas_laboratorio}</td>
                                    <td>{cuc.unidadeCurricular.horas_oficina}</td>
                                    {/* Outras células conforme necessário */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ProfessorDetails;
