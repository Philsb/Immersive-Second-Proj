import { v1 } from "uuid";
const List = (props)=>{
    const {listItems} = props;
    return (
        <ul>
            {listItems.map((x)=>
                <li key={v1()}>
                    {x}
                </li>
            )}
        </ul>
    );
};

export default List;