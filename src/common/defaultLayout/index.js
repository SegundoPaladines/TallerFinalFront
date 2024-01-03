import { useAuth } from '../../providers';
import './index.css';
const { Link } = require("react-router-dom");

const DefaultLayout = ({children}) => {

    const auth = useAuth();

    const cerrarSesion = () => {
        auth.finalizarSesion();
    }

    return (
        <>
            <header>
                <nav 
                    className="navbar navbar-expand-lg bg-body-tertiary pe-lg-5 ps-lg-5 fixed-top"
                    data-bs-theme="dark"    
                >
                        <div className="container-fluid">
                            <Link
                                className="navbar-brand"
                                to="/"
                            >Navbar</Link>
                            <Link 
                                className="navbar-toggler"
                                type="button" 
                                data-bs-toggle="collapse" 
                                data-bs-target="#navbarSupportedContent" 
                                aria-controls="navbarSupportedContent" 
                                aria-expanded="false" 
                                aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                            </Link>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link 
                                            className="nav-link"
                                            to="/"
                                        >Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        {
                                            auth.isAutenticated?
                                            (
                                                <Link
                                                    className="nav-link" 
                                                    to="/mascotas"
                                                >
                                                    Mascotas
                                                </Link>
                                            ):
                                            (
                                                <Link
                                                    className="nav-link" 
                                                    to="/register"
                                                >
                                                    Registrarse
                                                </Link>
                                            )
                                        }
                                    </li>
                                    <li className="nav-item">
                                        {
                                            auth.isAutenticated?
                                            (
                                                <Link
                                                    className="nav-link" 
                                                    to="/solicitudes"
                                                >
                                                    Solicitudes
                                                </Link>
                                            ):""
                                        }
                                    </li>
                                </ul>
                                <div className="justify-content-end">
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-end">
                                        {
                                            auth.isAutenticated?(
                                                <li className="nav-item">
                                                    <button
                                                        className="btn btn-outline-danger"
                                                        onClick={(e) => cerrarSesion()}
                                                        >
                                                            <i className="fa-solid fa-right-from-bracket"></i>
                                                    </button>
                                                </li>
                                            ):(
                                                <li className="nav-item">
                                                    <Link
                                                        className="btn btn-outline-success"
                                                        to="/login"
                                                    >
                                                        <i className="fa-solid fa-user"></i>
                                                    </Link>
                                                </li>
                                            )
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
            <div>
                {children}
            </div>
        </>
    );
}

export default DefaultLayout;