import { useContext } from "react";
import FlexContainer from "../../components/Container/FlexContainer";
import databaseContext from "../../hooks/databaseContext";
import { v1 } from "uuid";
import ProductCard from "../../components/card/ProductCard";
import { addToCart } from "../../hooks/useCart";
import Divider from "../../components/Divider/Divider";
import StaticCarousel from "../../components/carousel/StaticCarousel"
import { Link } from "react-router-dom";

const Home = (props) => {
    const block = "home-page";
    const {list:gameList, data: gameData} = useContext(databaseContext);

    let games = null;
    if (gameList != null && gameData != null){
        games = gameList.filter((item, index)=>{
            return index < 12;
        })
        .map (item => {
            let gameDataHandle = gameData[item.appid].data; 
            const title = gameDataHandle.name;
            const thumbnailSrc = gameDataHandle.header_image;
            const author = gameDataHandle.publishers[0];
            let videos = [];
            let recommendationQuantity = "(0)";
            let price = "Free";

            if (gameDataHandle.price_overview) {
                price = "("+gameDataHandle.price_overview.final_formatted+")";
            }

            if (gameDataHandle.recommendations) {
                recommendationQuantity = "("+gameDataHandle.recommendations.total+")";
            }

            if (gameDataHandle.movies) {
                videos = [gameDataHandle.movies[0].mp4["480"]];
            } 
            return (
                <ProductCard 
                    key={v1()}
                    thumbnailSrc={thumbnailSrc} 
                    title = {title} 
                    author={author}
                    price = {price}
                    id = {item.appid}
                    recommendationQuantity = {recommendationQuantity}
                    vertical = {true}
                    handleAddToCart = {()=>{addToCart(item.appid)}}
                    videosURL = {videos}
                >
                </ProductCard>

            );
             
    
        });
    }


    return (
        <section className={`${block}`}>
            <div className={`${block}__banner`}>
                <div className={`${block}__banner-info`}>
                    <h1>Gaming At Its Highest</h1>
                    <p>
                        Explore the best videogames in the market. 
                    </p>
                </div>
                <img className={`${block}__img`} src={"/Images/background2.jpg"} />
                
            </div>
            <div className={`${block}__search-games-container`}>
                <h2>Popular Games</h2>
                <i className="fa fa-lg fa-angle-right"/>
                <Link to ="/products">
                    <h3 className={`${block}__search-all-games`}>Browse All Games ...</h3>
                </Link>
                
            </div>
            
            <Divider/>
            <FlexContainer containedItems = {games}/>
            <Divider/>
            {
                gameData != null && <>
                    <h2>New game in the block : Witcher 3</h2>
                    <StaticCarousel
                    imgSrc = {
                        gameData[292030].data.screenshots.map((item)=>{
                            return item.path_thumbnail;
                            })
                        } 
                    />
                
                </>
            }
            
            
        </section>
    );
}

export default Home;