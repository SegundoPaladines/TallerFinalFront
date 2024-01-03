import { useEffect, useState } from "react";
import { DefaultLayout } from "../../common";
import { useAuth, useSolicitudes } from "../../providers";
import { SolicitudComponent } from "../../components";

const Solicitudes = () => {
    const user = useAuth().user;
    const solicitudesService = useSolicitudes();

    const [solicitudes, setSolicitudes] = useState([]);

    useEffect(() => {
        inicializar();
    } ,[]);

    const inicializar = async () => {
        if(user.rol === "administrador"){
            const res = await solicitudesService.getSolicitudes();
            if(res){
                setSolicitudes(res);
            }
        }else if(user.rol === "usuario"){
            const res = await solicitudesService.buscarSolicitudesUsuario(user.pk);
            if(res){
                setSolicitudes(res);
            }
        }
    }

    return (
        <DefaultLayout>
            <div className="mt-5 pt-4">
                <div className="container">
                    <div className="row mt-2 mb-2">
                        <h4 className="text-center"> Solicitudes de Adopción </h4>
                    </div>
                    <div className="row">
                        {
                            solicitudes?(
                                solicitudes.map((solicitud, index) => (
                                    <SolicitudComponent
                                    key={solicitud.pk}
                                        {...{index, solicitud}}
                                    />
                                ))
                            ):""
                        }
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}

export default Solicitudes;