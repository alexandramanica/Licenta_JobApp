import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react'
import axios from "axios";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Alert from '@mui/material/Alert';

import './SignUp.css'
import '../../../App.css'

import videoLogin from '../../../assets/assetsLoginRegister/videoStudents.mp4'
import logo from '../../../assets/assetsLogo/JumpStartLogoGrey.png'
import NavbarBF from '../../../Components/Common/NavbarBF/NavbarBF'


import LockOpenIcon from '@mui/icons-material/LockOpen';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const NAME_REGEX = /^[A-Za-z\s'-]+$/;

export default function SignUp() {

  const [users, setUsers] = useState([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [role, setRole] = useState('')

  const [error, setError] = useState('')
  const [showAlert, setShowAlert] = useState(true);

  const navigate = useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      let validationError = '';

      if (!role) {
        validationError = "Please select a role.";
      }
  
      if(!password.trim()){
        validationError = "Please make sure to enter a password.";
      }else if (!PWD_REGEX.test(password)) {
        validationError = 'Password must contain at least 8 characters, including uppercase, lowercase, numbers and special characters.';
      }

      if(!firstName.trim()){
        validationError = "Please make sure to enter a password.";
      }else if(!NAME_REGEX.test(firstName)){
        validationError = 'Please enter a valid first name.';
      }

      if(!email.trim()){
        validationError = "Please make sure to enter a email.";
      }else if(!EMAIL_REGEX.test(email)){
        validationError = 'Please enter a valid email.';
      }
  
      setError(validationError);
  
      if(validationError === '') {
        const res=await axios.post('http://localhost:8001/api/signup',{email,firstName,password,role})
        setUsers(res.data)
        console.log(res.data)
        navigate("/Login")
      }else {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 10000);
      }  
    }
    catch{
      console.log('error')
    }
  }

  return (
    <div>
    <NavbarBF />

    <div className="signUpPage flex">

    <div className="container flex">

      <div className="videoDiv">
        <video src={videoLogin} autoPlay loop muted />
        <div className="textDiv">
          <h2 className="title">Join the Journey to Your Dream Job!</h2>
          <p>Ready to take the first step towards your career aspirations?
             Let's jumpstart your job search by creating your account.</p>
        </div>

        <div className="footerDiv flex">
          <span className="text">Already have an account?</span>
          <Link to={'/'}>
          <button className='btn'>Login</button>
          </Link>
        </div>
      </div>

      <div className="formDiv flex">
        <div className="headerDiv">
          <img src={logo} alt="logo" />
          </div>

        <form onSubmit={handleSubmit} className='form grid'>
        
          <div className="inputDiv">
            <label htmlFor="email">Email</label>
            <div className="input">
              <EmailIcon className='icon'/>
              <input type="email" name="email" id="email" placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)} />
             
            </div>
          </div>

          <div className="inputDiv">
            <label htmlFor="firstName">First Name</label>
            <div className="input">
              <PersonIcon className='icon'/>
              <input type="text" name="firstName" id="firstName" placeholder="Enter your first name"
              onChange={(e) => setFirstName(e.target.value)} />
               
            </div>
          </div>
          
          <div className="inputDiv">
            <label htmlFor="password">Password</label>
            <div className="input">
              <LockIcon className='icon' />
              <input type="password" name="password" id="password" placeholder="Enter your password" 
              onChange={(e) => setPassword(e.target.value)}/>
             
            </div>
          </div>

          <div className="inputDiv">
          <FormControl >
            <FormLabel id="demo-row-radio-buttons-group-label"
             sx={{fontFamily:"Montserrat", fontSize: 15, color: "black",fontWeight:400}}
             > Are you a student or a recruiter?</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={(e) => setRole(e.target.value)}
            >
              <FormControlLabel 
              value="student" 
              control={<Radio sx={{ color: "black", '&.Mui-checked': { color: "#7F27FF" } }} />} 
              label="Student"  
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontFamily: "Montserrat", 
                  fontSize: 14, 
                  color: "black", 
                  fontWeight: 400
                }
              }}
            />
            <FormControlLabel 
              value="company" 
              control={<Radio sx={{ color: "black", '&.Mui-checked': { color: "#7F27FF" } }} />} 
              label="Company" 
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontFamily: "Montserrat", 
                  fontSize: 14, 
                  color: "black", 
                  fontWeight: 400
                }
              }}
            />
            </RadioGroup>
          </FormControl>
          </div>


          <button type="submit" className='btn flex'>
            <span>Sign Up</span>
            <LoginIcon />
          </button>

          <span className='forgotPassword'>
            Forgot your password? <a href="">Click here</a>
          </span>

        </form>
      </div>

    </div>
    </div>
    {showAlert && error && <Alert severity="error" className='alert' onClose={() => setShowAlert(false)}>{error}</Alert>}
    </div>
  )
}
