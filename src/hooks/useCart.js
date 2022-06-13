import { useState, useEffect } from "react";
import { BehaviorSubject } from "rxjs";

//TODO Change my cart variable
let myCart = [];
let myCartState$ = new BehaviorSubject(myCart);

const addToCart = (value, quantity = 1) => {
    let cartEntries = myCart.filter (item => item.id == value);
    let newAr = null; 
    if (cartEntries.length > 0) {
        cartEntries[0].count += quantity;
        newAr = [...myCart];
    }
    else {
        newAr = [...myCart, {id:value, count: quantity}];
    }   
    myCart = newAr;
    myCartState$.next(myCart);
};

const deleteFromCart = (value) => {
    let cartEntries = myCart.filter (item => item.id == value);
    if (cartEntries.length > 0) {
        cartEntries[0].count -= 1;
        if (cartEntries[0].count == 0) {
            //Eliminates entry
            let index = myCart.findIndex(item=>item.id == value);
            myCart.splice(index,1);            
        }
        
    } 
    myCartState$.next([...myCart]);
};

const removeAllFromCart = () => {
    myCart = [];    
    myCartState$.next(myCart);
}

const useCart = () => {
    const [myCartState, setMyCartState] = useState([]);
    useEffect(()=>{
        const sub = myCartState$.subscribe(setMyCartState);
        return ()=>{sub.unsubscribe();}
    },[])

    return myCartState;
} 

export default useCart;
export {addToCart, deleteFromCart, removeAllFromCart, myCartState$};