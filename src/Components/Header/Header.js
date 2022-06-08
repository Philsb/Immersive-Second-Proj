import { Link } from "react-router-dom";
import CartContext from "../../Hooks/CartContext";
import useCart from "../../Hooks/CartContext";


import "./Header.scss";


let counter = 0;
const Header = (props) => {
    
    return (
        <header>
            <nav>
               
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="products">Products</Link></li>
                    <li><Link to="cart">Cart</Link></li>
                    <li><Link to="checkout">Checkout</Link></li>
                </ul>
                
                <CartContext>
                    {values => (
                        values.items.length
                    )}
                </CartContext>
                
                
                
            </nav>
        </header>
    )

}

export default Header;
