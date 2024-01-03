import React, { useContext, createContext } from "react";
import axios from "axios";

const UsuariosContext = createContext({
    buscarUsuario: async () => {},
    buscarUsuarioNombre: async () => {},
});

const UsuariosServiceProvider = ({children}) => {
    const url = "http://localhost:9000/usuarios";

    const buscarUsuarioNombre = async (userName) => {
        const res = await axios.get(`${url}/buscar/nombre/${userName}`);

        if(res){
            return res.data;
        }

        return null;
    }

    const buscarUsuario = async (pk) => {
        const res = await axios.get(`${url}/buscar/${pk}`);

        if(res){
            return res.data;
        }

        return null;
    }

    return (
        <UsuariosContext.Provider value={{
                buscarUsuario,
                buscarUsuarioNombre
            }}
        >
            {children}
        </UsuariosContext.Provider>
    );
}

const useUsuarios = () => useContext(UsuariosContext);

export { UsuariosServiceProvider, useUsuarios };