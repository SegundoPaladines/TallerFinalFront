import { useEffect, useState } from "react";
import { DefaultLayout } from "../../common";
import { useMascotas } from "../../providers";
import { useParams } from "react-router-dom";
const { Link } = require("react-router-dom");

const MascotaDetail = () => {
    const mascotasService = useMascotas();
    const [mascota, setMascota] = useState({});
    const pk = useParams().id;

    useEffect(()=> {
        getMascota();
    }, []);

    const getMascota  = async () => {
        const res = await mascotasService.buscarMascota(pk);
        setMascota(res);
    }

    return(
        <DefaultLayout>
            <div className="container  mt-5 pt-5">
                <div className="card">
                    <div className="card-body">
                        {
                            mascota?(
                                <div className="row row-cols-1 row-cols-md-2">
                                    <div className="col">
                                        <img
                                            src={mascota.foto}
                                            className="img-fluid rounded-top"
                                            style={{maxHeight:350}}
                                            alt={`Imagen ${mascota.nombre}`}
                                        />
                                    </div>
                                    <div className="col">
                                        <h5>
                                            Nombre: {
                                                        mascota.nombre?mascota.nombre:"No definido"
                                                    }
                                        </h5>
                                        <p className="text-secondary">
                                            {
                                                mascota.tipo_mascota==='P'?"Perro":"Gato"
                                            }
                                        </p>
                                        <p>Raza: {
                                                    mascota.rasa?mascota.rasa:"No definida"
                                                }
                                        </p>
                                        <p>Edad: {
                                                mascota.edad?mascota.edad:"No definida"
                                            } años
                                        </p>
                                        <hr />
                                        <p>{
                                            mascota.descripcion?mascota.descripcion:"No hay descripcion"
                                        }</p>
                                    </div>
                                </div>
                            ):(
                                <div className="row">
                                    <p>No se ha podido encontrar la mascota!</p>
                                </div>
                            )
                        }
                        <div className="row">
                            <div className="col-sm-12 col-lg-8"></div>
                            <div className="col-sm-12 col-lg-2 mb-2">
                                <Link className="btn btn-outline-dark w-100" to="/solicitudes">
                                    Solicitudes
                                </Link>
                            </div>
                            <div className="col-sm-12 col-lg-2">
                                <Link className="btn btn-outline-dark w-100" to="/mascotas">
                                    Mascotas
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}

export default MascotaDetail;