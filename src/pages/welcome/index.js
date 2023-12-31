import { useAuth } from "../../auth/authServiceProvider";
const Welcome = () => {
    const auth = useAuth();
    const cerrarSesion = () => {
        auth.finalizarSesion();
    }
    return(
        <div>
            {auth.user.rol==="administrador"?(
                <p>Este es un administrador</p>
            ):(
                <p>Este es un usuario</p>
            )
            }
            <button
            className="btn btn-success w-80"
            onClick={(e) => cerrarSesion()}
            >
                Log out
            </button>
        </div>
    );
}

export default Welcome;