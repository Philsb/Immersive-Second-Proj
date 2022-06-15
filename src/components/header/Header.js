import { useState, useEffect } from "react";
import { v1 } from "uuid";
import { Link } from "react-router-dom";
import useCart, {myCartState$} from "../../hooks/useCart";
import List from "../list/List";



const Header = (props) => {
    const block = "header";
    const {logo, shoppingCart,companyName,links} = props;
    let value = useCart();
    let cartHasItemsCircle = value.length > 0 ? ` ${block}__circle--active` : "";

    let linkElements = [];
    linkElements.push(<Link aria-label={"Go main Shopping Cart"} key={v1()} to={shoppingCart.to} className="anchor-list-h__anchor"><div className={`${block}__shop-cart-cont`}><i className={`${block}__circle fa fa-circle` + cartHasItemsCircle}/>{shoppingCart.element}</div></Link>);
    
    let finalLinks = linkElements.concat(links.map(item=>
        <Link aria-label={"Go to " + item.title} key={v1()} to={item.to} className="anchor-list-h__anchor">{item.element}</Link>
    ));

    

    return (
        <header>
            <nav className={block}>

                <div  className={`${block}__logo-container`}>
                    <Link  aria-label={"Go main page"} className={`${block}__logo-container`} to ="/">
                        <img className={`${block}__logo`} src={logo.src} alt={logo.alt}/>
                        <h2 className={`${block}__company-name`}>{companyName}</h2>
                    </Link>
                    
                </div>
                <div className={`${block}__links-container`}>
                    <List  className="anchor-list-h">
                        {finalLinks}
                        
                    </List>
                </div>
                                            
            </nav>
        </header>
    );

}


export default Header;
