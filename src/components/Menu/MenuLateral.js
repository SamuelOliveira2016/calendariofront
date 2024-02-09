import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <aside className="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 " id="sidenav-main">
            
            {/* Logo do SENAI */}
            <div className="sidenav-header">
                <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
                
                <Link className="navbar-brand m-0 text-center" to={"/painel"}>
                    <img src="./img/logo-senai.png" className="navbar-brand-img h-100" alt="main_logo" />
                </Link>
            </div>

            <hr className="horizontal dark mt-0" />

            {/* Links */}
            <div className="collapse navbar-collapse  w-auto " style={{height: "calc(100vh - 127px)"}}>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to={"/painel"}>
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="ni ni-tv-2 text-primary text-sm opacity-10"></i>
                            </div>
                            <span className="nav-link-text ms-1">Dashboard</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/gerenciamentocursos"}>
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="ni ni-calendar-grid-58 text-warning text-sm opacity-10"></i>
                            </div>
                            <span className="nav-link-text ms-1">Cursos</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to={"/gerenciamentopessoas"}>
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="ni ni-calendar-grid-58 text-warning text-sm opacity-10"></i>
                            </div>
                            <span className="nav-link-text ms-1">Pessoas</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to={"/gerenciamentoprofessor"}>
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="ni ni-calendar-grid-58 text-warning text-sm opacity-10"></i>
                            </div>
                            <span className="nav-link-text ms-1">Docentes</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to={"/gerenciamentodatas"}>
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="ni ni-calendar-grid-58 text-warning text-sm opacity-10"></i>
                            </div>
                            <span className="nav-link-text ms-1">Datas</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to={"/gerenciamentocalendario"}>
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="ni ni-calendar-grid-58 text-warning text-sm opacity-10"></i>
                            </div>
                            <span className="nav-link-text ms-1">Calendario</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    )
}