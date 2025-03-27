import ProductListItem from "../components/ProductItem";
import "../style/products.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ProductsList() {
    const navigate = useNavigate();

    useEffect(() => {
        const hasTokenInLocalStorage = localStorage.getItem("token") !== null;
        if (!hasTokenInLocalStorage) {
            navigate("/login"); 
        }
    }, [navigate]);

    return (
        <div className="container-products">
            <ProductListItem />
            <ProductListItem />
            <ProductListItem />
        </div>
    );
}
