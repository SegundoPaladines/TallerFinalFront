import { useState } from 'react';
import {DefaultLayout} from '../../common'
import {useAuth} from '../../auth';
import {Navigate} from 'react-router-dom';

const Login = () => {

    const [username, setUsername] = useState("");
    const [passwd, setPasswd] = useState("");

    const auth = useAuth();

    if(auth.isAutenticated){
        return <Navigate to='/welcome'></Navigate>;
    }

    const iniciarSesion = () => {
        auth.saveUser("juan");
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
                                        <div className="input-group flex-nowrap">
                                            <span 
                                                className="input-group-text"
                                                id="username"
                                            >@</span>
                                            <input 
                                                type="text"
                                                id="inputUsuario"
                                                className="form-control"
                                                placeholder="Nombre de usuario" 
                                                aria-label="username" 
                                                aria-describedby="username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-4 row mt-2">
                                            <label 
                                                htmlFor="inputPassword"
                                                className="col-sm-12 col-lg-12 col-xl-2 col-form-label"
                                            >Contraseña</label>
                                            <div className="col-sm-12 col-lg-12 col-xl-10">
                                                <input 
                                                    type="password" 
                                                    className="form-control" 
                                                    id="inputPassword"
                                                    value={passwd}
                                                    onChange={(e) => setPasswd(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <button
                                                className="btn btn-success w-80"
                                                onClick={(e) => iniciarSesion()}
                                            >
                                                Login
                                            </button>
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