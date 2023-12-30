const { Link } = require("react-router-dom");

const DefaultLayout = ({children}) => {
    return (
        <>
            <header>
                <nav 
                    className="navbar navbar-expand-lg bg-body-tertiary fixed-top"
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
                                        <Link
                                            className="nav-link" 
                                            to="/register"
                                        >Registrarse</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>
            <main>
                {children}
            </main>
        </>
    );
}

export default DefaultLayout;