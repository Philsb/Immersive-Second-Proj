import { useState, useEffect, useContext } from "react";
import {useParams} from "react-router-dom";
import databaseContext from "../../context/databaseContext";
import { addToCart } from "../../hooks/useCart";
import StaticCarousel from "../../components/carousel/StaticCarousel";
import Divider from "../../components/Divider/Divider";
import StarRating from "../../components/StarRating/StarRating";
import IncrementButton from "../../components/IncrementButton/IncrementButton";
import Swal from "sweetalert2";
const Product = () => {
    const block = "product";
    const values = useParams();
    const {data: gameData} = useContext(databaseContext);
    const [productQuantity, setProductQuantity]= useState(1);
    let gameDataHandle = null;

    gameDataHandle = gameData ? gameData[values.id].data : null;



    const handleProductAdd = (e)=> {
        e.preventDefault();
        if (productQuantity > 0) {
            addToCart(values.id, productQuantity);

        }
        setProductQuantity(1);
    }

    const incrementProduct = (e) => {
        e.preventDefault();
        setProductQuantity (productQuantity+1);
    }
    
    const decrementProduct = (e) => {
        e.preventDefault();
        if (productQuantity > 1) {
            setProductQuantity (productQuantity-1);
        }
        
    } 



    const recommendations = gameData && gameDataHandle.recommendations ? gameDataHandle.recommendations.total : "0";
    const price = gameData && gameDataHandle.price_overview ? <h2>{gameDataHandle.price_overview.final_formatted}</h2> : <h2>Free</h2>;
    return (

        <article className={`${block}`}>
            {
                gameData && 
                <>

                 <h1>{gameDataHandle.name}</h1>
                    <div className={`${block}__main-container`}>
                        <div className = {`${block}__media`}>

                        <StaticCarousel
                            imgSrc = {
                                gameDataHandle.screenshots.map((item)=>{
                                    return item.path_thumbnail;
                                })
                            }
                        />
                        
                        </div>    
                    
                        
                        
                        <div className={`${block}__info`}>
                            <img  alt = "Main Thumbnail" className={`${block}__secondary-img`} src={gameDataHandle.header_image}/>
                            <Divider/>
                            <p  className={`${block}__desc`} >{gameDataHandle.short_description.replace(/<\/?[^>]+(>|$)/g, "")}</p>
                            <Divider/>  
                            <div className={`${block}__sec-details`}>
                                <p>Release Date: {gameDataHandle.release_date.date} </p>
                                <p>Recomendations: <i className={"fa fa-heart"}/> {"("+  recommendations +")"}</p>
                                <p>Publisher: {gameDataHandle.publishers[0]}</p>
                                <div className={`${block}__star-rating`}>
                                    <StarRating 
                                        emptyClass = {"product-empty-star"} 
                                        fullClass = {"product-full-star"}
                                        rating={3}/>
                                </div>
                                
                            </div>
                            <Divider/>
                            
                            
                            <div className={`${block}__buy-info`}>
                                {price}
                                <div className={`${block}__buy-options`}>
                                    <h3>Quantity</h3>
                                    <IncrementButton 
                                        handleInc = {incrementProduct}
                                        handleDec = {decrementProduct}
                                        currentNumber = {productQuantity}
                                    />
                                    
                                </div>
                                <button aria-label="Go To Cart" className={`${block}__buy-button`} 
                                    onClick={(e)=>{
                                        handleProductAdd(e);
                                        Swal.fire({
                                            icon: "sucess",
                                            text: "Added to Cart!"
                                        });
                                    }}>
                                    <i className="fa fa-shopping-basket"/>
                                    Add to cart
                                </button>
                                
                            </div>

                            
                        </div>
                        
                        
                        
                    </div>
                </>
            }
           
            
            
            
        </article>
            
    );
}

export default Product;
