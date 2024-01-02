import React, { useContext, createContext } from "react";
import axios from "axios";

const MascotasContext = createContext({
    getMascotas: async () => {},
    buscarMascota: async (pk) => {},
    actualizarMascota: async(pk, dataset) => {},
});

const MascotasServiceProvider = ({children}) => {
    const url = "http://localhost:9000/mascotas";

    const getMascotas = async() => {
        const res = await axios.get(`${url}`);

        if(res.data){
            return res.data;
        }

        return null;
    }

    const buscarMascota = async (pk) => {
        const res =  await axios.get(`${url}/buscar/${pk}`);

        if(res.data){
            return res.data;
        }

        return null;
    }

    const actualizarMascota = async (pk, dataset) => {
        
        let r = "";

        await axios({
            method:'PUT',
            url:`${url}/actualizar/${pk}`,
            data:dataset
        }).then((res) => {r = "success";}).catch((e) => {r = "error";});
    
        return r;
    }

    return(
        <MascotasContext.Provider value={{ getMascotas, buscarMascota, actualizarMascota }}>
            {children}
        </MascotasContext.Provider>
    );
}

const useMascotas = () => useContext(MascotasContext);

export {MascotasServiceProvider, useMascotas};