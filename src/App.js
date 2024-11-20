import React from 'react';
import {routes} from './components/Rutas/routes';
import {RouterProvider} from 'react-router-dom';
import  UsuarioState from './components/Contexto/usuario/UsuarioState';
import Modal from 'react-modal';

// Definir el elemento 'app' de la aplicacion 
Modal.setAppElement('#root');  
function App(){
  return(
    <UsuarioState>
      <RouterProvider router={routes}>
      </RouterProvider>
    </UsuarioState>
  )
}

export default App;