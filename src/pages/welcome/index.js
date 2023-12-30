import { useAuth } from "../../auth/authServiceProvider";
const Welcome = () => {
    const auth = useAuth();
    const cerrarSesion = () => {
        auth.signout();
    }
    return(
        <button
            className="btn btn-success w-80"
            onClick={(e) => cerrarSesion()}
        >
            Log out
        </button>
    );
}

export default Welcome;