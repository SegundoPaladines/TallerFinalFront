import React, { useContext, createContext } from "react";
import axios from "axios";

const SolicitudesContext = createContext({
    getSolicitudes: async () => {},
    buscarSolicitud: async (pk) => {},
    enviarSolicitud: async (pk) => {},
    buscarSolicitudesUsuario: async (pk) => {},
    eliminarSolicitud: async () => {},
});

const SolicitudesServiceProvider = ({children}) => {

    const url = "http://localhost:9000/solicitudes";

    const getSolicitudes = async() => {
        const res = await axios.get(`${url}`);

        if(res.data){
            return res.data;
        }

        return null;
    }

    const buscarSolicitud = async (pk) => {
        const res =  await axios.get(`${url}/buscar/${pk}`);

        if(res.data){
            return res.data;
        }

        return null;
    }

    const buscarSolicitudesUsuario = async (pk) => {
        const res =  await axios.get(`${url}/buscar/usuario/${pk}`);

        if(res.data){
            return res.data;
        }

        return null;
    }

    const eliminarSolicitud = async (pk) => {
        let r = "";  
        
        await axios.delete(`${url}/eliminar/${pk}`).then((res) => {
            r = "success";
        }).catch((e) => {r = "error";});
    
        return r;
    }

    const enviarSolicitud = async (parametros) => {
        let r = "";

        await axios({
            method:'POST',
            url:`${url}/crear`,
            data:parametros
        }).then(async (res) => {r= "success";}).catch((e)=>{r="error";});

        return r;
    }

    return(
        <SolicitudesContext.Provider value={{
                getSolicitudes, 
                buscarSolicitud, 
                enviarSolicitud,
                buscarSolicitudesUsuario,
                eliminarSolicitud
            }}
        >
            {children}
        </SolicitudesContext.Provider>
    );
}

const useSolicitudes = () => useContext(SolicitudesContext);

export {SolicitudesServiceProvider, useSolicitudes};