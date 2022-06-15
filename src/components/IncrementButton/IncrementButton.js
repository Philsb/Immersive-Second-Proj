import Divider from "../Divider/Divider";

const IncrementButton = (props) => {
    const block = "inc-button";
    const {handleInc, handleDec, currentNumber} = props;

    return (
        <div className={`${block}`}>
            <button aria-label="Decrement Product" className={`${block}__button`} onClick={handleDec}>
                <i className="fa fa-minus"/>
            </button>
            {currentNumber}
            <button aria-label="Increment Product" className={`${block}__button`} onClick={handleInc}>
                <i className="fa fa-plus"/>
            </button>
                
            
        </div>
        );
}

export default IncrementButton;