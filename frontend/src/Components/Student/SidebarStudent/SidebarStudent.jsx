import React from "react";
import {Link,useLocation} from 'react-router-dom'
import { useState } from 'react';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import LogoutIcon from '@mui/icons-material/Logout';

import { SidebarStudentData } from "./BarStudentData";
import '../SidebarStudent/SidebarStudent.css'

export default function SidebarStudent() {

  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  return (
    <div>
        <Drawer 
        variant="permanent"
        anchor="left"
        sx={{display: { xs: 'none', md: 'flex' },}}
        PaperProps={{ 
            sx: { backgroundColor: '#171738' }
          }}>

        <Typography variant="h4"
        sx={{color:'#f79f1c',
        fontFamily:'Montserrat',
        fontWeight:'700',
        padding:'20px',
        marginBottom:'30px'
        }}>Jumpstart</Typography>

            <div id="menu-title">
                <Typography variant="h5"  
                    sx={{color:'#fdca40',
                        fontFamily:'Montserrat',
                        fontWeight:'700',
                        fontSize:'25px',
                        display:'flex'}}>
                    Menu
                </Typography>
             </div>

             <Divider sx={{background:'#e3f1fa'}}/>

             <ul className="sidebar-student">
            {
                SidebarStudentData.map((val,key)=>{
                    const isActive = activePath === val.path;
                    return(
                        <li key={key} 
                        className="row" 
                        id={isActive ? "active" : ""}
                        onClick={() => setActivePath(val.path)}>
                            <div id="icon">
                                {val.icon}
                            </div>
                            <div id="title">
                                <Typography variant="h6" align="left" >
                                    <Link to={val.path} style={{color: isActive ? '#f79f1c' : '#e3f1fa'}} className="link-class" >{val.name}</Link>
                                </Typography>
                            </div>
                        </li>
                    )
                })
            } 
                <li>
                <Button startIcon={<LogoutIcon />}>Log Out</Button>      
                </li>
        </ul>
                
        </Drawer>
    </div>
  )
}
