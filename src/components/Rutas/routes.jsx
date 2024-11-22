import React from 'react';
import {createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Estudiantes from '../Estudiantes/Estudiantes';
import Login from '../Login/Login';
import RecuperarContrasena from '../Login/RecuperarContrasena/RecuperarContrasena';
import RegistroEstudiante from '../Login/RegistroEstudiante/RegistroEstudiante';
import Docente from '../Docentes/Docentes';
import { AutenticacionRoute } from './AutenticacionRoute';
import PageHome from '../Plantilla/PageHome';
import MatriculaEstudiante from '../Login/MatriculaEstudiante/MatriculaEstudiante';

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Login />} />
      <Route path="recuperar-contrasena" element={<RecuperarContrasena />} />
      <Route path="/registro-estudiante" element={<RegistroEstudiante />} />
      <Route path="/dashboard-estudiante" element={
        <AutenticacionRoute>
          <Estudiantes />
        </AutenticacionRoute>
      } />
      <Route path="/dashboard-docente" element={
        <AutenticacionRoute>
          <Docente />
        </AutenticacionRoute>
      } />
      <Route path="app/" element={<AutenticacionRoute />}>
        <Route path="home" element={<PageHome />} />
        <Route path="matricula-estudiante" element={<MatriculaEstudiante />} /> {/* Nueva ruta */}
      </Route>
    </Route>
  )
);
