import React from 'react';
import MenuLateral from "../Menu/MenuLateral"

export default ({children, bg = false}) => {
    return (
        <>
            {bg && <div className="min-height-300 bg-primary position-absolute w-100"></div>}
            
            {/* Menu Lateral */}
            <MenuLateral />

            <main className="main-content position-relative border-radius-lg ">
                <div className="container-fluid py-4">

                    {/* Todo o Conteudo */}
                    <div style={{minHeight: "calc(100vh - 90px)"}}>
                        {children}
                    </div>

                    <footer className="footer pt-3">
                        <div className="container-fluid">
                            <div className="row align-items-center justify-content-lg-between">
                                <div className="col-lg-12 mb-lg-0 mb-4">
                                    <div className="copyright text-center text-sm text-muted text-lg-start">
                                        © {new Date().getFullYear()}, Desenvolvido por SENAI SP 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </main>
        </>
    )
}