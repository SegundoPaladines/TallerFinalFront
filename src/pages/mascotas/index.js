import { useAuth, useMascotas } from "../../providers";
import { DefaultLayout } from "../../common";
import { useEffect, useState } from "react";
import { MascotaComponent, MascotasFormComponent } from "../../components";
import "./index.css";

const Mascotas = () => {
    //providers
    const auth = useAuth();
    const mascotasProvider = useMascotas();

    //listas
    const [mascotas, setMascotas] = useState([]);
    const [busqueda, setBusqueda] = useState([]);

    useEffect(()=>{
       getMascotas();
    },[]);

    const buscar = async (busqueda) => {
        if(busqueda && mascotas){
            setBusqueda(mascotas.filter(mascota => (
                    (mascota.nombre.toLowerCase().indexOf(busqueda.toLowerCase())) !== -1) ||
                    (mascota.rasa.toLowerCase().indexOf(busqueda.toLowerCase()) !== -1) ||
                    (mascota.edad.toString().indexOf(busqueda) !== -1)
                )
            );
        }else{
            getMascotas();
        }
    }

    const getMascotas = async() => {
        const res = await mascotasProvider.getMascotas();
        if(res){
            setMascotas(res);
            setBusqueda(res);
        }
    }

    return(
        <DefaultLayout>
            <div className="mt-5 pt-4">
                <div className="container">
                    <div className="row container-buscador">
                        <div className="input-group">
                            <span className="icono-buscador" id="buscador-span">
                                <i className="fa-solid fa-search"></i>
                            </span>
                            <input
                                className="form-control"
                                type="text"  
                                aria-label="buscador" 
                                aria-describedby="buscador-span"
                                id="buscador"
                                placeholder="Nombre, Edad o Raza ..."
                                onChange={(e) => {
                                    buscar(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    {   
                        auth.user.rol==="administrador"?(
                            <div className="row mb-3">
                                <div className="col">
                                    <button 
                                        type="button"
                                        className="btn btn-outline-success w-100"
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
                            busqueda?(
                                busqueda.map((mascota) => (
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