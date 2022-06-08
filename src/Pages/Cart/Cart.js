import { useContext } from "react";
import List from "../../Components/List/List";
import useCart, {deleteFromCart} from "../../Hooks/UseCart";

function Cart () {
    let values = useCart();


    const cartItems = values.map((item) => {
       return (
       <div>
            {item}
            <button onClick = {() => {deleteFromCart(item)}} >
                delete item
            </button>
       </div>);
    });


    return (
        <List listItems = {cartItems}/> 
    );
}

export default Cart;