import { useState, useEffect } from "react";
import { BehaviorSubject } from "rxjs";


let myCart = [];
let myCartState$ = new BehaviorSubject(myCart);

const addToCart = (value) => {
    let newAr = [...myCart, value];
    myCart = newAr;
    myCartState$.next(myCart);
};

const deleteFromCart = (value) => {
    

    let newAr = myCart.filter((x)=>{ return x !== value; });
    myCart = newAr;
    myCartState$.next(myCart);
};

const useCart = () => {
    const [myCartState, setMyCartState] = useState([]);
    useEffect(()=>{
        const sub = myCartState$.subscribe(setMyCartState);
        return ()=>{sub.unsubscribe();}
    },[])

    return myCartState;
} 

export default useCart;
export {addToCart, deleteFromCart,myCartState$};