import React, { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext({
    user:{},
    isAutenticated: false,
    getAccessToken: () => {},
    saveUser: (usuario) => {},
    getRefreshToken: () => {},
    finalizarSesion: () => {},
    iniciarSesion: async (username, passwd) => {},
    checkAuth: async () => {},
});

const AuthServiceProvider = ({children}) => {
    const[isAutenticated, setIsAutenticated] = useState(false);
    const[accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");
    const[user, setUser] = useState({});

    const url = "http://localhost:9000/usuarios";

    async function checkAuth(){
        if(accessToken){
            //si el usuario está autenticado
            const u = await getUser(accessToken);
            if(u){
                saveUser(u);
            }
        }else{
            //si el usuario no está autenticado
            const token = getRefreshToken();
            if(token){
                const u = await getUser(token);
                if(u){
                    saveUser(u);
                }
            }else{
                setIsAutenticated(false);
            }
        }

        return;
    }

    useEffect(()=>{checkAuth()},[]);

    const getUser = async (username) => {
        const res = await axios.get(`${url}/buscar/nombre/${username}`);
        if(res.data !== undefined){
            return res.data;
        }

        return null;
    }

    function getAccessToken(){
        return accessToken;
    }

    function getRefreshToken(){
        if (refreshToken) {
            return refreshToken;
        }

        const token = localStorage.getItem("token");
        if(token){
            setRefreshToken(token);
            return token;
        }

        return null;
    }

    function saveUser(usuario){
        setAccessToken(usuario.usuario);

        localStorage.setItem("token", usuario.usuario);
        
        setUser(usuario);
        setIsAutenticated(true);
    }

    async function iniciarSesion(username, passwd){
        const u = await getUser(username);
        if(u){
            if(u.passwd === passwd){
                saveUser(u);
                return;
            }else{
                setIsAutenticated(false);
                return "passwd";
            }
        }else{
            setIsAutenticated(false);
            return "usuario";
        }
    }

    function finalizarSesion(){
        localStorage.removeItem("token");

        setAccessToken("");
        setRefreshToken("");
        setUser(undefined);
        setIsAutenticated(false);
    }

    return (
        <AuthContext.Provider value={{user, isAutenticated, getAccessToken, saveUser, getRefreshToken, finalizarSesion, iniciarSesion, checkAuth}}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => useContext(AuthContext);

export {AuthServiceProvider, useAuth};