import React from 'react'
import Wrapper from '../components/cryptoBanner/Wrapper';
// import { ThemeProvider, makeStyles,useTheme } from '@material-ui/styles';
import CoinsList from '../components/CryptoSearch.js/CoinsList';




const  Homepage = ()=>{

    return (
        <>
        
        <Wrapper />
     
        <CoinsList /> 
       
     </>
        
    )
}

export default Homepage
