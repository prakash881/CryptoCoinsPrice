import React from 'react';
import { useEffect,useState,} from 'react';
import { useNavigate } from 'react-router-dom';
import { createTheme,ThemeProvider  } from '@material-ui/core/styles';
import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import { CryptoStateCoin } from '../../CryptoContextProvider';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {numberWithCommas} from '../cryptoBanner/TrandingCoins';
import { TextField } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
// import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';



const useStyles = makeStyles((theme)=>({
    text:{
      
    fontSize: 20,
    background: "-webkit-linear-gradient(135deg, #FFCF71 10%, #2376DD 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textAlign:'center', 
    [theme.breakpoints.only('xs')]:{
        fontSize: 15,
    },
    },
    search:{
        color:'white',
        borderColor:'white'
    },
    TableHead:{
        color:'black',
        // backgroundImage: 'linear-gradient(45deg, #34495e, #9b59b6,  #3498db)',
        background:'#f0b204'
    },

    tablerow:{
        overflow: 'scroll',
        '&:hover': {
            background: "#131111",
          }

    },
    Pagination:{
   display:'flex',
   justifyContent:'center',
   
   
                  
    },
}))
function CoinsList() {
    let navigate = useNavigate();
const [coinList , setcoinList]=useState([]);
const [search, setSearch]= useState([]);
 const [pagenumber, setpagenumber] = useState(1)
//  const unsubscribe = useRef();

const {currency, symbol}=CryptoStateCoin();
 const classes = useStyles();
const ArrayHead = ["Coins", "Prices","24_changes","MarketCap"];



    

    useEffect(()=>{
    
 const FetchCoinList = async()=>{
   
    const {data} = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
     
    
    
           setcoinList(data) 
         
        
        
    
    
       
       
    }
        FetchCoinList();
       

    }, [currency, symbol]);

    // handling the secrh bar
    const hadnleCoinSeacrh =(e)=>{
           
          return coinList.filter((e)=>{

                return e.name.toLowerCase().includes(search) || e.symbol.toLowerCase().includes(search)
            });
        
            
           

    };

    const theme = createTheme({
        palette: {
            primary: {
              main: "#fff",
            },
            type: "dark",fontFamily:'Verdan'
          },
          

    })  
    return (
        <>
        <ThemeProvider  theme={theme}>
        <Container  >
           <Typography className={classes.text}> <h1>Cryptocurrency Prices by Market Cap</h1></Typography>
           
         <TextField className={classes.search} fullWidth label="CryptoCoins Search" variant="outlined" onChange={(e)=>setSearch(e.target.value)}  />
            <br/>
            <br/>
        <TableContainer color="primary">
                     <Table>
             <TableHead className={classes.TableHead}>
          <TableRow >
             {ArrayHead.map((head_id)=>
            <TableCell key={head_id} align ={head_id.includes("Coins")?"":"right"} style={{color:'black', fontFamily:'sans-serif', fontSize:'1em',}}>

                {head_id }

            </TableCell>
            
            )}
          </TableRow>
        </TableHead>


        <TableBody >
         { hadnleCoinSeacrh()
            .slice((pagenumber - 1)*10 , (pagenumber-1)*10 +10) // sixe of the page 10
            .map((id)=>{ 
             let  profit = Number(id.price_change_percentage_24h).toFixed(2);
            
             return(   
            <TableRow 
            onClick={()=> navigate(`/products/${id.id}`)}   key={id.name} className={classes.tablerow}>

              <TableCell component="th" scope="row" style={{display:"flex", flexDirection:'column', }}>
              <img src={id.image} alt={id.name} style={{height:"60px", width:"70px", borderRadius:'5px'}}/><Typography>{id.symbol.toUpperCase()} {id.name}</Typography>
            
            
            
        
               <br/>

            

               </TableCell>
                <TableCell align='right'><strong>  <span> {symbol} {`  ${numberWithCommas(id.current_price.toFixed(2))} `}</span></strong></TableCell>
                <TableCell align='right'> <span style={profit>0?{color:"#89eb34"}:{color:"red"}}>  {` ${profit} % `}</span></TableCell>
               <TableCell align='right'> <span> {symbol}   {` ${numberWithCommas(id.market_cap)} `}</span></TableCell>
          
            </TableRow>
             ); 
        })}  
        </TableBody>
       
                            </Table>
                            <Grid container className={classes.Pagination}>
    <Pagination  count={(hadnleCoinSeacrh().length/10)} 
        onChange={(_,value)=>{
            setpagenumber(value);
            window.scroll({ top:'250',left:'0',behavior: 'smooth'});

        }} />

                            </Grid>

            
            </TableContainer>

            </Container>
            </ThemeProvider>
        </>
    )
}

export default CoinsList
