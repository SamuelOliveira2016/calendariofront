import React from "react";
import Content from "../../components/Layout/Content";
import Title from "../../components/Layout/Title";
import Card from "../../components/Layout/Card";
import AulaForm from "./AulaForm";
import BigCalendar from "./BigCalendar";

export default () => {
    return (
        <Content bg={true}>
            <div className="row">
                <div className="col-md-12">
                    <Title titulo="Gerenciamento de Calendários" />

                    <Card titulo="Calendário">
                        <AulaForm />
                        <BigCalendar />
                    </Card>
                </div>
            </div>
        </Content>
    );
}