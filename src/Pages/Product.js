import {useParams} from "react-router-dom";
import CartContext from "../Hooks/CartContext";
const Product = () => {
    const {id} = useParams();


    return (
        <CartContext.Consumer>

            {values => (
                <>
                    <button onClick={() => values.add(id)}>Add to cart</button>
                    this is a product {id}
                    <hr/>
                </>
                
            )}
            

        </CartContext.Consumer>
    );
}

export default Product;