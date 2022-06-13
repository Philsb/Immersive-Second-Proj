import { useState } from "react";

import List from "../list/List";

const StaticCarousel = (props) => {
    const block = "static-carousel";
    const [currentElementIndex, setCurrentElementIndex] = useState(0);
    const {imgSrc} = props;

    const elements = imgSrc.map ((item,index)=>{
        const handleClick = ()=>{setCurrentElementIndex(index)}
        return <button onClick={handleClick}>
            {<img className={`${block}__thumb`} src={item}/>}
        </button>;
    });

    return (
        <div className={`${block}`}>
            <div className={`${block}__main-display`}>
                {<img className={`${block}__img`} src={imgSrc[currentElementIndex]}/>}
            </div>
            <List className={`${block}__list`}>
                {elements}
            </List>
        </div>

    );


}

export default StaticCarousel;