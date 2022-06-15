import PropTypes from 'prop-types';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Divider from '../Divider/Divider';
import StarRating from "../StarRating/StarRating";

const ProductCard = (props) => {
    const navigate = useNavigate();
    const  {thumbnailSrc, id, title, author, rating, price, handleAddToCart, vertical, recommendationQuantity, videosURL} = props;
    const block = vertical ? "product-card": "product-card-hor";
    const hasVideo = videosURL && videosURL.length > 0;

    const goToDetails = (e) => {
        navigate("/product/"+id);
    }

    const playVideo = (e)=>{
        if (hasVideo ) {
            const videos = e.currentTarget.getElementsByTagName("video");
            const images = e.currentTarget.getElementsByTagName("img");

            if (videos.length > 0) {
                images[0].classList.add(`${block}__img--hide`);
                videos[0].classList.add(`${block}__video--show`);
                videos[0].play();
            };
        }
    }

    const stopResetVideo =  (e) => {

        if (hasVideo) {
            const videos = e.currentTarget.getElementsByTagName("video");
            const images = e.currentTarget.getElementsByTagName("img");

            if (videos.length > 0) {
                images[0].classList.remove(`${block}__img--hide`);
                videos[0].classList.remove(`${block}__video--show`);
                videos[0].pause();
                videos[0].currentTime = 0.0;
            };
        }
    
    } 
    return (
       <article onMouseEnter={playVideo} onMouseLeave={stopResetVideo} className={`${block}__root `}>

            <div className= {`${block}__media-container`}>
                <Link aria-label = {"Go To product" + title} to={`/product/${id}`} >
                <img className={`${block}__img`} src={thumbnailSrc} alt={title + " thumbnail"}/>
                {
                    hasVideo &&
                    <video className={`${block}__video`}muted>
                        <source src = {videosURL[0]} type="video/mp4"/>
                    </video>
                }
                </Link>
            </div>
            
            
            <div className={`${block}__main-container`}>
                <div className={`${block}__title-container`}>
                    <Link aria-label ={"Go to" + title+ " page"}to={`/product/${id}`} >
                        <h3 className={`${block}__title`}>{title}</h3>
                    </Link>
                    <Link aria-label ={"Go to" + title+ " page"} to={`/product/${id}`} >
                        <h4 className={`${block}__author`}> {author} </h4>
                    </Link>
                    
                </div>
                <div className={`${block}__info-container `}>
                    <Link aria-label ={"Go to" + title+ " page"} to={`/product/${id}`} >
                        <div className={`${block}__rating-info`}>
                            <StarRating rating= {2} emptyClass ="empty-star-light" fullClass ="full-star-light"/>
                            <Divider isVertical = {true}/>
                            <p><i className={"fa fa-heart"}/> {recommendationQuantity}</p>
                            
                        </div>
                    </Link>
                    
                
                    <div className={`${block}__buy-info`}>
                        <p>{price}</p>
                        <button className={`${block}__add-cart`}
                         onClick={(e) => {
                            handleAddToCart(e); 
                            Swal.fire({
                                icon: "sucess",
                                text: "Added To Cart!"
                            });
                        }}><i className="fa fa-shopping-basket"/> Add to cart</button>
                    </div>
                    
                    
                </div>
            </div>
            
       </article>
    );

}

ProductCard.propTypes = {
    vertical: PropTypes.bool    
};
 export default ProductCard;