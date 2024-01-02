import React, { useContext, createContext } from "react";
import axios from "axios";

const SolicitudesContext = createContext({
    getSolicitudes: async () => {},
    buscarSolicitud: async (pk) => {},
    enviarSolicitud: async (pk) => {},
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
        <SolicitudesContext.Provider value={{ getSolicitudes, buscarSolicitud, enviarSolicitud }}>
            {children}
        </SolicitudesContext.Provider>
    );
}

const useSolicitudes = () => useContext(SolicitudesContext);

export {SolicitudesServiceProvider, useSolicitudes};