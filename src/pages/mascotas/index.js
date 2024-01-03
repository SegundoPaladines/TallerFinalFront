import { useAuth, useMascotas } from "../../providers";
import { DefaultLayout } from "../../common";
import { useEffect, useState } from "react";
import { MascotaComponent, MascotasFormComponent } from "../../components";

const Mascotas = () => {
    //providers
    const auth = useAuth();
    const mascotasProvider = useMascotas();

    //listas
    const [mascotas, setMascotas] = useState([]);

    useEffect(()=>{
       getMascotas();
    },[]);

    const getMascotas = async() => {
        const res = await mascotasProvider.getMascotas();
        if(res){
            setMascotas(res);
        }
    }

    return(
        <DefaultLayout>
            <div className="mt-5 pt-4">
                <div className="container">
                    {   
                        auth.user.rol==="administrador"?(
                            <div className="row">
                                <div className="col">
                                    <button 
                                        type="button"
                                        className="btn btn-outline-success w-100 mb-3"
                                        data-bs-toggle="modal"
                                        data-bs-target={`#mascota-formulario-Agregar-`}
                                    >
                                        <i className="fa-solid fa-add"></i>
                                    </button>
                                </div>
                            </div>        
                        ):""
                    }
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3">
                        {
                            mascotas?(
                                mascotas.map((mascota) => (
                                    <div className="col mb-5"  key={`maascota${mascota.pk}`}>
                                            <MascotaComponent
                                                {...mascota}
                                            />
                                    </div>
                                ))
                            ):(
                                <div className="col mb-5" >
                                     <p>No hay ninguna Mascota Registrada</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            <MascotasFormComponent
                {...{funcion:"Agregar"}}
            />

        </DefaultLayout>
    );
}

export default Mascotas;