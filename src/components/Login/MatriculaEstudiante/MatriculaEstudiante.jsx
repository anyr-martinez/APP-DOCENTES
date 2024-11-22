import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const MatriculaEstudiante = () => {
    return (
        <div className="container my-5">
            <h1 className="text-center">Bienvenido</h1>
            <p className="text-center">Seleccione el sistema al que desea acceder.</p>
            <div className="row">
                <div className="col-sm-6 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Proceso de Admisión</h5>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Aula Virtual</h5>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Bibliotecas</h5>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Biblioteca Virtual McGraw Hill</h5>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 mb-4">
                    <div className="card bg-success text-white">
                        <div className="card-body">
                            <h5 className="card-title">Registro 2023 Matrícula</h5>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Servicios Académicos</h5>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Moodle 2024 (Nuevo)</h5>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Moodle ICB</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MatriculaEstudiante;
