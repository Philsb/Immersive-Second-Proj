import {useParams} from "react-router-dom";
import CartContext from "../Hooks/CartContext";
import { addToCart } from "../Hooks/UseCart";
const Product = () => {
    const {id} = useParams();
    

    return (

        <>
            <button onClick={() => addToCart(id)}>Add to cart</button>
            this is a product {id}
            <hr/>
        </>
            
    );
}

export default Product;