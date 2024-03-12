import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import AppBar from '@mui/material/AppBar';
import { Toolbar } from "@mui/material";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import {NavbarStudentData} from './NavbarStudentData'
import './NavbarStudentXS.css'

export default function NavbarStudent() {
const [openDrawer,setOpenDrawer]=useState(false)

    return (
    <div>
        <AppBar component="nav"
        sx={{
            display: { xs: 'flex', md: 'none' },}}>
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={()=>setOpenDrawer(true)}
                sx={{ mr: 2, display: { md: 'none' } }}
            >
                <MenuIcon />
            </IconButton>
            <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
                MUI
            </Typography>
            </Toolbar>
      </AppBar>

      <Drawer
        open={openDrawer}
        title="Menu"
        anchor="top"
        onClose={() => setOpenDrawer(false)}
        PaperProps={{ 
            sx: { 
            backgroundColor: '#171738',
            width: '100%', // Full width
            }
        }}
      
    >
        <IconButton aria-label="delete" size="small" onClick={() => setOpenDrawer(false)}
        sx={{backgroundColor:"#171738",color:"#e3f1fa",display:'flex',justifyContent:'left'}}>
        <CloseIcon fontSize="small" />
        </IconButton>

        <Box display="flex" justifyContent="center" flexDirection="column"  alignItems="left" sx={{backgroundColor: "#171738"}}>
        <ul  className="sidebar-student">
            {
                NavbarStudentData.map((val,key)=>{
                    return(
                        <li key={key} 
                        className="row" 
                        id={window.location.pathname === val.path ? "active" : ""}>
                            <div id="icon">
                                {val.icon}
                            </div>
                            <div id="title">
                                <Typography variant="h6" align="left" >
                                    <Link to={val.path} style={{color:'#e3f1fa', fontSize:'17px'}} className="link-class" >{val.name}</Link>
                                </Typography>
                            </div>
                        </li>
                    )
                })
            } 
        </ul>
        </Box>

    </Drawer>
    </div>
  )
}
