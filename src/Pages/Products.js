import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

function Products () {
    return (
        
        <>
        this is products
        <ul>
            <li><Link to="1">1</Link></li>
            <li><Link to="2">2</Link></li>
            <li><Link to="3">3</Link></li>
            <li><Link to="4">4</Link></li>
        </ul>
                
        </>
    );
}

export default Products;