import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { v1 } from "uuid";
import IconToggle from "../IconToggle/IconToggle";
import List from "../list/List";

const ToggleList = (props) => {
    const block = "toggle-list";
    const navigate = useNavigate();
    const location = useLocation();
    const {toggleableItems} = props;        


    return (
        <List className={`${block}__list`}>
            {toggleableItems.map(item => {      
                const handleToggle = ()=>{
                    item.toggled = !item.toggled;
                    item.function(); 
                }

                return <button key={v1()} className={`${block}__button`} onClick={handleToggle}>
                            <div className={`${block}__icon`}>
                                <IconToggle isActive = {item.toggled}/> 
                            </div> 
                            <div  className={`${block}__title`}>
                                {item.title}
                            </div> 
                            
                        </button>
            })}
        </List>

    );
}

export default ToggleList;