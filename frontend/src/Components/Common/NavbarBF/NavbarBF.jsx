import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import {Link} from 'react-router-dom'
import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';

export default function ButtonAppBar() {

  const [openDrawer,setOpenDrawer]=useState(false)

  return (
    <div>
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" className='navbar' sx={{backgroundColor:"#ffffff", boxShadow:0, borderBottom: '2px solid #F8F8FA'}}>
        <Toolbar sx={{ justifyContent: "center" }}>
        <Box sx={{ 
           flexGrow: 1,
           display: { xs: 'flex', md: 'none' },
           color:'#7F27FF'}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={()=>setOpenDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          </Box>
          <div style={{ display: 'flex', flexGrow: 1, alignContent: "left" }}>
            <Typography variant="h5" component="div" style={{ color: "#000000", fontFamily: "Montserrat",fontWeight: "bold" }}>
              Jump
            </Typography>
            <Typography variant="h5" component="div" style={{ color: "#c7ef00", fontFamily: "Montserrat", fontWeight: "bold", textDecoration: "underline" }}>
              Start
            </Typography>
          </div>
          
            <Link to={"/"}>
            <Button color="inherit" className='btn Home' sx={{
              '&:hover': { color: "#ae85ff",background:"none" },
              borderRadius:3,
              color: "#7F27FF",
              fontFamily: "Montserrat",
              fontSize: 15,
              margin:1,
              width: 100,
              display: { xs: 'none', md: 'flex' }
            }}>Home</Button>
            </Link>
            
            <Link to={"/Login"}>
            <Button color="inherit" className='btn Login' sx={{
              '&:hover': { backgroundColor: "#DADCF2" },
              borderRadius:3,
              fontFamily: "Montserrat",
              fontSize: 15,
              color: "#7F27FF",
              margin:1,
              width: 100,
              display: { xs: 'none', md: 'flex' }
            }}>Login</Button>
            </Link>

            <Link to={'/SignUp'}>
            <Button color="inherit" className='btn SignUp' 
            sx={{
              '&:hover': { backgroundColor: "#c7ef00", color: "#ffffff" },
              borderRadius:3,
              fontFamily: "Montserrat",
              fontSize: 15,
              margin:1,
              width: 100,
              backgroundColor: "#c7ef00",
              color: "#ffffff",
              display: { xs: 'none', md: 'flex' }
            }}>Sign Up</Button>
            </Link>
        

        </Toolbar>
      </AppBar>
    </Box>

    <Drawer
      open={openDrawer}
      title="Menu"
      anchor="top"
      onClose={() => setOpenDrawer(false)}
      PaperProps={{ 
        sx: { backgroundColor: '#ffffff',
        width: '100%'}
      }}
      
    >
        <IconButton aria-label="delete" size="small" onClick={() => setOpenDrawer(false)}
        sx={{backgroundColor:"#ffffff",color:"#7f27ff"}}>
        <CloseIcon fontSize="small" />
        </IconButton>

      <Box display="flex" justifyContent="center" flexDirection="column"  alignItems="center" sx={{backgroundColor: "#ffffff"}}>
        
        <Link to={"/"}>
        <Button className='btnMenu' sx={{
          '&:hover': { color: "#c7ef00",backgroundColor:"#ffffff" },
          borderRadius:3,
          fontFamily: "Montserrat",
          fontSize: 15,
          color: "#7f27ff",
          width: 120,   
          margin: '5px'    
        }}>Home</Button>
        </Link>
       
        <Link to={"/Login"}>
        <Button className='btnMenu' sx={{
          '&:hover': { color: "#c7ef00",backgroundColor:"#ffffff" },
          borderRadius:3,
          fontFamily: "Montserrat",
          fontSize: 15,
          color: "#7f27ff",
          width: 120,
          margin: '5px'       
        }}>Login</Button>
        </Link>

        <Link to={'/SignUp'}>
          <Button className='btnMenu' sx={{
          '&:hover': { color: "#c7ef00",backgroundColor:"#ffffff" },
          borderRadius:3,
          fontFamily: "Montserrat",
          fontSize: 15,
          color: "#7f27ff",
          width: 120,
          margin: '5px'  
          }}>Sign Up</Button> 
        </Link>  
      </Box>

    </Drawer>
    </div>
  );
}