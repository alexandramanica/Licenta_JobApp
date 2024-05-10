import React from 'react'
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

// Settings.jsx
import { refreshToken, axiosJWT, getUserDataFromToken } from '../../tokenPrep.jsx';
import Sidebar from '../../../Components/Student/SidebarStudent/SidebarStudent.jsx'
import NavbarStudentMD from '../../../Components/Student/NavbarStudent/NavbarStudentMD.jsx'
import NavbarStudentXS from '../../../Components/Student/NavbarStudent/NavbarStudentXS.jsx'
import '../SettingsPage/Settings.css'

import Typography from '@mui/material/Typography'
import OutlinedInput from '@mui/material/OutlinedInput';
import Button  from '@mui/material/Button'

const handleSave = async () => {
  try {
    let userId = getUserDataFromToken().userId;
    const token = localStorage.getItem('tokenAcces');
    
    if (!token) {
      console.error('Token not found in localStorage');
      return;
    }

    console.log('Token:', token);
    debugger
    
    const response = await axiosJWT.put(
      `http://localhost:8001/api/user/update/${userId}`,
      {
        userId: userId,
        role: 'company',
        email: 'HCompany@gmail.com',
        firstName: 'Carol',
        password: 'parola'
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    console.log('Server Response:', response.data);
  } catch (err) {
    console.error('Error:', err);
  }
};

export default function Settings() {

  return (
    <div>
      <Sidebar />
      
      <h3 className="settings-title">Settings</h3>

      <div className="settings-container">
        
        <div className='inputSetting-div'>
          <h4 className="input-title">Email</h4>
          <OutlinedInput placeholder="alexandra.manica24@gmail.com" 
                          inputProps={{ 'aria-label': 'email' }}
                          type="email" 
                          className='inputSettings' />
        </div>
        
        <div className='inputSetting-div'>
          <h4 className="input-title">New Password</h4>
          <OutlinedInput placeholder="**************" 
                        inputProps={{ 'aria-label': 'password' }}
                        type="password" 
                        className='inputSettings' />
        </div>

        <div className='inputSetting-div'>
          <h4 className="input-title">Confirm Password</h4>
          <OutlinedInput placeholder="**************" 
                        inputProps={{ 'aria-label': 'confirm-password' }}
                        type="password"
                        className='inputSettings' />
        </div>
      </div>

      <Button className='btn-saveSettings' onClick={handleSave}>
        <span style={{ margin: 'auto' }}>Save</span>
      </Button>
    </div>
  )
}
