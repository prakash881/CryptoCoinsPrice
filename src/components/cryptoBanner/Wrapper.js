import React from 'react'
import { Container, Grid, makeStyles, Typography } from '@material-ui/core'
import TrandingCoins from './TrandingCoins'

const useStyles = makeStyles({
 coinBanner:{
        background:"url(./cryptoCoin.jpg)",
            
        backgroundSize: 'cover',
        height: 'auto'  
        
        },
        content:{
                height:480,
                display:'flex',
                flexDirection:'column',
                justifyContent:'space-around'
        },
        contentHeading:{
                textAlign:'center',
                

                fontSize:'80px',
                alignItems:'center',  
                background: "-webkit-linear-gradient(80deg, #d4fc79 0%, #96e6a1 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textTransform:'uppercase'   
 
        }



});
function Wrapper() {
const  classes= useStyles();   
  return(
        <div className={classes.coinBanner}>
           <Container className={classes.content}>
                <Grid className={classes.contentHeading}>
                 <Typography style={{ fontSize:'26px', fontFamily:'sans-seri'}} component='h1'>Crypto Tracker </Typography>
                 <Typography>Hunt Your All Favorite CryptoCoins With Latest Update </Typography>
                 </Grid>

                 <Grid>
                <TrandingCoins />
                       </Grid>
           </Container>

        </div>
    )
}

export default Wrapper
