import { useState } from 'react';
import {DefaultLayout} from '../../common'
import {useAuth} from '../../providers';
import {Navigate} from 'react-router-dom';
const { Link }  = require('react-router-dom');

const Login = () => {

    const [username, setUsername] = useState("");
    const [passwd, setPasswd] = useState("");
    const [usError, setUsError] = useState("form-control");
    const [passError, setPassError] = useState("form-control");
    const [errUsMg, setErrUsMg] = useState("");
    const [errPasswdMg, setErrPasswdMg] = useState(""); 

    const auth = useAuth();

    if(auth.isAutenticated){
        return <Navigate to='/mascotas'></Navigate>;
    }

    const iniciarSesion = async () => {
        if(username !== ""){
            if(passwd !== ""){
                const res = await auth.iniciarSesion(username, passwd);
                if(res==="usuario"){
                    setUsError("form-control is-invalid");
                    setErrUsMg("El Usuario no Existe!");
                }

                if(res==="passwd"){
                    setPassError("form-control is-invalid");
                    setErrPasswdMg("Contraseña Incorrecta!");
                }
            }else{
                setPassError("form-control is-invalid");
                setErrPasswdMg("La Contraseña es Requerida!");
            }
        }else{
            setUsError("form-control is-invalid");
            setErrUsMg("El Usuario es Requerido!");
        }
    }

    return(
        <DefaultLayout>
            <div className="container mt-5 pt-5">
                <div
                    className="row justify-content-center align-items-center g-2"
                >
                    <div className="col-12 col-md-8">
                        <div className="card">
                            <h3 className="card-title text-center mt-5">Login</h3>
                            <div className="card-body">
                                <div className="row justify-content-center">
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="input-group has-validation">
                                                <span 
                                                    className="input-group-text" 
                                                    id="inputGroupUsername"
                                                >Usuario @</span>
                                                <input 
                                                    type="text" 
                                                    className={`${usError}`}
                                                    id="validationUsername" 
                                                    aria-describedby="inputGroupUsername validationUsernameFeedback"
                                                    required
                                                    value={username}
                                                    onChange={(e) => {
                                                        setUsError("form-control");
                                                        setUsername(e.target.value);
                                                    }}    
                                                />
                                                <div 
                                                    id="validationUsernameFeedback" 
                                                    className="invalid-feedback"
                                                >
                                                    {errUsMg}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-4 row mt-2">
                                            <div className="input-group has-validation">
                                                <span 
                                                    className="input-group-text" 
                                                    id="inputGroupUsername"
                                                >Contraseña </span>
                                                <input 
                                                    type="password" 
                                                    className={`${passError}`}
                                                    id="validationPasswd" 
                                                    aria-describedby="inputGroupPasswd validationPasswdFeedback"
                                                    required 
                                                    value={passwd}
                                                    onChange={(e) => {
                                                        setPassError("form-control");
                                                        setPasswd(e.target.value);
                                                    }}   
                                                />
                                                <div 
                                                    id="validationPasswdFeedback" 
                                                    className="invalid-feedback"
                                                >
                                                    {errPasswdMg}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-5">
                                            <button
                                                className="btn btn-success w-80"
                                                onClick={(e) => iniciarSesion()}
                                            >
                                                Login
                                            </button>
                                        </div>
                                        <div className='row text-center mt-3'>
                                            <p> ¿No tienes una cuenta ? <Link to="/register">Registrate aqui</Link></p>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}

export default Login;