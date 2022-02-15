import React from 'react'
import { Container} from '@material-ui/core';
// import { } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { CryptoStateCoin } from '../../CryptoContextProvider';
const  useStyles = makeStyles({
        root: {
            backgroundImage: 'linear-gradient(109.6deg,  rgba(0,0,0,1) 11.2%, rgba(11,132,145,1) 91.1%  )',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
           
            color: 'white',
            display: "flex",
            flexDirection: "column"
        },
        title: {
            flex: '1',
            fontFamily:'Fantasy',
            fontSize:'1em'
        },
        modeCurrency: {
            width: '100px',
            height: '50px',
            border: '1px',
            color: 'white',
            
        },
    
} ) ; 

  
function Header() {
   const {symbol, currency, setcurrency} = CryptoStateCoin();

   
const navigate = useNavigate();
const classes = useStyles(); 




    return (
            
<div > 

      
   
    <AppBar position="static" className={classes.root}>
        <Container>
             <Toolbar >
                 
                 <Typography onClick={()=>navigate("/")} className={classes.title}>
                     CryptoCoins
                        </Typography>
                     <Select value={currency} onChange={(ev)=>setcurrency(ev.target.value)} className={classes.modeCurrency}>
                 
                 <MenuItem value={'INR'}>INR</MenuItem>

                 <MenuItem value={"USD"}>USD</MenuItem>
                 
             </Select>
         </Toolbar>  
     </Container>
</AppBar>

               
        </div>
       
    )
}

export default Header
