import { useEffect, useState } from "react";
import { useAuth, useMascotas, useSolicitudes } from "../../providers";
import { mostrarAlerta } from "../../functions";

const { Link } = require("react-router-dom");

const SolicitudComponent = ({index, solicitud}) => {
    const mascotasService = useMascotas();
    const solicitudesService = useSolicitudes()
    const user = useAuth().user;
    const [mascota, setMascota] = useState({});
    const [accion, setAccion] = useState('');
    const [persona, setPersona] = useState({});

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

    const realizarAccion = async () => {
        if(accion==="Eliminar"){
            await cancelarSolicitud();
            
            return;
        }

        if(accion==="Rechazar"){
            await rechazarSolicitud();

            return;
        }

        if(accion==="Aceptar"){
            await aceptarSolicitud();

            return;
        }
    }

    const aceptarSolicitud = async () => {
        if(solicitud.pk && solicitud.estado === 'P'){
            const res = await mascotasService.actualizarMascota(solicitud.mascotaPK, {estado:1});
            if(res === "success"){
                const hoy = new Date();
                const fecha_fin = hoy.toISOString().split('T')[0];

                const dataset = {
                    estado:"A",
                    fecha_fin:fecha_fin
                }

                const sol = await solicitudesService.actualizarSolicitud(solicitud.pk, dataset);

                if(sol === "success"){
                    mostrarAlerta("Solicitud aceptada con Exito","success");
                }else{
                    mostrarAlerta("No se puede Adoptar esa Mascota","error");
                }
            }else{
                mostrarAlerta("No se puede Adoptar esa Mascota","error");
            }
        }
    }

    const rechazarSolicitud = async () => {
        if(solicitud.pk && solicitud.estado === 'P'){
            const hoy = new Date();
                const fecha_fin = hoy.toISOString().split('T')[0];

                const dataset = {
                    estado:"R",
                    fecha_fin:fecha_fin
                }

            const res = await solicitudesService.actualizarSolicitud(solicitud.pk, dataset);

            if(res === "success"){
                mostrarAlerta("Solicitud rechazada con Exito","success");
            }else{
                mostrarAlerta("No se ha Podido rechazar la Solicitud","error");
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
                                                data-bs-target={`#modalSolicitud${solicitud.pk}`}
                                                onClick={(e) => setAccion("Eliminar")}
                                            >
                                                Eliminar Solicitud
                                            </button>
                                        ):"Mascota no encontrada"
                                    }
                                </div>
                            </div>
                            {
                                user.rol==="administrador" && solicitud.estado==="P"?(
                                    <div className="row">
                                        <div className="col">
                                            <button 
                                                data-bs-toggle="modal"
                                                className={`btn btn-success w-100`}
                                                data-bs-target={`#modalSolicitud${solicitud.pk}`}
                                                onClick={(e) => setAccion("Aceptar")}
                                            >
                                                Aceptar Solicitud
                                            </button>
                                        </div>
                                        <div className="col">
                                            <button
                                                data-bs-toggle="modal"
                                                className={`btn btn-danger w-100`}
                                                data-bs-target={`#modalSolicitud${solicitud.pk}`}
                                                onClick={(e) => setAccion("Rechazar")}
                                            >
                                                Rechazar Solicitud
                                            </button>
                                        </div>
                                        <div className="col">
                                            <button 
                                                 data-bs-toggle="modal"
                                                 className={`btn btn-danger w-100`}
                                                 data-bs-target={`#modalSolicitud${solicitud.pk}`}
                                                 onClick={(e) => setAccion("Eliminar")}
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
                id={`modalSolicitud${solicitud.pk}`}
                tabIndex="-1" 
                aria-labelledby={`modalLabelSolicitud${solicitud.pk}`} 
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 
                                className="modal-title fs-5" 
                                id={`modalLabelSolicitud${solicitud.pk}`}
                            >
                                {accion?accion:""} Solicitud
                            </h1>
                            <button 
                                type="button" 
                                className="btn-close" 
                                data-bs-dismiss="modal" 
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            {
                                accion==="Eliminar"?(<p>
                                    ¿Está seguro de querer eliminar la solicitud de la 
                                    mascota {mascota?mascota.nombre:""}?
                                </p>):""
                            }{
                                accion==="Rechazar"?(<p>
                                    ¿Está seguro de querer rechazar la solicitud de la 
                                    mascota {mascota?mascota.nombre:""}?
                                </p>):""
                            }{
                                accion==="Aceptar"?(<p>
                                    ¿Está seguro de querer aceptar la solicitud de la 
                                    mascota {mascota?mascota.nombre:""}?
                                </p>):""
                            }
                        </div>
                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className={`btn 
                                            ${accion==="Aceptar"?" btn-danger":" btn-success"}
                                        `} 
                                data-bs-dismiss="modal"
                            >Atrás</button>
                            <button 
                                type="button" 
                                className={`btn 
                                            ${accion==="Aceptar"?" btn-success":" btn-danger"}
                                        `}
                                onClick={(e) => realizarAccion()}
                            >
                                {
                                    accion==="Eliminar"?"Confirmar Eliminación":""
                                }
                                {
                                    accion==="Rechazar"?"Confirmar Rechazo":""
                                }
                                {
                                    accion==="Aceptar"?"Confirmar Aceptación":""
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SolicitudComponent;