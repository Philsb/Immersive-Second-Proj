import PropTypes from 'prop-types';
import { v1 } from 'uuid';
import IconStar from "./IconStar";

const StarRating = (props) => {
    const block = "star-rating";
    const {rating, fullClass, emptyClass} = props;

    const starElements = []

    for(let i = 0; i<5; ++i){
        if (i+1 > rating) {
            starElements.push(<IconStar key={v1()} fullClass= {fullClass} emptyClass= {emptyClass} full = {false}/>)
        }
        else {
            starElements.push(<IconStar key={v1()} fullClass= {fullClass} emptyClass= {emptyClass} full = {true}/>)
        }
    }
    return (

        
        <div>
            {starElements}
        </div>

    );  
    
}

IconStar.propTypes = {
    rating: PropTypes.number    
};

export default StarRating;