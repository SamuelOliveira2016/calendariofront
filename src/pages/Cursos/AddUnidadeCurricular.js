import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormGroup from '../../components/Form/FormGroup';

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
        axios.get('http://10.92.6.122:8000/api/cursos/')
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
            const response = await axios.post('http://10.92.6.122:8000/api/unidadecurricular/', unidadeCurricular);
            console.log("Unidade Curricular adicionada:", response.data);
        } catch (error) {
            console.error('Erro ao adicionar unidade curricular', error);
        }
    };

    return (
        <form className='row' onSubmit={handleSubmit}>
            <div className='col-md-6'>
                <FormGroup 
                    id="nome"
                    name="nome"
                    label="Nome do Curso"
                    value={unidadeCurricular.nome}
                    funChange={handleChange}
                />
            </div>

            <div className='col-md-6'>
                <FormGroup 
                    type='select'
                    id="curso"
                    name="curso"
                    label="Nome do Curso"
                    value={unidadeCurricular.curso}
                    funChange={handleChange}
                >
                    <option value="">Selecione um Curso</option>
                    {cursos.map(curso => (
                        <option key={curso.id} value={curso.id}>{curso.nome}</option>
                    ))}
                </FormGroup>
            </div>

            <div className='col-md-6'>
                <FormGroup 
                    type='textarea'
                    id="capacidadeTecnicaFundamentos"
                    name="capacidadeTecnicaFundamentos"
                    label="Capacidade Técnica/Fundamentos"
                    value={unidadeCurricular.capacidadeTecnicaFundamentos}
                    funChange={handleChange}
                />
            </div>

            <div className='col-md-6'>
                <FormGroup 
                    type='textarea'
                    id="capacidadesSociais"
                    name="capacidadesSociais"
                    label="Capacidades Sociais"
                    value={unidadeCurricular.capacidadesSociais}
                    funChange={handleChange}
                />
            </div>

            <div className='col-md-6'>
                <FormGroup 
                    type='number'
                    id="carga_horaria"
                    name="carga_horaria"
                    label="Carga Horária"
                    value={unidadeCurricular.carga_horaria}
                    funChange={handleChange}
                />
            </div>

            <div className='col-md-6'>
                <FormGroup 
                    type='number'
                    id="horas_sala_aula"
                    name="horas_sala_aula"
                    label="Carga Horária Sala de Aula"
                    value={unidadeCurricular.horas_sala_aula}
                    funChange={handleChange}
                />
            </div>

            <div className='col-md-6'>
                <FormGroup 
                    type='number'
                    id="horas_laboratorio"
                    name="horas_laboratorio"
                    label="Carga Horária Laboratório"
                    value={unidadeCurricular.horas_laboratorio}
                    funChange={handleChange}
                />
            </div>

            <div className='col-md-6'>
                <FormGroup 
                    type='number'
                    id="horas_oficina"
                    name="horas_oficina"
                    label="Carga Horária Oficina"
                    value={unidadeCurricular.horas_oficina}
                    funChange={handleChange}
                />
            </div>
            
            <div className='col-md-12'>
                <button className='btn btn-primary' type="submit">Adicionar Unidade Curricular</button>
            </div>
        </form>
    );
};

export default AddUnidadeCurricular;
