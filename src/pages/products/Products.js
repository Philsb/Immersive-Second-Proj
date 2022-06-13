import { useEffect, useState, useContext } from "react";
import { useParams, useLocation, useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
import SearchBar from "../../components/searchbar/Searchbar"
import ProductCard from "../../components/card/ProductCard";
import { addToCart } from "../../hooks/useCart";
import databaseContext from "../../hooks/databaseContext";

import List from "../../components/list/List";
import FlexContainer from "../../components/Container/FlexContainer";
import { v1 } from "uuid";
import Divider from "../../components/Divider/Divider";
import ToggleList from "../../components/ToggleList/ToggleList";
import PageNavigation from "../../components/PageNavigation/PageNavigation";

//TODO pasar a utils
function useQuery() {
    const { search } = useLocation();

    return new URLSearchParams(search);
}

function Products (props) {
    
    const block = "product-page";
    const navigate = useNavigate();
    const urlParams = useQuery();
    const thisUrl = useLocation();
    const [searchQuery, setSearchQuery] = useState("");
    const [tagQuery, setTagQuery] = useState (urlParams.getAll("tag"));
    const [page, setPage] = useState(urlParams.get("pag") ? urlParams.get("pag") : 0);
    const {list:gameList, data: gameData} = useContext(databaseContext);
    const productsPerPage = 5;

    useEffect(()=>{
        const {search} = thisUrl;
        const query = new URLSearchParams(search);
        let tags = query.getAll("tag");
        let pag = query.get("pag");

        setTagQuery(tags);
        setPage(pag ? pag : 0);
    },[thisUrl]);

    const addTag = (tag)=> {
        const lowerCaseTag = tag.toLowerCase();
    
        
        if (tagQuery.includes(lowerCaseTag )) {
            let index = tagQuery.indexOf(lowerCaseTag );
            tagQuery.splice(index,1)
        }
        else {
            tagQuery.push(lowerCaseTag );
        }
        setTagQuery([...tagQuery]);
        setPage(0);
        let newUrl = tagQuery.length>0 ? new URLSearchParams({tag: tagQuery}).toString() : "";
        navigate(thisUrl.pathname +"?" +newUrl);
        
    }; 
    
    let games = null;


    if (gameList != null && gameData != null){
        games = gameList.filter((item, index)=>{
            if (gameData[item.appid].success == false) {
                return false;
            }
            let gameDataHandle = gameData[item.appid].data; 
            let shouldRender = true;
            //Filter by tag
            let tags = gameDataHandle.genres.map(tag => tag.description.toLowerCase());
            tagQuery.forEach (tagQueryItem => {
                shouldRender = tags.includes(tagQueryItem.toLowerCase()) && shouldRender;
            });

            //Filter by name
            let name = gameDataHandle.name;
            shouldRender = name.toLowerCase().includes(searchQuery.toLowerCase()) && shouldRender;
            
            //Filter by page
            shouldRender = (index>=page*productsPerPage && index < (page*productsPerPage + productsPerPage)) && shouldRender;

            
            return shouldRender;
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
                    vertical = {false}
                    handleAddToCart = {()=>{addToCart(item.appid)}}
                    videosURL = {videos}
                >
                </ProductCard>

            );
             
    
        });
    }

    

    return (
        
        <databaseContext.Consumer>
        {
            value => {
                console.log(value);
                return (

                    <>
                        <h1 >Our Games</h1>
                        <section className={block}>
                            <div className={`${block}__sidebar`}>
                                <h2>Categories</h2>
                                <Divider/>
                                <ToggleList
                                    toggleableItems = {[
                                        {toggled:tagQuery.includes("First Person Shooter".toLowerCase()),title: "First Person Shooter", function:()=>{addTag("First Person Shooter")}},
                                        {toggled:tagQuery.includes("Free to Play".toLowerCase()),title: "Free to Play", function:()=>{addTag("Free to Play")}},
                                        {toggled:tagQuery.includes("2D".toLowerCase()),title: "2D", function:()=>{addTag("2D")}},
                                        {toggled:tagQuery.includes("Casual".toLowerCase()),title: "Casual", function:()=>{addTag("Casual")}}
                                    ]}
                                />
                            </div>
                            <div className={`${block}__main-container`}>
                                <div className={`${block}__search`}>
                                    <SearchBar updateSearch = {setSearchQuery}/>
                                    <Divider/>
                                    <div className={`${block}__tags`}>
                                        {tagQuery.map((item)=>{
                                            return (<button key={v1()} className={`${block}__button-active-tag`} onClick={()=>{addTag(item)}}>
                                                <i className="fa fa-times"></i>
                                                {item.toUpperCase()}
                                                </button>);
                                        })}
                                    </div>
                                </div> 
                                {
                                    value.data ? 
                                    <>
                                        <List className = {`${block}__product-list`}>
                                        {games}
                                        </List>
                                        <Divider/>
                                        <div className={`${block}__navigation`}>
                                        
                                            <PageNavigation 
                                                currentPage = {parseInt(page,10)} 
                                                pagesQuantity = {10}
                                                sidePages = {3}
                                                onClickItem = {(pagIndex)=>{
                                                    let newUrl = tagQuery.length>0 ? new URLSearchParams({tag: tagQuery, pag: pagIndex}).toString() : new URLSearchParams({ pag: pagIndex}).toString() ;
                                                    setPage(pagIndex);
                                                    navigate(thisUrl.pathname +"?" +newUrl);
                                                }}
                                            />
                                        </div>
                                        
                                    </>
                                    
                                    :
                                    <div className={`${block}__loading`}>
                                        <i className="fa fa-spinner fa-spin "/>
                                    </div>
                                    
                                }
                                
                                
                            </div>
                            
                        </section>
                    </>
                
            


                );

                }  
                
                

           
        }
            
                
        </databaseContext.Consumer>
    );
}

export default Products;