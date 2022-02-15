import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles,Tab } from '@material-ui/core';
import {CryptoStateCoin} from '../CryptoContextProvider';
import {HistoricalChart} from '../components/config/Config';
// import Divider from '@material-ui/core/Divider';
import { Line } from 'react-chartjs-2';

import { useParams}  from 'react-router-dom';
 import  {ChartDaysData} from '../components/ChartDaysData';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const useStyles= makeStyles((theme)=>({
  tab:{
     
    border:'1px solid green',
   
    
       
          display:'flex-end',
          flexDirection:'column',
            textAlign:' center',
            textTransform: 'uppercase',

                marginLeft:'18px',     
        
            borderRadius: '6px',
            '&:hover': {
              
              color:'#f0b204'
            },
           
            [theme.breakpoints.between('xs', 'md')]:{
              flexDirection:'row',
              width:'5px',
              marginLeft:'0px', 
          },
            
    
  },
  
  tbs: {
  
   
  }

}));

const  CoinChart = () =>{
var {id} = useParams();
const  [historicData,setHistoricData]= useState([]);  
const  [days , setdays ]         =   useState([1]);
const  {currency}        =   CryptoStateCoin();
// const unsubscribe = useRef();
const classes = useStyles();


useEffect(() => {
  
 async function fetchHistoricData(){
    const {data} = await axios.get(HistoricalChart(id, days, currency));
    
  
    setHistoricData(data.prices);


    
    
  };
  fetchHistoricData();

//     // cancel the subscription

   
  },[currency,days]);


  // console.log (days)
const data = {

        labels: historicData?.map((coin) => {
          let date = new Date(coin[0]);
          let time =
            date.getHours() > 12
              ? `${date.getHours() - 12}:${date.getMinutes()} PM`
              : `${date.getHours()}:${date.getMinutes()} AM`;
          return days === 1 ? time : date.toLocaleDateString();
        }),
       

        datasets: [
          {
            data:  historicData?.map((coin) =>{ 
              
             return coin[1]
              
            }),
            label: `Price ( Past ${days} Days ) in ${currency}`,
            borderColor: "rgb(63,251,119)  ",
            height:'50%',
            backgroundColor:"rgb(75, 192, 192) ",
          },
        ]
      
      

}

const options={
    elements: {
      point: {
        radius: 1,
      },
    },
  }

    return ( 
    <>

       <Line options={options} data={data} />
     

       
     
      
      <div style={{}}>
     
        {ChartDaysData.map((e,i)=>{
         return  <Tab className={classes.tab}  onClick={() => setdays(e.value)} key ={i} label={e.label} />
        })}
        
</div>
      </>
    
    )
}

export default CoinChart
 