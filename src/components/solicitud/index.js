import { useEffect, useState } from "react";
import { useAuth, useMascotas, useSolicitudes } from "../../providers";
import { mostrarAlerta } from "../../functions";

const { Link } = require("react-router-dom");

const SolicitudComponent = ({index, solicitud}) => {
    const mascotasService = useMascotas();
    const solicitudesService = useSolicitudes()
    const user = useAuth().user;
    const [persona, setPersona] = useState({});
    const [mascota, setMascota] = useState({});

    useEffect(() => {
        //getPersona();
        getMascota();
    }, []);

    const getMascota = async () => {
        if(solicitud.mascotaPK){
            const res = await mascotasService.buscarMascota(solicitud.mascotaPK);
            if(res){
                setMascota(res);
            }
        }
    }

    const cancelarSolicitud = async () => {
        if(solicitud.pk && solicitud.estado === 'P'){
           const res = await solicitudesService.eliminarSolicitud(solicitud.pk);

            if(res === "success"){
                mostrarAlerta("Solicitud eliminada con Exito","success");
            }else{
                mostrarAlerta("No se ha Podido eliminar la Solicitud","error");
            }
        }
    }

    return (
        <div className={`   card mb-2 
                            ${solicitud.estado==='P'?"bg-secondary":""}
                            ${solicitud.estado==='A'?"bg-success":""}
                            ${solicitud.estado==='R'?"bg-danger":""}
                        `}
        >
            <div className="card-header">
                <h4 className="card-title text-center"> {mascota.nombre} </h4>
            </div>
            <div className="card-body">
                {
                    solicitud?(
                        <div>
                            <div className={`${mascota?"row":"d-none"}`}>
                                <p className="text-center">
                                    Tipo de Mascota: {mascota.tipo_mascota==='G'?"Gato":""}
                                    {mascota.tipo_mascota==='P'?"Perro":""}
                                </p>
                                <hr />
                            </div>
                            <div className="row row-cols-1 row-cols-md-2">
                                <div className="col mb-2 mt-2">
                                    <p>#{index+1}</p>
                                </div>
                                <div className="col mb-2">
                                    <p> Estado: 
                                        {
                                            solicitud.estado === 'A'?"  Aceptada":""
                                        }
                                        {
                                            solicitud.estado === 'P'?"  En Proceso":""
                                        }
                                        {
                                            solicitud.estado === 'R'?"  Rechazada":""
                                        }
                                    </p>
                                </div>
                                <div className={`${user.rol==="administrador"?"col mb-2":"d-none"}`}>
                                    {
                                        <p>
                                            {    
                                                solicitud.adoptante
                                            }
                                        </p>
                                    }
                                </div>
                                <div className="col mb-2">
                                    <p>Fecha de Inicio: 
                                        {
                                            " "+solicitud.fecha_inicio
                                        }
                                    </p>
                                </div>
                                <div className="col mb-2">
                                    <p>Fecha de Finalización:
                                        {
                                            solicitud.fecha_fin?" "+solicitud.fecha_fin:" En Proceso"
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className={`row ${user.rol==="usuario"?"row-cols-1 row-cols-sm-2":""}`}>
                                <div className="col mb-3">
                                    {
                                        mascota?(
                                            <Link 
                                                className="btn btn-outline-warning w-100"
                                                to={`/mascota/${mascota.pk}`}
                                            >
                                                Ver Mascota
                                            </Link>
                                        ):"Mascota no encontrada"
                                    }
                                </div>
                                <div className={`col ${user.rol==="usuario"?"":"d-none"}`}>
                                    {
                                        user.rol==="usuario"?(
                                            <button 
                                                type="button"
                                                data-bs-toggle="modal"
                                                className={`btn btn-danger w-100 ${solicitud.estado==='P'?"":"disabled"}`}
                                                data-bs-target={`#modalEliminarSolicitud${solicitud.pk}`}
                                            >
                                                Cancelar Solicitud
                                            </button>
                                        ):"Mascota no encontrada"
                                    }
                                </div>
                            </div>
                            {
                                user.rol==="administrador"?(
                                    <div className="row">
                                        <div className="col">
                                            <button 
                                                className="btn btn-success"
                                            >
                                                Aceptar Solicitud
                                            </button>
                                        </div>
                                        <div className="col">
                                            <button 
                                                className="btn btn-danger"
                                            >
                                                Rechazar Solicitud
                                            </button>
                                        </div>
                                        <div className="col">
                                            <button 
                                                className="btn btn-danger"
                                            >
                                                Eliminar Solicitud
                                            </button>
                                        </div>
                                    </div>
                                ):""
                            }
                        </div>
                    ):""
                }
            </div>

            <div 
                className="modal fade" 
                id={`modalEliminarSolicitud${solicitud.pk}`} 
                tabIndex="-1" 
                aria-labelledby={`modalEliminarLabelSolicitud${solicitud.pk}`} 
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 
                            className="modal-title fs-5" 
                            id={`modalEliminarLabelSolicitud${solicitud.pk}`}
                        >Cancelar Solicitud</h1>
                        <button 
                            type="button" 
                            className="btn-close" 
                            data-bs-dismiss="modal" 
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        ¿Está seguro de querer eliminar la solicitud de la mascota {mascota?mascota.nombre:""}?
                    </div>
                    <div className="modal-footer">
                        <button 
                            type="button" 
                            className="btn btn-success" data-bs-dismiss="modal"
                        >Atrás</button>
                        <button 
                            type="button" 
                            className="btn btn-danger"
                            onClick={(e) => cancelarSolicitud()}
                        >
                            Confirmar Cancelación
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SolicitudComponent;