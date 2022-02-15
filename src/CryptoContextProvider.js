import React, { createContext,useEffect, useState,useContext } from "react";
// import { createContext, useState , useEffect , useContext} from 'react'
// import  useState  from 'react';
// import useEffect from 'react';
// import useContext from "react"
// here  we are creating the context provider to our crypto Application

const CryptoCoin = createContext();




function CyptoContextProvider({children}) {
// craeting the  state of Diffrent currency mode USD // INR and render to the  whole application ₹
const [currency, setcurrency] = useState("USD");
const [symbol, setsymbol]= useState("$");


useEffect(() => {
    currency === "USD"?setsymbol("$"):setsymbol("₹")
}, [currency]);
    return (
        <CryptoCoin.Provider value={{currency, symbol, setcurrency}}>
            {children}
        </CryptoCoin.Provider>
    )
}
// // use context hook 
export const CryptoStateCoin=()=> {return useContext(CryptoCoin)}

    
    
export default CyptoContextProvider; 
