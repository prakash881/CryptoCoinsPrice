import React from 'react';
import './App.css';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Header from './components/header/header';
import Cryptocoindata from './cryptopages/Cryptocoindata';
import Homepage  from './cryptopages/Homepage';
import { makeStyles } from '@material-ui/core';



// Styling  on material ui 
const useStyles= makeStyles(()=>({

  app :{
    backgroundColor:'#000408',
    color:'white',
    minHeight:'100vh',
    fontFamily:' Verdana',
   
  },
}));

function App() {

 const classes= useStyles();

 
    return (
        <BrowserRouter>
          <div className={classes.app}>
           <Header />  
              <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/products/:id"  element={<Cryptocoindata />} />
              </Routes>
             

        </div> 
   </ BrowserRouter>
  );
}

export default App;
