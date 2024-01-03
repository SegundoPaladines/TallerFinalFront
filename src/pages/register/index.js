import { useState } from "react";
import { DefaultLayout } from "../../common";
import { useAuth, useUsuarios } from "../../providers";
import { mostrarAlerta } from "../../functions";
import { Navigate } from "react-router-dom";
const { Link }  = require('react-router-dom');

const Register = () => {
    const usuariosService = useUsuarios();
    const auth = useAuth();

    const [nombres, setNombres] = useState("");
    const [edad, setEdad] = useState(0);
    const [telefono, setTelefono] = useState("");
    const [userName, setUserName] = useState("");
    const [passwd, setPasswd] = useState("");
    const [alert, setAlert] = useState("");

    if(auth.isAutenticated){
        return <Navigate to="/mascotas" />;
    }

    const registrarUsuario = async () => {
        if(validarCampos()){
            const repetido = await usuariosService.buscarUsuarioNombre(userName);
            console.log(repetido);
            if(!repetido){
                const dataset = {
                    nombres:nombres,
                    edad:edad,
                    telefono:telefono,
                    usuario:userName,
                    passwd:passwd,
                    rol:"usuario"
                }

                const res = await usuariosService.crearUsuario(dataset);
                if(res === "success"){
                    await auth.iniciarSesion(userName, passwd);
                    
                    mostrarAlerta("Usuario creado con Exito","success");
                }else{
                    mostrarAlerta("No se ha podido registrar","error");
                }
            }else{
                setAlert("El nombre de usuario: "+userName+" ya fue tomado");
            }
        }else{
            setAlert("Asegurese de diligenciar todos los campos correctamente");
        }
    }

    const validarCampos = () => {
        const nombreReg = /^([A-Za-z]{3,50})(([\s])+([A-Za-z]{3,50})){0,3}$/;
        const edadReg = /^[0-9]{1,3}$/;
        const telReg =  /^([3]{1})([0-9]{9})$/;
        const userNameReg = /^([A-Za-z0-9\\_\\-]{3,80})(@mascotas.com)$/;
        const passwdReg = /^([A-Za-z0-9\\_\\-]{3,80})$/;

        if(!nombreReg.test(nombres)){
            return false;
        }

        if(!edadReg.test(edad) || edad < 18 || edad > 90){
            return false;
        }

        if(!telReg.test(telefono)){
            return false;
        }

        if(!userNameReg.test(userName)){
            return false;
        }

        if(!passwdReg.test(passwd)){
            return false;
        }

        return true;
    }

    const errorLog = (e, campo) => {
        if(campo==="nombre"){
            const reg = /^([A-Za-z]{3,50})(([\s])+([A-Za-z]{3,50})){0,3}$/;
            if(reg.test(e.target.value)){
                e.target.className = "form-control is-valid";
                setAlert("");
                return;
            }
        }

        if(campo==="edad"){
            if(e.target.value < 18 || e.target.value > 90){
                e.target.className = "form-control is-invalid";
                return;
            }

            const reg = /^[0-9]{1,3}$/;
            if(reg.test(e.target.value)){
                e.target.className = "form-control is-valid";
                return;
            }
        }

        if(campo==="tel"){
            const reg = /^([3]{1})([0-9]{9})$/;
            if(reg.test(e.target.value)){
                e.target.className = "form-control is-valid";
                return;
            }
        }

        if(campo==="userName"){
            const reg = /^([A-Za-z0-9\\_\\-]{3,80})(@mascotas.com)$/;
            if(reg.test(e.target.value)){
                e.target.className = "form-control is-valid";
                return;
            }
        }

        if(campo==="passwd"){
            const reg = /^([A-Za-z0-9\\_\\-]{3,80})$/;
            if(reg.test(e.target.value)){
                e.target.className = "form-control is-valid";
                return;
            }
        }

        e.target.className = "form-control is-invalid";
        return;
    }

    return (
        <DefaultLayout>
            <div className="container mt-5 pt-5">
                <div
                    className="row justify-content-center align-items-center g-2"
                >
                    <div className="col-12 col-md-8">
                        <div className="card">
                            <h3 className="card-title text-center mt-5">Resgitrarse</h3>
                            <div className="card-body">
                                {
                                    alert!==""?(
                                        <div className="row justify-content-center">
                                            <div className="alert alert-danger text-center" role="alert">
                                               {alert}
                                            </div>
                                        </div>
                                    ):""
                                }
                                <div className="row justify-content-center">
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="input-group has-validation mb-2">
                                                <span 
                                                    className="input-group-text" 
                                                    id="inputGroupNombres"
                                                >Nombres y Apellidos</span>
                                                <input 
                                                    type="text" 
                                                    className={`form-control`}
                                                    id="validationNombres"
                                                    aria-describedby="inputGroupNombres validationNombresFeedback"
                                                    required
                                                    placeholder="Jhon Doe"
                                                    value={nombres}
                                                    onChange={(e) => {
                                                        setNombres(e.target.value);
                                                        errorLog(e, "nombre");
                                                        setAlert("");
                                                    }}    
                                                />
                                                <div 
                                                    id="validationNombresFeedback" 
                                                    className="invalid-feedback"
                                                >
                                                    Nombre:<br /> 
                                                        Solo letras y espacios (A-Z a-z) <br />
                                                        Deben ser más de 3 letras por Nombre o Apellido<br/>
                                                        Cada nombre o apellido separado por 1 o mas espcios <br />

                                                </div>
                                            </div>
                                            <div className="input-group has-validation mb-2">
                                                <span 
                                                    className="input-group-text" 
                                                    id="inputGroupEdad"
                                                >Edad</span>
                                                <input 
                                                    type="number" 
                                                    className={`form-control`}
                                                    id="validationEdad"
                                                    aria-describedby="inputGroupEdad validationEdadFeedback"
                                                    required
                                                    value={edad}
                                                    onChange={(e) => {
                                                        setEdad(e.target.value);
                                                        errorLog(e, "edad");
                                                        setAlert("");
                                                    }}    
                                                />
                                                <div 
                                                    id="validationEdadFeedback" 
                                                    className="invalid-feedback"
                                                >
                                                   Edad: numero entre 18 y 90
                                                </div>
                                            </div>
                                            <div className="input-group has-validation mb-2">
                                                <span 
                                                    className="input-group-text"
                                                    id="inputGroupTel"
                                                >Celular</span>
                                                <input 
                                                    type="text" 
                                                    className={`form-control`}
                                                    id="validationTel"
                                                    aria-describedby="inputGroupTel validationTelFeedback"
                                                    required
                                                    value={telefono}
                                                    placeholder="3147856561"
                                                    onChange={(e) => {
                                                        setTelefono(e.target.value);
                                                        errorLog(e, "tel");
                                                        setAlert("");
                                                    }}    
                                                />
                                                <div 
                                                    id="validationTelFeedback" 
                                                    className="invalid-feedback"
                                                >
                                                    Numero de 10 digitos iniciado en 3
                                                </div>
                                            </div>
                                            <div className="input-group has-validation">
                                                <span 
                                                    className="input-group-text" 
                                                    id="inputGroupUsername"
                                                >Usuario @</span>
                                                <input 
                                                    type="text" 
                                                    className={`form-control`}
                                                    id="validationUsername" 
                                                    aria-describedby="inputGroupUsername validationUsernameFeedback"
                                                    required
                                                    value={userName}
                                                    onChange={(e) => {
                                                        setUserName(e.target.value);
                                                        errorLog(e,"userName");
                                                        setAlert("");
                                                    }}    
                                                />
                                                <div 
                                                    id="validationUsernameFeedback" 
                                                    className="invalid-feedback"
                                                >
                                                    Usuario: <br /> 
                                                        letras,guines (-) o guion bajo (_) y numeros sin espacios <br />
                                                        terminado en @mascotas.com
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
                                                    className={`form-control`}
                                                    id="validationPasswd" 
                                                    aria-describedby="inputGroupPasswd validationPasswdFeedback"
                                                    required
                                                    value={passwd}
                                                    onChange={(e) => {
                                                       setPasswd(e.target.value);
                                                       errorLog(e, "passwd");
                                                       setAlert("");
                                                    }}
                                                />
                                                <div 
                                                    id="validationPasswdFeedback" 
                                                    className="invalid-feedback"
                                                >
                                                   Contraseña:
                                                    entre 3 y 80 caracteres, letras, numeros o guiones sin espacios
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <button
                                                className={`btn btn-success w-80`}
                                                onClick={(e) => registrarUsuario()}
                                            >
                                                Registrarse
                                            </button>
                                        </div>
                                        <div className='row text-center mt-3'>
                                            <p> ¿Ya tienes una cuenta ? <Link to="/register">Iniciar Sesión</Link></p>
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

export default Register;