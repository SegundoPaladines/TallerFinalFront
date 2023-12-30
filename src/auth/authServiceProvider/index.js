import React, { useContext, createContext, useState, useEffect} from "react";

const AuthContext = createContext({
    isAutenticated: false,
    getAccessToken: () => {},
    saveUser: (usuario) => {},
    getRefreshToken: () => {},
    signout: () => {}
});

const AuthServiceProvider = ({children}) => {
    const[isAutenticated, setIsAutenticated] = useState(false);
    const[accessToken, setAccessToken] = useState("");

    function checkAuth(){
        if(accessToken){
            //si el usuario está autenticado
            saveUser(accessToken);
        }else{
            //si el usuario no está autenticado
            const token = getRefreshToken();
            if(token){
                saveUser(token);
            }else{
                setIsAutenticated(false);
            }
        }
    }

    useEffect(()=>{
        checkAuth();
    });

    function getAccessToken(){
        return accessToken;
    }

    function getRefreshToken(){
        const token = localStorage.getItem("token");
        if(token){
            return token;
        }

        return null;
    }

    function saveUser(usuario){
        setAccessToken(usuario);

        localStorage.setItem("token", usuario);

        setIsAutenticated(true);
    }

    function signout() {
        localStorage.removeItem("token");
        setAccessToken("");
    }

    return (
        <AuthContext.Provider value={{isAutenticated, getAccessToken, saveUser, getRefreshToken, signout}}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => useContext(AuthContext);

export {AuthServiceProvider, useAuth};