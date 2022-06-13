import PropTypes from 'prop-types';
import IconStar from "./IconStar";

const StarRating = (props) => {
    const block = "star-rating";
    const {rating, fullClass, emptyClass} = props;

    const starElements = []

    for(let i = 0; i<5; ++i){
        if (i+1 > rating) {
            starElements.push(<IconStar fullClass= {fullClass} emptyClass= {emptyClass} full = {false}/>)
        }
        else {
            starElements.push(<IconStar fullClass= {fullClass} emptyClass= {emptyClass} full = {true}/>)
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