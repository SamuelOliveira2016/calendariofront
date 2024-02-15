import React from "react";
import Content from "../../components/Layout/Content";
import Title from "../../components/Layout/Title";
import Card from "../../components/Layout/Card";
import CalendarioAcademico from "./CalendarioAcademico";
import AddEventos from "./AddEventos";
import AddAula from "./AddAula";

export default () => {
    return (
        <Content bg={true}>
            <div className="row">
                <div className="col-md-12">
                    <Title titulo="Gerenciar Datas" />

                    <Card titulo="Calendário Acadêmico">
                        <CalendarioAcademico />
                    </Card>

                    <Card titulo="Adicione Eventos ao seu Calendário Acadêmico">
                        <AddEventos />
                    </Card>

                    <Card titulo="Adicione as Aulas">
                        <AddAula />
                    </Card>
                </div>
            </div>
        </Content>
    );
}