import { Link, useLocation } from "react-router-dom";
import MyRouters from "../../router/Router";



export default function Menu() {
    const location = useLocation();
    const restringidos = ["/login"];
    const allowed = [restringidos.indexOf(location.pathname) === -1];
    return (
        <div className="App">
            {restringidos.indexOf(location.pathname) === -1 && (
                <header className="App-header">
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/products">Products</Link></li>
                        </ul>
                    </nav>
                </header>
            )}


            <MyRouters />
        </div>
    );
}