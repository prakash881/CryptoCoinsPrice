import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import { Container,  } from '@material-ui/core';
import { useState,useEffect} from 'react';
import axios from 'axios';
import { CryptoStateCoin } from '../../CryptoContextProvider';

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

const TrandingCoins = ()=>{

    const [trending, settrending]= useState([]);
    const {currency, symbol} =  CryptoStateCoin();

    

  useEffect(()=>{
    async function fetchTrendCoins(){
        const {data} =  await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`);
        settrending(data);
        

    }
   fetchTrendCoins();
  },[currency]);


const coin_items = trending.map((id)=>{

let profit = Number(id.price_change_percentage_24h > 0).toFixed(2);

return (
<>

            <img src={id.image} alt={id.name} style={{height:"60px", width:'70px', borderRadius:'5px'}}/>
            <br/>
            <strong >{id.symbol} 
            <span  style={profit>0?{color:"#89eb34"}:{color:"red"}}> {profit && '+'}{`${profit} %`}</span>
            </strong>
               <br/>
               <br/>
             
            <span>
          
            <strong>  <span> {symbol} {`   `}{numberWithCommas(Number(id.current_price).toFixed(2))}</span></strong>
            

            </span>
           
          </>  
            )


});

const responsive = {
    250: {
        items: 2,
    },

    1024: {
        items: 4
    }
}

return (        
        <div >
          <Container  >
           
            <AliceCarousel Lazy loading Mobile friendly mouseTracking infinite responsive={responsive}
           animationType="fadeout"
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            disableButtonsControls
            
            items={ coin_items}
            autoPlay
              />
              </Container>
        </div>
);




};
export default TrandingCoins;