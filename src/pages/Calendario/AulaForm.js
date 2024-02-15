import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormGroup from "../../components/Form/FormGroup";
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
        <form className="row" onSubmit={handleSubmit}>
            <div className='col-md-12'>
                <FormGroup
                    type="select"
                    id="busca"
                    name="busca"
                    label="Selecione uma Aula"
                    value={selectedAula}
                    setValue={setSelectedAula}
                >
                    <option value="">Selecione uma Aula</option>
                    {aulas.map(aula => (
                        <option key={aula.id} value={aula.id}>{aula.curso_uc_professor.curso.nome}</option>
                    ))}
                </FormGroup>
            </div>

            <div className={"col-md-12"}>
                <button className="btn btn-primary" type="submit">Alocar Aula</button>
            </div>
        </form>
    );
}
