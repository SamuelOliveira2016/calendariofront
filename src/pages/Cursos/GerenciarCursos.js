import React from 'react';
import Content from "../../components/Layout/Content"
import AddUnidadeCurricular from "./AddUnidadeCurricular"
import AddAreaTecnologica from "./AddAreaTecnologica"
import AddCurso from "./AddCurso"
import Card from '../../components/Layout/Card';
import Title from '../../components/Layout/Title';

export default () => {
    return (
        <Content bg={true}>
            <div className="row">
                <div className="col-md-12">
                    <Title titulo="Gerenciamento de Cursos" />
                
                    <Card titulo='Adiciona Áreas Tecnológicas'>
                        <AddAreaTecnologica />
                    </Card>

                    <Card titulo='Adicionar Curso'>
                        <AddCurso />
                    </Card>

                    <Card titulo='Adicionar Unidade Curricular'>
                        <AddUnidadeCurricular />
                    </Card>
                </div> 
            </div>
        </Content>
    )
}