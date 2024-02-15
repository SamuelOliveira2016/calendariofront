import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormGroup from "../../components/Form/FormGroup";

const AddHoraTrabProf = () => {
    const [horatrabProf, setHoratrabProf] = useState({
        pessoa: '',
        horatrabIni: '',
        horatrabFim: '',
        selected_days: [],
        quanthorames: ''
    });
    const [pessoas, setPessoas] = useState([]);

    // Definição dos dias da semana
    const WEEKDAYS = [
        ["Seg", "Segunda"],
        ["Ter", "Terça"],
        ["Qua", "Quarta"],
        ["Qui", "Quinta"],
        ["Sex", "Sexta"],
        ["Sab", "Sábado"],
        ["Dom", "Domingo"]
    ];

    useEffect(() => {
        axios.get('http://10.92.6.122:8000/api/pessoas/')
            .then(res => {
                console.log("Pessoas carregadas:", res.data); 
                setPessoas(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
    
        let updatedValue = value;
        if (name === 'pessoa' || name === 'quanthorames') {
            // Converte para inteiro (para 'pessoa' e 'quanthorames')
            updatedValue = parseInt(value, 10) || '';
        } else if (type === 'checkbox') {
            // Trata a seleção de múltiplos dias
            updatedValue = checked
                ? [...horatrabProf.selected_days, value]
                : horatrabProf.selected_days.filter(day => day !== value);
        }
    
        setHoratrabProf({ ...horatrabProf, [name]: updatedValue });
    };
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Enviando dados:", horatrabProf); 
        try {
            const response = await axios.post('http://10.92.6.122:8000/api/horatrabprof/', horatrabProf);
            console.log(response.data);
            // Resetar o formulário ou redirecionar o usuário
        } catch (error) {
            console.error('Erro ao enviar os dados', error);
        }
    };

    return (
        <form className="row" onSubmit={handleSubmit}>
            <div className="col-md-3">
                <div className="form-group">
                    <label>Dias de Trabalho:</label>
                    {/* Adicione checkboxes ou um seletor múltiplo para os dias da semana */}
                    {/* Exemplo com checkboxes para cada dia */}
                    {WEEKDAYS.map((day, index) => (
                        <div key={index}>
                            <input
                                type="checkbox"
                                name="selected_days"
                                id={day[0]}
                                value={day[0]}
                                checked={horatrabProf.selected_days.includes(day[0])}
                                onChange={handleChange}
                            />
                            <label htmlFor={day[0]}>{day[1]}</label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="col-md-9">
                <div className="row">
                    {/* Seletor de Pessoa */}
                    <div className='col-md-12'>
                        <FormGroup
                            type="select"
                            id="pessoa"
                            name="pessoa"
                            label="Pessoa"
                            value={horatrabProf.pessoa}
                            funChange={handleChange}
                        >
                            <option value="">Selecione uma Pessoa</option>
                            {pessoas.map(pessoa => (
                                <option key={pessoa.id} value={pessoa.id}>{pessoa.nome}</option>
                            ))}
                        </FormGroup>
                    </div>

                    {/* Horário Inicial */}
                    <div className='col-md-6'>
                        <FormGroup
                            type="time"
                            id="horatrabIni"
                            name="horatrabIni"
                            label="Horário de Início"
                            value={horatrabProf.horatrabIni}
                            funChange={handleChange}
                        />
                    </div>

                    {/* Horário Final */}
                    <div className='col-md-6'>
                        <FormGroup
                            type="time"
                            id="horatrabFim"
                            name="horatrabFim"
                            label="Horário de Fim"
                            value={horatrabProf.horatrabFim}
                            funChange={handleChange}
                        />
                    </div>

                    {/* Quantidade de Horas por Mês */}
                    <div className='col-md-12'>
                        <FormGroup
                            type="number"
                            id="quanthorames"
                            name="quanthorames"
                            label="Quantidade de Horas por Mês"
                            value={horatrabProf.quanthorames}
                            funChange={handleChange}
                        />
                    </div>
                </div>
            </div>



            <div className="col-md-12">
                <button className="btn btn-primary" type="submit">Adicionar Horário de Trabalho</button>
            </div>
        </form>
    );
};

export default AddHoraTrabProf;
