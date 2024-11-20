import React, {useEffect, useReducer, useState} from 'react';
import {UsuarioContext} from '../usuario/UsuarioContext';
import {useSessionStorage} from '../usuario/UsuarioContext';

const UsuarioState = (props) =>{    
    const [usuario, setUsuario] = useSessionStorage("usuario", null);
    const [token, setToken] = useSessionStorage("toke_almacenado",null);
    const setCerrarSesion = ()=>{
        setUsuario(null);
        setToken(null);
    }
    const setLogin = async (data)=>{
        try{
            setUsuario(data.usuario);
            setToken(data.token);
        } catch (error){
            console.log(error);
        }
    }
    return (
        <UsuarioContext.Provider value={{
            usuario: usuario,
            token: token,
            setLogin,
            setCerrarSesion,
        }}>
            {props.children}
        </UsuarioContext.Provider>
    )
}

export default UsuarioState;