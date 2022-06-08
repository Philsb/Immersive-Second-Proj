import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCart, {myCartState$} from "../../Hooks/UseCart";


import "./Header.scss";



const Header = (props) => {

    let value = useCart();
    
    return (
        <header>
            <nav>
               
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="products">Products</Link></li>
                    <li><Link to="cart">Cart</Link></li>
                    <li><Link to="checkout">Checkout</Link></li>
                </ul>
                {value.length}
                
                
                
            </nav>
        </header>
    );

}

export default Header;
