import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddUnidadeCurricular = () => {
    const [unidadeCurricular, setUnidadeCurricular] = useState({
        nome: '',
        capacidadeTecnicaFundamentos: '',
        capacidadesSociais: '',
        carga_horaria: 0,
        curso: '',
        horas_sala_aula: 0,
        horas_laboratorio: 0,
        horas_oficina: 0,
        horasRestantes: 0,
    });
    const [cursos, setCursos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/cursos/')
            .then(res => setCursos(res.data))
            .catch(err => console.error("Erro ao carregar cursos", err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name === 'carga_horaria' || name === 'horas_sala_aula' || name === 'horas_laboratorio' || name === 'horas_oficina') {
            // Convertendo o valor para um número (ou 0 se for uma string vazia ou inválida)
            const numericValue = value ? parseInt(value, 10) : 0;
    
            // Calculando as horas restantes imediatamente após a atualização do estado
            setUnidadeCurricular(cur => {
                const updatedState = { ...cur, [name]: numericValue };
                const horasTotal = ['horas_sala_aula', 'horas_laboratorio', 'horas_oficina']
                    .reduce((acc, key) => acc + (key === name ? numericValue : (updatedState[key] || 0)), 0);
                const horasRestantesAtualizadas = updatedState.carga_horaria - horasTotal;
                return { ...updatedState, horasRestantes: horasRestantesAtualizadas };
            });
        } else {
            // Para campos não numéricos, simplesmente atualiza o valor
            setUnidadeCurricular(cur => ({ ...cur, [name]: value }));
        }
    };
    
    
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Enviando unidade curricular:", unidadeCurricular); // Depuração

        if (unidadeCurricular.horasRestantes !== 0) {
            console.error('A distribuição das horas não coincide com a carga horária.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8000/api/unidadecurricular/', unidadeCurricular);
            console.log("Unidade Curricular adicionada:", response.data);
        } catch (error) {
            console.error('Erro ao adicionar unidade curricular', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nome:
                <input type="text" name="nome" value={unidadeCurricular.nome} onChange={handleChange} />
            </label>
            <label>
                Curso:
                <select name="curso" value={unidadeCurricular.curso} onChange={handleChange}>
                    <option value="">Selecione um Curso</option>
                    {cursos.map(curso => (
                        <option key={curso.id} value={curso.id}>{curso.nome}</option>
                    ))}
                </select>
            </label>

            <label>
                Capacidade Técnica/Fundamentos:
                <textarea name="capacidadeTecnicaFundamentos" value={unidadeCurricular.capacidadeTecnicaFundamentos} onChange={handleChange} />
            </label>

            <label>
                Capacidades Sociais:
                <textarea name="capacidadesSociais" value={unidadeCurricular.capacidadesSociais} onChange={handleChange} />
            </label>

            <label>
                Carga Horária:
                <input type="number" name="carga_horaria" value={unidadeCurricular.carga_horaria} onChange={handleChange} />
            </label>


            
            <label>
                Carga Horária Sala de Aula:
                <input type="number" name="horas_sala_aula" value={unidadeCurricular.horas_sala_aula} onChange={handleChange} />
            </label>
            <label>
                Carga Horária Laboratório:
                <input type="number" name="horas_laboratorio" value={unidadeCurricular.horas_laboratorio} onChange={handleChange} />
            </label>
            <label>
                Carga Horária Oficina:
                <input type="number" name="horas_oficina" value={unidadeCurricular.horas_oficina} onChange={handleChange} />
            </label>

            <button type="submit">Adicionar Unidade Curricular</button>
        </form>
    );
};

export default AddUnidadeCurricular;
