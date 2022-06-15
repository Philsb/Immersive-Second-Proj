import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { v1 } from "uuid";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import Divider from "../../components/Divider/Divider";
import List from "../../components/list/List";
import databaseContext from "../../context/databaseContext";
import Swal from "sweetalert2";

import useCart, {removeAllFromCart} from "../../hooks/useCart";

function Checkout (props) {
    const block = "checkout-page";
    const navigate = useNavigate();
    const {data: gameData} = useContext(databaseContext);
    const cartItems = useCart();
    const hasItems = cartItems.length > 0;

    const checkoutAction = (e) =>{
        e.preventDefault();
        Swal.fire({
            icon: "sucess",
            text: "Succesful purchase!"
        });
        removeAllFromCart();
        navigate("/");
    }
    
    
    
    let totalPrice = 0.0;

    let cartItemsElements = [];

    if (gameData) {
        cartItemsElements = cartItems.map((item) => {
            let gameDataHandle = gameData[item.id].data;
            let price = "Free";
            if (gameDataHandle.price_overview) {
                price = Number(gameDataHandle.price_overview.final_formatted.replace(/[^0-9.-]+/g,""));;
                price = price * item.count;
                totalPrice += price;
                price = "$" + price;
            }
    
        
            
            
    
    
            return (
            <div  key = {v1()} className={`${block}__item-container`}>
                <h3>{gameDataHandle.name} x {item.count}</h3>
                <p>{price}</p>
            </div>);
        });
    }
    

    
    return (hasItems ?
        <section>
            <h1> Checkout </h1>
            <Divider/>
            <div className={`${block}__content`}>
                <div className={`${block}__details-container`}>
                    <h2>Order Summary</h2>
                    <Divider/>
                    <List>
                        {cartItemsElements}
                    </List>
                    {!gameData ? <div className={`${block}__loading`}>
                                    <i className="fa fa-spinner fa-spin "/>
                                </div> 
                                :
                                <></>
                    }
                    <div className={`${block}__total-price-container`}>
                        <h2> Pay Amount</h2>
                        <Divider/>
                        <p className={`${block}__total-price`}>${totalPrice.toFixed(2)}</p>
                    </div>
                </div>
                <Divider isVertical={true}/>
                <div className={`${block}__form-container`}>
                    <CheckoutForm handleCheckout = {checkoutAction}/>
                </div>
                
                
            </div> 
        </section>
        :
        <>The cart has no items</>
    );
}

export default Checkout;