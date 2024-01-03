import React, { useContext, createContext } from "react";
import axios from "axios";

const UsuariosContext = createContext({
    buscarUsuario: async () => {},
    buscarUsuarioNombre: async () => {},
    crearUsuario: async () => {},
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

    const crearUsuario = async (dataset) => {
        let r = "";

        await axios({
            method:'POST',
            url:`${url}/crear`,
            data:dataset
        }).then(async (res) => {r = "success";}).catch((e)=>{r = "error";});

        return r;
    }

    return (
        <UsuariosContext.Provider value={{
                buscarUsuario,
                buscarUsuarioNombre,
                crearUsuario
            }}
        >
            {children}
        </UsuariosContext.Provider>
    );
}

const useUsuarios = () => useContext(UsuariosContext);

export { UsuariosServiceProvider, useUsuarios };