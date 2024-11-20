import React from 'react';
import {Navigate, Route, createBrowserRouter,createRoutesFromElements} from 'react-router-dom';
import Docente from './components/Docentes/Docentes';
import Estudiantes from './components/Estudiantes/Estudiantes';
import Login from './components/Login/Login';
import RecuperarContrasena from './components/Login/RecuperarContrasena/RecuperarContrasena';
import RegistroEstudiante from './components/Login/RegistroEstudiante/RegistroEstudiante';


export const routes = createBrowserRouter(
    createRoutesFromElements(
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}> 
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="recuperar-contrasena" element = {<RecuperarContrasena />} />
          <Route path="/registro-estudiante" element={<RegistroEstudiante />} />
          <Route path="/dashboard-estudiante" element={<Estudiantes />} />
          <Route path="/dashboard-docente" element={<Docente />} />
        </Routes>
    </Router>
    )
)