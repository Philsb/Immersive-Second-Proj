import { useContext } from "react";
import { Link } from "react-router-dom";
import { v1 } from "uuid";
import Divider from "../../components/Divider/Divider";
import IncrementButton from "../../components/IncrementButton/IncrementButton";
import List from "../../components/list/List";
import databaseContext from "../../context/databaseContext";
import useCart, {addToCart, deleteFromCart} from "../../hooks/useCart";

function Cart () {
    const block = "cart-page";
    const {data: gameData} = useContext(databaseContext);
    let cartItems = useCart();
    const hasItems = cartItems.length > 0;
    console.log("validation",gameData);
    let cartItemsElements = [];

    if (gameData != null) {
        cartItemsElements = cartItems.filter(item=>{
            console.log(item.id);
            return gameData[item.id].data;

        }).map((item) => {
            console.log(item.id);
            let gameDataHandle = gameData[item.id].data;
            let price = "Free";
            if (gameDataHandle.price_overview) {
                price = Number(gameDataHandle.price_overview.final_formatted.replace(/[^0-9.-]+/g,""));;
                price = price * item.count;
                price = "$" + price;
            }
            return (
            <div key = {v1()}className={`${block}__item-container`}>
                <img alt = {gameDataHandle.name + "thumbnail"} className={`${block}__img`} src={gameDataHandle.header_image}/>
                <div className={`${block}__info-container`}>
                    <Link to={"/product/"+item.id}>
                        <h2>{gameDataHandle.name}</h2>
                    </Link>
                    <h3>{gameDataHandle.publishers[0]}</h3>
                    <div className={`${block}__price-container`}>
                        <IncrementButton
                            handleInc = {() => {addToCart(item.id)}}
                            handleDec = {() => {deleteFromCart(item.id)}}
                            currentNumber = {item.count}
                        />
                        <p className={`${block}__price`}>{price}</p>
                    </div>
                </div>
                
                    
            </div>);
        });

    }
        

    return (
        <section className={`${block}`}>
            <h1><i className="fa fa-shopping-basket"/> Your Cart</h1>
            <Divider/>
            <List  className={`${block}__list`}>
                {cartItemsElements}
            </List> 
            {!gameData ? <div className={`${block}__loading`}>
                            <i className="fa fa-spinner fa-spin "/>
                        </div> :
                        <></>
            }
            {hasItems ? <><Divider/><Link to="checkout"><div className = {`${block}__checkout`}>Checkout</div></Link></> : <h2>You dont have items on your cart.</h2>} 
            
        </section>
       
    );
}

export default Cart;