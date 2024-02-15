import React from "react";
import Content from "../../components/Layout/Content";
import Title from "../../components/Layout/Title";
import Card from "../../components/Layout/Card";
import AddProfessor from "./AddProfessor";
import AddCursoUnidadeCurricularProfessor from "./AddCursoUnidadeCurricularProfessor";
import ProfessorDetails from "./ProfessorDetails";

export default () => {
    return (
        <Content bg={true}>
            <div className="row">
                <div className="col-md-12">
                    <Title titulo={"Gerenciamento de Professor"} />

                    <Card titulo={"Adicionar Professor"}>
                        <AddProfessor />
                    </Card>

                    <Card titulo={"Adicionar Professor ao Curso"}>
                        <AddCursoUnidadeCurricularProfessor />
                    </Card>

                    <Card titulo={"Detalhes Professor"}>
                        <ProfessorDetails />
                    </Card>
                </div>
            </div>
        </Content>
    );
}