import React, { useContext, createContext, useState, useEffect} from "react";
import axios from "axios";

const AuthContext = createContext({
    user:{},
    isAutenticated: false,
    getAccessToken: () => {},
    saveUser: (usuario) => {},
    getRefreshToken: () => {},
    finalizarSesion: () => {},
    iniciarSesion: (username, passwd) => {},
});

const AuthServiceProvider = ({children}) => {
    const[isAutenticated, setIsAutenticated] = useState(false);
    const[accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");
    const[user, setUser] = useState({});

    const url = "http://localhost:9000/usuarios";

    async function checkAuth(){
        if(accessToken){
            console.log("existe toquen");
            //si el usuario está autenticado
            const u = await getUser(accessToken);
            if(u){
                saveUser(u);
            }
        }else{
            //si el usuario no está autenticado
            console.log("no existe toquen");
            const token = getRefreshToken();
            if(token){
                const u = await getUser(token);
                if(u){
                    console.log("refresh token");
                    saveUser(u);
                }
            }else{
                console.log("ningun toquen token");
                setIsAutenticated(false);
            }
        }

        return;
    }

    //importante el array de vacio para que solo se ejecute una vez
    useEffect(() => {
        checkAuth();
    }, []);

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
            }else{
                setIsAutenticated(false);
            }
        }else{
            setIsAutenticated(false);
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
        <AuthContext.Provider value={{user, isAutenticated, getAccessToken, saveUser, getRefreshToken, finalizarSesion, iniciarSesion}}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => useContext(AuthContext);

export {AuthServiceProvider, useAuth};