import { useState, useEffect } from "react";
import { v1 } from "uuid";
import { Link } from "react-router-dom";
import useCart, {myCartState$} from "../../hooks/useCart";
import List from "../list/List";



const Header = (props) => {
    const block = "header";
    const {logo, companyName,links} = props;
    let value = useCart();
    const linkElements = links.map(item=>
        <Link key={v1()} to={item.to} className="anchor-list-h__anchor">{item.element}</Link>
    );
    return (
        <header>
            <nav className={block}>

                <div className={`${block}__logo-container`}>
                    <Link className={`${block}__logo-container`} to ="/">
                        <img className={`${block}__logo`} src={logo.src} alt={logo.alt}/>
                        <h2 className={`${block}__company-name`}>{companyName}</h2>
                    </Link>
                    
                </div>
                <div className={`${block}__links-container`}>
                    <List className="anchor-list-h">
                        {linkElements}
                    </List>
                </div>
                                            
            </nav>
        </header>
    );

}


export default Header;
