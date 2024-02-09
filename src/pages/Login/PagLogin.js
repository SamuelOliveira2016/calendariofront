import React from 'react';
import FormLogin from "./FormLogin"

export default () => {
    return (
        <main className="main-content  mt-0">
            <section>
                <div className="page-header min-vh-100">
                    <div className="container">
                        <div className="row">
                            <FormLogin />
                            <div className="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column">
                                <div className="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden" style={{backgroundImage: "url('./img/fundo-login.png')", backgroundSize: "cover"}}>
                                    <h4 className="mt-5 text-white font-weight-bolder position-relative">Controle de Cursos</h4>
                                    <p className="text-white position-relative">Sistema de controle de cursos e calendario escolar.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}