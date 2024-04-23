import React from 'react'
import { jwtDecode } from 'jwt-decode';
import {Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import axios from "axios";
import './Login.css';
import '../../../App.css';

import NavbarBF from '../../../Components/Common/NavbarBF/NavbarBF'
import videoLogin from '../../../assets/assetsLoginRegister/videoStudents.mp4'
import logo from '../../../assets/assetsLogo/JumpStartLogoGrey.png'
import Alert from '@mui/material/Alert';

import LockOpenIcon from '@mui/icons-material/LockOpen';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import EmailIcon from '@mui/icons-material/Email';

export default function Login() {
  const [users, setUsers] = useState([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setShowAlert(true);
      setError('Email and password are required.');
      setTimeout(() => setShowAlert(false), 10000);
      return;
    }

    try{
      const res=await axios.post('http://localhost:8001/api/login',{email,password})
      if(res.data){     
        setUsers(res.data)
        console.log(res.data)
        localStorage.clear()
        localStorage.setItem('tokenAcces', res.data.accessToken);
        localStorage.setItem('tokenRefresh', res.data.refreshToken);
        if (res.data.role==='student'){
        navigate("/CV")}
        else{navigate('/DashboardRecruiter')}}
    }
    catch (error) {
      console.log('error', error);
      setShowAlert(true);
      setError('The email and password don\'t match! Please try again.');
      setTimeout(() => setShowAlert(false), 10000);
    }
  }

  const refreshToken = async () => {
    try {
      const res = await axios.post("http://localhost:8001/api/refresh", { token: users.refreshToken });
      setUsers({
        ...users,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      });
      console.log(res.data);
      console.log("refresh done")
      return res.data;
    } catch (err) {
      console.log("refresh none")
      console.log(err);
    }
  };

  const axiosJWT = axios.create()

  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      const decodedToken = jwtDecode(users.accessToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshToken();
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <div>
    
    <NavbarBF />

    <div className="loginPage flex">
    <div className="container flex">

      <div className="videoDiv">
      <video src={videoLogin} autoPlay loop muted />
        <div className="textDiv">
          <h2 className="title">Welcome back!</h2>
          <p>Let's get you back on track towards your career goals. 
            Please sign in to continue your job application journey.</p>
        </div>

        <div className="footerDiv flex">
          <span className="text">Don't have an account?</span>
          <Link to={'/SignUp'}>
          <button className='btn'>Sign Up</button>
          </Link>
        </div>
      </div>

      <div className="formDiv flex">
        <div className="headerDiv">
          <img src={logo} alt="logo" />
          </div>

      
        <form  onSubmit={handleSubmit} className='form grid'>

          <div className="inputDiv">
            <label htmlFor="email">Email</label>
            <div className="input">
              <EmailIcon className='icon' />
              <input type="email" name="email" id="email" placeholder="Enter your email" 
              onChange={(e) => setEmail(e.target.value)}/>
            </div>
          </div>

          <div className="inputDiv">
            <label htmlFor="password">Password</label>
            <div className="input">
              <LockOpenIcon className='icon' />
              <input type="password" name="password" id="password" placeholder="Enter your password" 
              onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>

          <button type="submit" className='btn flex'>
            <span>Login</span>
            <LoginIcon />
          </button>

          <span className='forgotPassword'>
            Forgot your password? <a href="">Click here</a>
          </span>

        </form>
      </div>

    </div>
    </div>
    {showAlert && <Alert severity="error" className='alert' onClose={() => setShowAlert(false)}>{error}</Alert>}
    </div>
  )
}
