import React from "react";
import Content from "../../components/Layout/Content";
import Title from "../../components/Layout/Title";
import Card from "../../components/Layout/Card";
import AddPessoa from "./AddPessoa";
import AddVinculo from "./AddVinculo";
import AddHoraTrabProf from "./AddHoraTrabProf";

export default () => {
    return (
        <Content bg={true}>
            <div className="row">
                <div className="col-md-12">
                    <Title titulo="Gerenciamento de Pessoas" />

                    <Card titulo="Adicionar nova pessoa">
                        <AddPessoa />
                    </Card>

                    <Card titulo="Adicionar Vinculo">
                        <AddVinculo />
                    </Card>

                    <Card titulo="Adicionar Horário de Trabalho e jornada">
                        <AddHoraTrabProf />
                    </Card>
                </div>
            </div>
        </Content>
    );
}