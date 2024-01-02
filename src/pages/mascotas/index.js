import { useAuth, useMascotas } from "../../providers";
import { DefaultLayout } from "../../common";
import { useEffect, useState } from "react";
import { MascotaComponent } from "../../components";

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
                {auth.user.rol==="administrador"?(
                        <p>Este es un administrador</p>
                    ):(
                        <p>Este es un usuario</p>
                    )
                }
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3">
                        {
                            mascotas.map((mascota) => (
                                <div className="col mb-5"  key={`maascota${mascota.pk}`}>
                                        <MascotaComponent
                                            {...mascota}
                                        />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}

export default Mascotas;