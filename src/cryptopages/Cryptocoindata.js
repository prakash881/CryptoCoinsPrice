import  React from 'react';
import {useState, useEffect} from 'react';
import { Grid, makeStyles, Typography , LinearProgress, Container} from '@material-ui/core';
import CoinChart from '../components/CoinChart';
import {CryptoStateCoin} from '../CryptoContextProvider';
import { useParams}  from 'react-router-dom';


import parse from 'html-react-parser';


export function numberWithCommas(x) {
        let num = parseInt(x);
    return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
const useStyles = makeStyles((theme)=>({

    container:{
        display:'flex',
        padding:'30px 0px 15px 15px',
        [theme.breakpoints.down("md")]:{
            flexDirection:'column',
            alignItems:'center',
        },

    },
    sidebar:{
        width:'40%', 
       boxShadow:'  5px 0 5px -5px #aac2c2',
      
        [theme.breakpoints.down("md")]:{
            width:'100%',
            justifyContent:'center',
            overFlow:'hidden'
        },
        display:'flex',
        alignItems:'center', 
        flexDirection:'column',

    },
    description:{
        fontFamily:'Open Sans ',
        fontSize:'1.2em',
        [theme.breakpoints.down("sm")]:{
            width:'100%',
            justifyContent:'center',
            overFlow:'hidden'
        },
         
    },
    imgSize:{
        [theme.breakpoints.down("xs")]:{
            width:'60%',
            alignItems:'center',
            overFlow:'hidden'
        },

    },
    

    imdetails:{
        paddingTop:'10px',
        paddingBottom:'10px'
    },
   
    chtContainer:{

        width:'67%',
        [theme.breakpoints.down("md")]:{
            width:'100%',
           
        },
        display:'flex',
       
    },
    
    Marcketdetails:{
        fontSize:"20px",
        wordSpacing:'10px',
        lineHeight:'2em',
        [theme.breakpoints.down("md")]:{
            width:'100%',
            alignItems:'center',
            
        },
         
    }

}));
const Cryptocoindata = () =>{
let {id} = useParams();
 const [isloading , setisloading] = useState(false);
 
const [coin , setCoin] = useState();
const {currency, symbol} =  CryptoStateCoin();
// const [isHidden, setIsHidden] = useState(true);
// const [text , settext]  = useState("..show more ");
const [showMore, setShowMore] = useState(false);
const classes = useStyles();



  useEffect(() => {  
  let isMount = true;
   async function fetchCoin(){
    const data =  await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
    const result = await data.json();
   
    setisloading(true)
      
if(isMount){setCoin(result)};
    
   

       
    
}


   fetchCoin();
  
   
   return() => {
    // cancel the subscription
    isMount = false;
};

     },[currency]);
    

    
    if(!isloading) return <LinearProgress
     style={{ 
background: 'linear-gradient(90deg, rgba(251,198,63,1) 29%, rgba(252,70,233,1) 83%)'}} /> 
  //background: linear-gradient(to right, #3a1c71, #d76d77, #ffaf7b)
    return (
        <>
        <div className={classes.container}>
            <div className={classes.sidebar} >
            <Container>
            <Grid  className={classes.imdetails} align="center">  
                <img className={classes.imgSize}src={coin?.image.large} alt="BigCo Inc. logo"/>
                <br/>
                <Typography align="center"  spacing={2}>
                  <h2> {coin?.name}  </h2>
                </Typography>
            </Grid>
            
            <Grid container spacing={2}> 
                <Typography className={classes.description}>
               
                {parse(showMore ?  `${coin?.description.en}`:`${coin?.description.en.split(". ")[0]}`)}
                 <h5  style={{color:'yellowgreen'}} onClick={() => setShowMore(!showMore)}>{showMore ? "Show less" : "Show more"}</h5>
                 
                </Typography>
               
                 <Grid> 
                 <Typography className={classes.Marcketdetails}>
                     
                     <br/>
                     
                
                      Market_Rank :{"   "}{coin?.market_cap_rank}   <br/>
                      Market_Price :  {symbol} {" "}{numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])} <br/>
                      Market_Price :  {symbol} {" "}{numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()])}
                    </Typography> 
              
                    </Grid> 
            
            </Grid>
            
            </Container>
              
            </div>
            <div className={classes.chtContainer}>
            <Container>
            <CoinChart /> 
            </Container> 
               
            </div>
             
        </div>
       
        </>
    )
}

export default Cryptocoindata 
