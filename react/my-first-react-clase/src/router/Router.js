import { Routes, Route } from "react-router-dom";
import Home from '../page/Home';
import About from '../page/About';
import Contact from '../page/Contact';
import Login from "../page/Login";
import Products from '../page/Products';
import PrivateRoute from "./RouterPriv"; 

export default function MyRouters() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
            <Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
            <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
        </Routes>
    );
}
