import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-alice-carousel/lib/alice-carousel.css';
import App from './App';
import CryptoContextProvider from './CryptoContextProvider'

ReactDOM.render(
  
  
    <CryptoContextProvider>
   <App />
    </CryptoContextProvider>
    
    

  ,
  document.getElementById('root')
);


