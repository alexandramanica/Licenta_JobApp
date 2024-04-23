import React from "react";
import {Link,useLocation} from 'react-router-dom'
import { useState } from 'react';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import LogoutIcon from '@mui/icons-material/Logout';

import { BarCompanyData } from "./BarCompanyData";
import '../SidebarCompany/SidebarCompany.css'
import { refreshToken, axiosJWT, getUserDataFromToken } from '../../../Views/tokenPrep.jsx';

export default function SidebarCompany() {

  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  const Logout = async () => {
    try {

        let token=localStorage.getItem('tokenAcces');
      
        const response = await axiosJWT.post(
            `http://localhost:8001/api/logout`,
            {},
            {
              headers: { Authorization: `Bearer ${token}` }
            }
          );

      console.log('Server Response:', response.data);
      localStorage.removeItem('tokenAcces');
      localStorage.removeItem('tokenRefresh');
      window.location.href = '/';
    } catch (err) {
      console.error('Error:', err);
    }
  }

  return (
    <div>
        <Drawer 
        variant="permanent"
        anchor="left"
        sx={{display: { xs: 'none', md: 'flex' },}}
        PaperProps={{ 
            sx: { backgroundColor: '#000000' }
          }}>

        <Typography variant="h5"
        sx={{color:'#AE85FF',
        fontFamily:'Montserrat',
        fontWeight:'700',
        padding:'20px',
        marginBottom:'30px',
        display:'flex'
        }}>Jumpstart</Typography>

            <div id="menu-title">
                <Typography variant="h5"  
                    sx={{color:'#C7EF00',
                        fontFamily:'Montserrat',
                        fontWeight:'700',
                        fontSize:'25px',
                        display:'flex'}}>
                    Menu
                </Typography>
             </div>

            

             <ul className="sidebar-student">
            {
                BarCompanyData.map((val,key)=>{
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
                                    <Link to={val.path} style={{color: isActive ? '#AE85FF' : '#dadcf2'}} className="link-class" >{val.name}</Link>
                                </Typography>
                            </div>
                        </li>
                    )
                })
            } 
                <li>
                <Button startIcon={<LogoutIcon />} onClick={Logout}>Log Out</Button>      
                </li>
        </ul>
                
        </Drawer>
    </div>
  )
}
