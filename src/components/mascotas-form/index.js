import { useEffect, useState } from "react";
import { useMascotas } from "../../providers";
import { mostrarAlerta } from "../../functions";

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
    const [tipo, setTipo] = useState('P');
    const [estado, setEstado] = useState(0);

    const [alert, setAlert] = useState('');
    const [alertType, setAlertType] = useState('');

    //control de errores
    const msg = "El Valor Digitado no es Válido";

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
                setEstado(res.estado);
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
                tipo_mascota:tipo,
                estado:estado
            }
            const res = await mascotasService.actualizarMascota(pk, dataset);

            if(res === "success"){
                mostrarAlerta("Mascota Actualizada con Exito","success");
            }else{
                mostrarAlerta("No se ha Podido Actualizar la Mascota","error");
            }
        }
    }

    const agregarMascota = async () => {
        if(validarCampos()){
            const dataset = {
                nombre:nombre,
                foto:foto,
                descripcion:descripcion,
                rasa:rasa,
                edad:edad,
                tipo_mascota:tipo,
                estado:estado
            }

            const res = await mascotasService.crearMascota(dataset);

            if(res === "success"){
                mostrarAlerta("Mascota Creada con Exito","success");
            }else{
                mostrarAlerta("No se ha Podido crear la Mascota", "error");
            }
        }
    }

    const eliminarMascota = async () =>{
        const res = await mascotasService.eliminarMascota(pk);

        if(res === "success"){
            mostrarAlerta("Mascota Eliminada Exito","success");
        }else{
            mostrarAlerta("No se ha Podido Eliminar la Mascota", "error");
        }
    }

    //cuando un campo está vacio
    const campoVacio = (valor) => {
        if(valor===""){
            return true;
        }
        return false;
    }

    const validarEdad = (edad) => {
        if(!edad){
            return false;
        }

        if(edad < 0){
            return false;
        }

        return true;
    }

    const validarCampos = () => {
        if(nombre === "" || foto === "" || descripcion === "" || rasa === "" || edad < 0 || !edad){
            return false;
        }

        return true;
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
                            alertType!==""?(
                                <div className="row">
                                    <div className={`alert alert-${alertType} text-center`} role="alert">
                                        {alert}
                                    </div>
                                    < hr />
                                </div>
                            ):""
                        }
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
                                            className={`form-control ${campoVacio(nombre)?"is-invalid":"is-valid"}`}
                                            id={`nombreFormularioMascota-${funcion}-${pk?pk:""}`}
                                            aria-describedby={`nombreGroup-${funcion}-${pk?pk:""} nombreFeedback-${funcion}-${pk?pk:""}`}
                                            required
                                            placeholder="Firulais"
                                            value={nombre}
                                            onChange={(e) => {setNombre(e.target.value); }}
                                        />
                                        <div
                                            id={`nombreFeedback-${funcion}-${pk?pk:""}`}
                                            className="invalid-feedback"
                                        >
                                            {msg}
                                        </div>
                                    </div>
                                    <div className="mb-3 input-group has-validation">
                                        <label 
                                            htmlFor={`fotoFormularioMascota-${funcion}-${pk?pk:""}`}
                                            className="form-label w-100"
                                        >Url Foto</label>
                                        <input
                                            type="text" 
                                            className={`form-control ${campoVacio(foto)?"is-invalid":"is-valid"}`}
                                            id={`fotoFormularioMascota-${funcion}-${pk?pk:""}`}
                                            placeholder="https://una/imagen/de/internet.jpg"
                                            aria-describedby={`fotoGroup-${funcion}-${pk?pk:""} fotoFeedback-${funcion}-${pk?pk:""}`}
                                            required
                                            value={foto}
                                            onChange={(e) => {setFoto(e.target.value);}}
                                        />
                                        <div
                                            id={`fotoFeedback-${funcion}-${pk?pk:""}`}
                                            className="invalid-feedback"
                                        >
                                            {msg}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label 
                                            htmlFor={`descripcionFormularioMascota-${funcion}-${pk?pk:""}`}
                                            className="form-label w-100"
                                        >Descripción</label>
                                        <textarea 
                                            className={`form-control ${campoVacio(descripcion)?"is-invalid":"is-valid"}`}
                                            id={`descripcionFormularioMascota-${funcion}-${pk?pk:""}`}
                                            aria-describedby={`descGroup-${funcion}-${pk?pk:""} descFeedback-${funcion}-${pk?pk:""}`}
                                            rows="3"
                                            placeholder="Es un perro muy bonito..."
                                            value={descripcion}
                                            onChange={(e) => {setDescripcion(e.target.value);}}
                                        ></textarea>
                                        <div
                                            id={`descFeedback-${funcion}-${pk?pk:""}`}
                                            className="invalid-feedback"
                                        >
                                            {msg}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label 
                                            htmlFor={`tipoFormularioMascota-${funcion}-${pk?pk:""}`}
                                            className="form-label"
                                        >Tipo de Mascota</label>
                                        <select
                                            className="form-select form-select mb-3 is-valid" 
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
                                            className={`form-control ${campoVacio(rasa)?"is-invalid":"is-valid"}`}
                                            id={`razaFormularioMascota-${funcion}-${pk?pk:""}`}
                                            aria-describedby={`rasaGroup-${funcion}-${pk?pk:""} rasaFeedback-${funcion}-${pk?pk:""}`}
                                            placeholder="Pastor Aleman"
                                            value={rasa}
                                            onChange={(e) => setRasa(e.target.value)}
                                        />
                                        <div
                                            id={`rasaFeedback-${funcion}-${pk?pk:""}`}
                                            className="invalid-feedback"
                                        >
                                            {msg}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label 
                                            htmlFor={`edadFormularioMascota-${funcion}-${pk?pk:""}`}
                                            className="form-label"
                                        >Edad en Años</label>
                                        <input 
                                            type="number" 
                                            className={`form-control ${!validarEdad(edad)?"is-invalid":"is-valid"}`}
                                            id={`edadFormularioMascota-${funcion}-${pk?pk:""}`}
                                            aria-describedby={`edadGroup-${funcion}-${pk?pk:""} edadFeedback-${funcion}-${pk?pk:""}`}
                                            value={edad}
                                            onChange={(e) => setEdad(e.target.value)}
                                        />
                                        <div
                                            id={`edadFeedback-${funcion}-${pk?pk:""}`}
                                            className="invalid-feedback"
                                        >
                                            {msg}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label 
                                            htmlFor={`estadoFormularioMascota-${funcion}-${pk?pk:""}`}
                                            className="form-label"
                                        >Estado de la Mascota</label>
                                        <select
                                            className="form-select form-select mb-3 is-valid"
                                            id={`estadoFormularioMascota-${funcion}-${pk?pk:""}`}
                                            value={estado}
                                            onChange={(e) => setEstado(e.target.value)}
                                        >
                                            <option value={0} >Sin Adoptar</option>
                                            <option value={1} >Adoptado</option>
                                        </select>
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
                                        onClick={(e) => {
                                            setAlertType("");
                                            setAlert("");
                                        }}
                                    >Cancelar</button>
                                    <button
                                            type="button" 
                                            className="btn btn-success"
                                            onClick={(e) => actualizarMascota()}
                                    >Guardar Cambios</button>
                                </div>
                            ):""
                        }{
                            funcion==="Agregar"?(
                                <div className="modal-footer">
                                    <button 
                                        type="button"
                                        className="btn btn-secondary" 
                                        data-bs-dismiss="modal"
                                        onClick={(e) => {
                                            setAlertType("");
                                            setAlert("");
                                        }}
                                    >Cancelar</button>
                                    <button
                                            type="button" 
                                            className="btn btn-success"
                                            onClick={(e) => agregarMascota()}
                                    >Crear Mascota</button>
                                </div>
                            ):""
                        }{
                            funcion==="Eliminar"?(
                                <div className="modal-footer">
                                    <button 
                                        type="button"
                                        className="btn btn-success" 
                                        data-bs-dismiss="modal"
                                        onClick={(e) => {
                                            setAlertType("");
                                            setAlert("");
                                        }}
                                    >Cancelar</button>
                                    <button
                                            type="button" 
                                            className="btn btn-danger"
                                            onClick={(e) => eliminarMascota()}
                                    >Eliminar Mascota</button>
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