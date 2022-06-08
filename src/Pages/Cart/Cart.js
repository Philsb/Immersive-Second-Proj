import CartContext from "../Hooks/CartContext";

function Cart () {
    return (
        <CartContext.Consumer>
            {values => (
                <div>{values.items.toString()}</div>
            )}
        </CartContext.Consumer>
        
    );
}

export default Cart;