import { useState, useEffect, useContext } from "react";
import {useParams} from "react-router-dom";
import databaseContext from "../../hooks/databaseContext";
import { Swiper, SwiperSlide } from 'swiper/react';
import { addToCart } from "../../hooks/useCart";
import StaticCarousel from "../../components/carousel/StaticCarousel";
import Divider from "../../components/Divider/Divider";
import StarRating from "../../components/StarRating/StarRating";
import IncrementButton from "../../components/IncrementButton/IncrementButton";
const Product = () => {
    const block = "product";
    const values = useParams();
    const {data: gameData} = useContext(databaseContext);
    const [productQuantity, setProductQuantity]= useState(1);
    const gameDataHandle = gameData[values.id].data;

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



    const recommendations = gameDataHandle.recommendations ? gameDataHandle.recommendations.total : "0";
    const price = gameDataHandle.price_overview ? <h2>{gameDataHandle.price_overview.final_formatted}</h2> : <h2>Free</h2>;
    return (

        <article className={`${block}`}>
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
                    <img  className={`${block}__secondary-img`} src={gameDataHandle.header_image}/>
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
                                rating={5}/>
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
                        <button className={`${block}__buy-button`} onClick={handleProductAdd}>
                            <i className="fa fa-shopping-basket"/>
                             Add to cart
                        </button>
                        
                    </div>

                    
                </div>
                
                
                
            </div>
            
            
            
        </article>
            
    );
}

export default Product;