import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import ReactDOM from 'react-dom/client';
import App from './App';
import Home from './pages/home/Home';
import Products from './pages/products/Products';
import Product from './pages/product/Product';
import Cart from './pages/cart/Cart';
import Checkout from './pages/checkout/Checkout';
import reportWebVitals from './reportWebVitals';
import 'font-awesome/css/font-awesome.min.css';
import './index.scss';
import 'swiper/css';
import 'swiper/css/bundle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <BrowserRouter>
        
        <Routes>
          <Route path = "/" element ={<App/>}>
            <Route index path="/" element= {<Home/>}/>
            <Route path="products" element= {<Products/>}>
            </Route>
            <Route path="product/">
              <Route path=":id" element={<Product/>}/>
            </Route>
            
            <Route path="cart" element= {<Cart/>}/>
            <Route path="cart">
              <Route path="checkout" element= {<Checkout/>}/>
            </Route>
          </Route>
          
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
