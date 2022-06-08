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

  const popItems = () => {
    cartItems.pop()
    setCartItems(cartItems);
  };

  return (
    <>
      <CartContext.Provider value={{items: cartItems , add: addItem, remove: popItems }}>
        <Header/>
        <Outlet/>
      </CartContext.Provider>
        
      
    </>
  );
}

export default App;
