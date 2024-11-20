import {Navigate, Outlet} from "react-router-dom";
import {useContextUsuario} from "../Contexto/usuario/UsuarioContext";
import {mostraAlertaError} from "../SweetAlert/SweetAlert";

export const AutenticacionRoute = ({children}) =>{
    const {token} = useContextUsuario();
    if(!token){
        mostraAlertaError("Token Invalido");
        return <Navigate to="/"/>;
    }
    return <Outlet></Outlet>
};