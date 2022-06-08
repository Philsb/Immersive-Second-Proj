import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Header from './Components/Header/Header';
import CartContext from './Hooks/CartContext';
import logo from './logo.svg';
import './App.css';

function App() {

  const [cartItems, setCartItems] = useState([])

  const addItem = (item) => {
    setCartItems([...cartItems,item]);
  };

  const deleteItems = (id) => {
    let index =cartItems.indexOf(id);
    console.log(index);
    cartItems.splice(index,1);
    console.log ("Cart:", cartItems);
    setCartItems(cartItems);
  };

  return (
    <>
      
        <Header/>
        <Outlet/>
     
        
      
    </>
  );
}

export default App;
