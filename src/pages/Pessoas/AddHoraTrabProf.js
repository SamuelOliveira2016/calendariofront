import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
        axios.get('http://localhost:8000/api/pessoas/')
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
            const response = await axios.post('http://localhost:8000/api/horatrabprof/', horatrabProf);
            console.log(response.data);
            // Resetar o formulário ou redirecionar o usuário
        } catch (error) {
            console.error('Erro ao enviar os dados', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Seletor de Pessoa */}
            <label>
                Pessoa:
                <select name="pessoa" value={horatrabProf.pessoa} onChange={handleChange}>
                    <option value="">Selecione uma Pessoa</option>
                    {pessoas.map(pessoa => (
                        <option key={pessoa.id} value={pessoa.id}>{pessoa.nome}</option>
                    ))}
                </select>
            </label>

           {/* Horário Inicial */}
    <label>
        Horário de Início:
        <input type="time" name="horatrabIni" value={horatrabProf.horatrabIni} onChange={handleChange} />
    </label>

    {/* Horário Final */}
    <label>
        Horário de Fim:
        <input type="time" name="horatrabFim" value={horatrabProf.horatrabFim} onChange={handleChange} />
    </label>

    {/* Dias Selecionados */}
    <label>
        Dias de Trabalho:
        {/* Adicione checkboxes ou um seletor múltiplo para os dias da semana */}
        {/* Exemplo com checkboxes para cada dia */}
        {WEEKDAYS.map((day, index) => (
            <div key={index}>
                <input
                    type="checkbox"
                    name="selected_days"
                    value={day[0]}
                    checked={horatrabProf.selected_days.includes(day[0])}
                    onChange={handleChange}
                />
                {day[1]}
            </div>
        ))}
    </label>

    {/* Quantidade de Horas por Mês */}
    <label>
        Quantidade de Horas por Mês:
        <input type="number" name="quanthorames" value={horatrabProf.quanthorames} onChange={handleChange} />
    </label>

    <button type="submit">Adicionar Horário de Trabalho</button>
</form>
    );
};

export default AddHoraTrabProf;
