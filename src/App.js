import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Docente from './components/Docentes/Docentes';
import Estudiante from './components/Estudiantes/Estudiantes';
import Login from './components/Login/Login';
import RecuperarContrasena from './components/Login/RecuperarContrasena/RecuperarContrasena';

const App = () => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}> 
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="recuperar-contrasena" element = {<RecuperarContrasena />} />
        <Route path="/dashboard-estudiante" element={<Estudiante />} />
        <Route path="/dashboard-docente" element={<Docente />} />
      </Routes>
    </Router>
  );
}

export default App;