import React from 'react';
import '../Styles/Estudiante.scss'
const Estudiante = () => {
    return (
        <div className="dashboard-container">
            <aside className="app-sidebar">
                <div className="sidebar-brand">
                    <a href="/" className="brand-link">
                        <img
                            src="/public/Moodle.ico"
                            alt="Logo"
                            className="brand-image"
                        />
                        <span className="brand-text">Moodle</span>
                    </a>
                </div>
                <div className="sidebar-wrapper">
                    <nav>
                        <ul className="nav sidebar-menu">
                            <li className="nav-item">
                                <a href="/area-personal" className="nav-link">
                                    <i className="nav-icon bi bi-person"></i>
                                    <p>Área Personal</p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="/" className="nav-link">
                                    <i className="nav-icon bi bi-house"></i>
                                    <p>Página Principal del Sitio</p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="/calendario" className="nav-link">
                                    <i className="nav-icon bi bi-calendar"></i>
                                    <p>Calendario</p>
                                </a>
                            </li>
                            <li className="nav-item menu-open">
                                <button className="nav-link" style={{ background: 'none', border: 'none', padding: 0, textAlign: 'left' }}>
                                    <i className="nav-icon bi bi-book"></i>
                                    <p>
                                        Mis Cursos
                                        <i className="nav-arrow bi bi-chevron-right"></i>
                                    </p>
                                </button>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <a href="/curso-1" className="nav-link">
                                            <i className="nav-icon bi bi-circle"></i>
                                            <p>Curso 1</p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/curso-2" className="nav-link">
                                            <i className="nav-icon bi bi-circle"></i>
                                            <p>Curso 2</p>
                                        </a>
                                    </li>
                                    {/* Agrega más cursos aquí */}
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
            <main className="main-content">
                <h2>Dashboard del Estudiante</h2>
                <p>Bienvenido, Estudiante.</p>
            </main>
        </div>
    );
}

export default Estudiante;