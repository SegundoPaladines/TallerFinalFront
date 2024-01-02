import { useEffect, useState } from "react";
import { useMascotas } from "../../providers";

const MascotasFormComponent = ({pk, funcion}) => {
    //providers
    const mascotasService = useMascotas();

    //la mascota si es que existe
    const [mascota, setMascota] = useState({});

    //atributos
    const [nombre, setNombre] = useState("");
    const [foto, setFoto] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [rasa, setRasa] = useState("");
    const [edad, setEdad] = useState(0);
    const [tipo, setTipo] = useState('');
    const [alert, setAlert] = useState('');
    const [alertType, setAlertType] = useState('');

    //control de errores
    const [campo, setCampo] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(()=> {
        if(pk){
            obetenerMascota();
        }
    },[]);

    const obetenerMascota = async () => {
        try {
            const res = await mascotasService.buscarMascota(pk);
    
            if (res) {
                setMascota(res);
                setNombre(res.nombre);
                setFoto(res.foto);
                setDescripcion(res.descripcion);
                setRasa(res.rasa);
                setEdad(res.edad);
                setTipo(res.tipo_mascota);
            }
        } catch (error) {
            console.error("Error al obtener la mascota:", error);
        }
    };

    const actualizarMascota = async () => {
        if(validarCampos()){
            const dataset = {
                nombre:nombre,
                foto:foto,
                descripcion:descripcion,
                rasa:rasa,
                edad:edad,
                tipo_mascota:tipo
            }
    
            console.log(dataset);
        }
    }

    const validarCampos = () => {
        if(nombre === ""){
            setCampo("nombre");
            setMsg("Nombre Requerido");

            return false;
        }

        return true;
    }

    const limpiar = (elemento) => {
        if(campo === elemento){
            setCampo("");
            setMsg("");
        }
    }

    return(
        <div 
            className="modal fade"
            id={`mascota-formulario-${funcion}-${pk?pk:""}`}
            tabIndex="-1" 
            aria-labelledby={`modalForumularioMactota-${funcion}-${pk?pk:""}`}
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 
                            className="modal-title fs-5" 
                            id={`modalTituloFormularioMascota-${funcion}-${pk?pk:""}`}
                        >
                                {funcion} Mascota
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
                            funcion==="Eliminar"?(
                                <p className="text-center"> ¿Está seguro de querer eliminar a {mascota.nombre?mascota.nombre:""} ?</p>
                            ):(
                                <div className="row">
                                    <div className="mb-3 input-group has-validation">
                                        <label 
                                            htmlFor={`nombreFormularioMascota-${funcion}-${pk?pk:""}`}
                                            className="form-label w-100"
                                        >Nombre</label>
                                        <input
                                            type="text" 
                                            className={`form-control ${campo==="nombre"?"is-invalid":""}`}
                                            id={`nombreFormularioMascota-${funcion}-${pk?pk:""}`}
                                            aria-describedby={`Group-${funcion}-${pk?pk:""} nombreFeedback-${funcion}-${pk?pk:""}`}
                                            required
                                            placeholder="Firulais"
                                            value={nombre}
                                            onChange={(e) => {
                                                setNombre(e.target.value);
                                                limpiar("nombre");
                                            }}
                                        />
                                        <div
                                            id={`nombreFeedback-${funcion}-${pk?pk:""}`}
                                            className="invalid-feedback"
                                        >
                                            {msg}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label 
                                            htmlFor={`fotoFormularioMascota-${funcion}-${pk?pk:""}`}
                                            className="form-label"
                                        >Url Foto</label>
                                        <input 
                                            type="text" 
                                            className="form-control"
                                            id={`fotoFormularioMascota-${funcion}-${pk?pk:""}`}
                                            placeholder="https://una/imagen/de/internet.jpg"
                                            value={foto}
                                            onChange={(e) => setFoto(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label 
                                            htmlFor={`descripcionFormularioMascota-${funcion}-${pk?pk:""}`}
                                            className="form-label"
                                        >Descripción</label>
                                        <textarea 
                                            className="form-control" 
                                            id={`descripcionFormularioMascota-${funcion}-${pk?pk:""}`}
                                            rows="3"
                                            placeholder="Es un perro muy bonito..."
                                            value={descripcion}
                                            onChange={(e) => setDescripcion(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label 
                                            htmlFor={`tipoFormularioMascota-${funcion}-${pk?pk:""}`}
                                            className="form-label"
                                        >Tipo de Mascota</label>
                                        <select
                                            className="form-select form-select mb-3" 
                                            id={`tipoFormularioMascota-${funcion}-${pk?pk:""}`}
                                            value={tipo}
                                            onChange={(e) => setTipo(e.target.value)}
                                        >
                                            <option value='P' >Perro</option>
                                            <option value='G'>Gato</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label 
                                            htmlFor={`razaFormularioMascota-${funcion}-${pk?pk:""}`}
                                            className="form-label"
                                        >Raza</label>
                                        <input 
                                            type="text" 
                                            className="form-control"
                                            id={`razaFormularioMascota-${funcion}-${pk?pk:""}`}
                                            placeholder="Pastor Aleman"
                                            value={rasa}
                                            onChange={(e) => setRasa(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label 
                                            htmlFor={`edadFormularioMascota-${funcion}-${pk?pk:""}`}
                                            className="form-label"
                                        >Edad en Años</label>
                                        <input 
                                            type="number" 
                                            className="form-control"
                                            id={`edadFormularioMascota-${funcion}-${pk?pk:""}`}
                                            value={edad}
                                            onChange={(e) => setEdad(e.target.value)}
                                        />
                                    </div>
                                </div>
                            )
                        }{
                            funcion==="Editar"?(
                                <div className="modal-footer">
                                    <button 
                                        type="button"
                                        className="btn btn-secondary" 
                                        data-bs-dismiss="modal"
                                    >Cancelar</button>
                                    <button
                                            type="button" 
                                            className="btn btn-success"
                                            onClick={(e) => actualizarMascota()}
                                    >Guardar Cambios</button>
                                </div>
                            ):""
                        }
                    </div>
                </div>
            </div>
        </div>
    ); 
}

export default MascotasFormComponent;