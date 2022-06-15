import { v1 } from "uuid";

const PageNavigation = (props) => {
    const block = "page-navigation";
    const {currentPage, pagesQuantity, sidePages, onClickItem} = props;
    let pagesElements = [];
    

    for (let i = currentPage-sidePages; i<=currentPage+sidePages; ++i) {
    
        const key = v1();
        if ( i >= 0 && i < pagesQuantity) {
            if (currentPage == i) {
                pagesElements.push (<button onClick={()=>{onClickItem(i)}} 
                                            className={`${block}__button ${block}__button--current-page`}
                                            key={key}>
                                                {i}
                                    </button>);
            }
            else {
                pagesElements.push (<button onClick={()=>{onClickItem(i)}} 
                                            className={`${block}__button`}
                                            key={key}>
                                                {i}
                                    </button>);
            }
            
        }
        
    }
    return (
        <div className={`${block}`}>
            {currentPage == 0 ? <></> : 
                <button aria-label = {"decrement page number"} onClick={()=>{onClickItem(currentPage-1)}} className={`${block}__button--side-button`}>
                    <i className={"fa fa-angle-double-left "}/>
                </button>
            }
            
            {pagesElements}
            {currentPage >= pagesQuantity-1 ? <></> :
                 <button aria-label="Increment Page Number" onClick={()=>{onClickItem(currentPage+1)}} className={`${block}__button--side-button`}>
                    <i className={"fa fa-angle-double-right "}/>
                </button> 
            }
           
        </div>
        
    );
}
export default PageNavigation;