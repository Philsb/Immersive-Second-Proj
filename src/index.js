import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from './Pages/Home';
import Products from './Pages/Products';
import Product from './Pages/Product';
import Cart from './Pages/Cart/Cart';
import Checkout from './Pages/Checkout';
import reportWebVitals from './reportWebVitals';
import Header from './Components/Header/Header';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <BrowserRouter>
        
        <Routes>
          <Route path = "/" element ={<App/>}>
            <Route index path="/" element= {<Home/>}/>
            <Route path="products" element= {<Products/>}/>
            <Route path="products">
              <Route path=":id" element={<Product/>}/>
            </Route>
            
            <Route path="cart" element= {<Cart/>}/>
            <Route path="checkout" element= {<Checkout/>}/>
          </Route>
          
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
