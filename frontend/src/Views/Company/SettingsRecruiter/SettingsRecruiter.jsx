import React from 'react'
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import axios from 'axios';

// Settings.jsx
import { refreshToken, axiosJWT, getUserDataFromToken } from '../../tokenPrep.jsx';
import Sidebar from '../../../Components/Company/SidebarCompany/SidebarCompany.jsx'
import '../SettingsRecruiter/SettingsRecruiter.css'

import Typography from '@mui/material/Typography'
import OutlinedInput from '@mui/material/OutlinedInput';
import Button  from '@mui/material/Button'
import Alert  from '@mui/material/Alert';

import TaskAltIcon from '@mui/icons-material/TaskAlt';

export default function Settings() {
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const [error, setError] = useState('')
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertSucces, setShowAlertSucces] = useState(false);

  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [updateUserData,setUpdateUserData] = React.useState({
    email:'',
    password:''
  });

  const handleInputChange = (event) => {
    setUpdateUserData({
      ...updateUserData,
      [event.target.name]: event.target.value});
  };
  
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {

      let validationError = '';

      if(!updateUserData.password.trim()||!confirmPassword.trim()||!updateUserData.email.trim()){
        validationError = "All fields are required. Please make sure to enter all the fields.";
      }else if(!EMAIL_REGEX.test(updateUserData.email)){
        validationError = 'Please enter a valid email.';
      }else if (!PWD_REGEX.test(updateUserData.password)||!PWD_REGEX.test(confirmPassword)) {
        validationError = 'Password must contain at least 8 characters, including uppercase, lowercase, numbers and special characters.';
      }
      setError(validationError);

      let userId = getUserDataFromToken().userId;
      let userFirstName=getUserDataFromToken().firstName;
      let userRole=getUserDataFromToken().role;

      const token = localStorage.getItem('tokenAcces');
      
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }
  
      console.log('Token:', token);
      
      if(validationError === '') {
        const response = await axiosJWT.put(
          `http://localhost:8001/api/user/update/${userId}`,
          {
            userId: userId,
            role: userRole,
            email: updateUserData.email,
            firstName: userFirstName,
            password: updateUserData.password
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        console.log('Server Response:', response.data);
        setShowAlertSucces(true);
    }else {
      setShowAlert(true);
    }  

  } catch (err) {
      console.error('Error:', err);
  }
};


  return (
    <div>
      <Sidebar />
  
      <h3 className="settings-title">Settings</h3>
      <p className='settings-text-subtitle'>Welcome to your settings page! ⚙️ Here, you can update your email and password, ensuring your account remains secure and up-to-date. Remember, a strong password helps protect your account from unauthorized access. 🔒</p>
      <div className="settings-container">
        
        <div className='inputSetting-div'>
          <h4 className="input-title">Email</h4>
          <OutlinedInput placeholder="alexandra.manica24@gmail.com" 
                          inputProps={{ 'aria-label': 'email', 'name':'email' }}
                          type="email" 
                          value={updateUserData.email} onChange={handleInputChange}
                          className='inputSettings' />
        </div>
        
        <div className='inputSetting-div'>
          <h4 className="input-title">New Password</h4>
          <OutlinedInput placeholder="**************" 
                        inputProps={{ 'aria-label': 'password', 'name':'password'}}
                        type="password"
                        value={updateUserData.password} onChange={handleInputChange} 
                        className='inputSettings' />
        </div>

        <div className='inputSetting-div'>
          <h4 className="input-title">Confirm Password</h4>
          <OutlinedInput placeholder="**************" 
                         inputProps={{ 'aria-label': 'confirm-password' }}
                         type="password"
                         value={confirmPassword} onChange={handleConfirmPasswordChange}
                         className='inputSettings' />
        </div>
      </div>

      <Button className='btn-saveSettings' onClick={handleSave} endIcon={<TaskAltIcon/>}
        style={{ display: 'flex', alignItems: 'center' }}>
        Save
      </Button>

      <div>
        {showAlert && <Alert severity="warning" className='alert' onClose={() => setShowAlert(false)}>{error}</Alert>}
      </div> 
      <div>
        {showAlertSucces && <Alert severity="success" className='alert' onClose={() => setShowAlertSucces(false)}>You succesfully updated your account details!</Alert>}
      </div> 
    </div>
  )
}
