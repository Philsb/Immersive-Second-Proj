import PropTypes from 'prop-types';
const IconStar = (props) => {
    const block = "icon-star"
    const {full, fullClass, emptyClass} = props;
    const className = full ? `${block}__root--full ` + fullClass  : emptyClass;

    return (
        <svg className={ `${block}__root ` + className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25 ">
            <path   d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"/>
        </svg>
        );
}

IconStar.propTypes = {
    full: PropTypes.bool    
};
export default IconStar;