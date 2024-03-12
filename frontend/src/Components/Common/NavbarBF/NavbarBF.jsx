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
      <AppBar position="static" className='navbar' sx={{backgroundColor:"#171738", boxShadow:0}}>
        <Toolbar sx={{ justifyContent: "center" }}>
        <Box sx={{ 
           flexGrow: 1,
           display: { xs: 'flex', md: 'none' },
           color:'#e3f1fa'}}>
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,display:'flex',alignContent:"left"}}>
            Jumpstart
          </Typography>
          
            <Link to={"/"}>
            <Button color="inherit" className='btn Home' sx={{
              '&:hover': { color: "#fdca40" },
              borderRadius:10,
              fontFamily: "Montserrat",
              fontSize: 17,
              color: "white",
              margin:1,
              width: 100,
              display: { xs: 'none', md: 'flex' }
            }}>Home</Button>
            </Link>
            
            <Link to={"/Login"}>
            <Button color="inherit" className='btn Login' sx={{
              '&:hover': { backgroundColor: "#f79f1c" },
              borderRadius:10,
              fontFamily: "Montserrat",
              fontSize: 17,
              color: "white",
              margin:1,
              width: 100,
              display: { xs: 'none', md: 'flex' }
            }}>Login</Button>
            </Link>

            <Link to={'/SignUp'}>
            <Button color="inherit" className='btn SignUp' 
            sx={{
              '&:hover': { backgroundColor: "#6bb4e4" },
              borderRadius:10,
              fontFamily: "Montserrat",
              fontSize: 17,
              margin:1,
              width: 100,
              color: "white",
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
        sx: { backgroundColor: '#171738',
        width: '100%'}
      }}
      
    >
        <IconButton aria-label="delete" size="small" onClick={() => setOpenDrawer(false)}
        sx={{backgroundColor:"#171738",color:"#e3f1fa"}}>
        <CloseIcon fontSize="small" />
        </IconButton>

      <Box display="flex" justifyContent="center" flexDirection="column"  alignItems="center" sx={{backgroundColor: "#171738"}}>
        
        <Link to={"/"}>
        <Button className='btnMenu' sx={{
          '&:hover': { color: "#fdca40" },
          borderRadius:10,
          fontFamily: "Montserrat",
          fontSize: 18,
          color: "white",
          width: 120,   
          margin: '5px'    
        }}>Home</Button>
        </Link>
       
        <Link to={"/Login"}>
        <Button className='btnMenu' sx={{
          '&:hover': { backgroundColor: "#f79f1c" },
          borderRadius:10,
          fontFamily: "Montserrat",
          fontSize: 18,
          color: "white",
          width: 120,
          margin: '5px'       
        }}>Login</Button>
        </Link>

        <Link to={'/SignUp'}>
          <Button className='btnMenu' sx={{
          '&:hover': { backgroundColor: "#6bb4e4" },
          borderRadius:10,
          fontFamily: "Montserrat",
          fontSize: 18,
          color: "white",
          width: 120,
          margin: '5px'  
          }}>Sign Up</Button> 
        </Link>  
      </Box>

    </Drawer>
    </div>
  );
}