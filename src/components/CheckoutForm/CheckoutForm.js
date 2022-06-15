
const CheckoutForm = (props) => {
    const block = "checkout-form";
    const {handleCheckout} = props;
 

    return (
    
        <form className = {`${block}`} onSubmit={handleCheckout}>
            
            <div className = {`${block}__entry`}>
                <label htmlFor="Name">Cardholder</label>
                <input id="Name" type="text" maxLength="255" required></input>
            </div>
            <div className = {`${block}__entry`}>
                <label htmlFor="CreditCardNumber">Card number</label>
                <input id="CreditCardNumber" type="number" placeholder="1234 1234 1234 1234" required></input>
            </div>
            <div className = {`${block}__entry-container`}>
                <div className = {`${block}__entry ${block}__entry--double`}>
                    <label htmlFor="ExpiryDate">Expiry date</label>
                    <input id="ExpiryDate" type="date" placeholder="MM / YY" maxLength="7" required ></input>
                </div>
                <div className = {`${block}__entry ${block}__entry--double`}>
                    <label htmlFor="SecurityCode">Security code</label>
                    <input id="SecurityCode" type="number" placeholder="123" required></input>
                        
                </div>
            </div>
            <button className = {`${block}__button`} id="PayButton"  type="submit">
                Buy Items
            </button>
        </form>
        );
};


export default CheckoutForm;