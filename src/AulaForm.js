import React, { useState, useEffect } from 'react';
import axios from 'axios';
export default AulaForm; // Exportação padrão


function AulaForm() {
    const [aulas, setAulas] = useState([]);
    const [selectedAula, setSelectedAula] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/api/aulas/')
            .then(res => {
                setAulas(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/alocar_aula/', { aulaId: selectedAula })
            .then(response => {
                // Tratar a resposta, talvez atualizar o calendário
            })
            .catch(error => console.error('Erro ao alocar aula', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <select value={selectedAula} onChange={e => setSelectedAula(e.target.value)}>
                {console.log(aulas)}
                <option value="">Selecione uma Aula</option>
                {aulas.map(aula => (
                    <option key={aula.id} value={aula.id}>{aula.curso_uc_professor.curso.nome}</option>
                ))}
            </select>
            <button type="submit">Alocar Aula</button>
        </form>
    );
}
