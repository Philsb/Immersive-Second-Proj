
import List from "../list/List";
const FlexContainer = (props)=>{
    const block = "flex-container";
    const {containedItems} = props;
    if (containedItems == null || containedItems == undefined) {
        return <></>;
    }

    return (

        <div className={block}>
            <List className={`${block}__list`}>
                {containedItems}
            </List>
           
        </div>
       
    );
};

export default FlexContainer;