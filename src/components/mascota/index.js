import { Link } from "react-router-dom";
import { useAuth, useSolicitudes } from "../../providers";
import { useState } from "react";

const MascotaComponent = ({pk, nombre, foto, rasa, edad, tipo_mascota, estado}) => {
    const [mensaje, setMensaje] = useState("");
    const [alertType, setAlertType] = useState("");

    const user = useAuth().user;
    const solicitudesProvider = useSolicitudes();


    const enviarSolicitud = async() => {
        if(pk && user){
            const hoy = new Date();
            const fecha_inicio = hoy.toISOString().split('T')[0];
            const dataset = {
                mascotaPK:pk,
                adoptante:user.pk,
                estado:'P',
                fecha_inicio:fecha_inicio
            }
            const res = await solicitudesProvider.enviarSolicitud(dataset);

            if(res === "success"){
                setMensaje("Solicitud Enviada con Exito");
                setAlertType("alert alert-success");
            }else{
                setMensaje("No se ha Podido realizar la Solicitud");
                setAlertType("alert alert-danger");
            }
        }else{
            setMensaje("No se ha Podido realizar la Solicitud");
            setAlertType("alert alert-danger");
        }
    }

    return (
        <div className="card h-100">
            {
                foto?(
                    <img src={foto} height={180} className="card-img-top" alt="Foto de la mascota" />
                ):null
            }
            <div className="card-body">
                <h5 className="card-title">{nombre}</h5>
                <hr />
                <p className="card-text text-secondary">
                    {
                        `${tipo_mascota==='P'?"Perro":"Gato"}`+
                        ` ${rasa?`de raza ${rasa}`:" que no registra raza"}`+
                        `${edad?` con ${edad} años de edad`:" y no registra edad"}`+
                        "."
                    }
                </p>
                <hr />
                {
                    estado===1?(
                        <div className="row">
                            <div className="alert alert-success text-center" role="alert">
                                Esta mascota ya fue adoptada
                            </div>
                            < hr />
                        </div>
                    ):""
                }
                {
                    user.rol==="administrador"?(
                        <div className="row">
                            <div className="col">
                                <Link 
                                    className="btn btn-outline-secondary w-100 mb-2"
                                    to={`/mascota/${pk}`}
                                >
                                        <i className="fa-solid fa-list"></i>
                                </Link>
                            </div>
                        </div>
                    ):""
                }
                <div className="row row-cols-1 row-cols-sm-2">
                    {
                        user.rol==="administrador"?(
                        <>

                        </>):""
                    }{
                        user.rol==="usuario"?(
                            <>
                                <div className="col">
                                    <Link 
                                        className="btn btn-outline-secondary w-100"
                                        to={`/mascota/${pk}`}
                                    >
                                        Detalles
                                    </Link>
                                </div>
                                <div className="col">
                                    <button 
                                        type="button"
                                        className="btn btn-outline-success w-100"
                                        data-bs-toggle="modal"
                                        data-bs-target={`#mascota-adopcion${pk}`}
                                    >
                                       Adoptar
                                    </button>
                                </div>
                            </>
                        ):(
                            <>
                                <div className="col">
                                    <button 
                                        type="button"
                                        className="btn btn-outline-warning w-100"
                                        data-bs-toggle="modal"
                                        data-bs-target={`#mascota-adopcion${pk}`}
                                    >
                                       <i className="fa-solid fa-edit"></i>
                                    </button>
                                </div>
                                <div className="col">
                                    <button 
                                        type="button"
                                        className="btn btn-outline-danger w-100"
                                        data-bs-toggle="modal"
                                        data-bs-target={`#mascota-adopcion${pk}`}
                                    >
                                       <i className="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>

            <div 
                className="modal fade"
                id={`mascota-adopcion${pk}`}
                tabIndex="-1" 
                aria-labelledby={`modalAdoptarMactota${pk}`}
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 
                                className="modal-title fs-5" 
                                id={`modalTituloAdoptarMascota${pk}`}
                            >
                                    Adoptar
                            </h1>
                            <button 
                                type="button" 
                                className="btn-close" 
                                data-bs-dismiss="modal" 
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div 
                                className={`${alertType}`} 
                                role="alert"
                            >
                                {mensaje}
                            </div>
                            {
                                estado===1?(
                                    <p className="text-center">
                                        Lo sentimos {nombre} ya fue adoptado
                                    </p>
                                ):(
                                    <p className="text-center">
                                         ¿Desea adoptar a {nombre} de {edad} años?
                                    </p>
                                )
                            }
                        </div>
                        <div className="modal-footer">
                            <button 
                                type="button"
                                className="btn btn-secondary" 
                                data-bs-dismiss="modal"
                            >Cancelar</button>
                            {
                                estado===0?(
                                    <button 
                                        type="button" 
                                        className="btn btn-success"
                                        onClick={(e) => enviarSolicitud()}
                                    >Adoptar</button>
                                ):""
                            }
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default MascotaComponent;