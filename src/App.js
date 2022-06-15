import { Outlet, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import GameList, {GameData} from './services/Data';
import databaseContext from "./context/databaseContext"
import Header from './components/header/Header';
import Footer from './components/Footer/Footer';

import './App.css';
import MainBody from './components/MainBody/MainBody';


function App() {
  const [gameList,setGameList] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [gameData, setGameData] = useState(null);

  useEffect(()=>{
      setTimeout(()=>{
          setGameList(GameList);
          setHasLoaded(true);

      },3000);
  }
  ,[]);

  useEffect(()=> {
    if (gameList != null) {
        gameList.forEach(element => {
          let url = "https://store.steampowered.com/api/appdetails?&cc=us&l=en&appids="+element.appid;
          fetch(url).then((response) => {
            return response.json();
          }).then ((response)=>{
            let id = element.appid;
            let key = Object.keys(response)[0];
            GameData[id] = response[key]; 
            if (Object.keys(GameData).length == gameList.length) {
              
              setGameData(GameData);
            }
            
          });
        });
    }

  },[hasLoaded]);

  return (
    <>
      
        <Header
          logo = {{src:"/Icons/drawing.svg", alt: "Indie Rocket logo"}}
          companyName = "Indie Rocket"
          links ={[
            {title: "products",to:"products",element:<i className="fa fa-th"/>},
            {title: "Account",to:"/",element: <i className="fa fa-user"/>}
          ]}
          shoppingCart = {{title: "cart",to:"cart",element: <i className="fa fa-shopping-basket"/>}}
        />  

        <MainBody>
          <databaseContext.Provider value={{listHasLoaded:hasLoaded, list:gameList, data: gameData}}>
            <Outlet/>
          </databaseContext.Provider>
        </MainBody>
        <Footer/>
     
        
      
    </>
  );
}

export default App;
