import React from 'react'
import {Link} from 'react-router-dom'
import { Button } from '@mui/material'

import './Home.css'
import NavbarBF from '../../../Components/Common/NavbarBF/NavbarBF'
import CardStepsHomePage from '../../../Components/Common/CardStepsHomePage/CardStepsHomePage'

import imageGeometricPattern from '../../../assets/homepage/GeometricPattern.png'
import imageJobCard from '../../../assets/homepage/JobCard.jpg'
import videoHome from '../../../assets/video.mp4'

export default function Home() {
  return (
    <div >
    <NavbarBF />
    
    <div className="homePage">
      <div className='home-page-hero-container'>
        <div className='home-page-hero-text'>
          <h1 className='home-page-hero-title'>Welcome to Jump<span>Start</span></h1>
          <h2 className='home-page-hero-subtitle'>Find your perfect job faster and easier than ever before!</h2>
          <Button className='btn-home-page-hero-join'>Join us</Button>
          <Button className='btn-home-page-hero-learn'>Learn more about us!</Button>
        </div>
        <div className="home-page-hero-images">
          <img src={imageGeometricPattern} alt="home" className='home-page-hero-image1'/>
          <div className='home-page-hero-container-job-card'>
            <img src={imageJobCard} alt="home" className='home-page-hero-image2'/>
          </div>
          
        </div>
      </div>

      <div className="home-page-cards-container">
        <div className="home-page-text-container">
          <h3 className='home-page-text-container-subtitle' >How it works</h3>
          <h2 className='home-page-text-container-title'>Simple steps to get your next jobs</h2>
        </div>
        <div className='home-page-container'>
          <CardStepsHomePage />
        </div>

      </div>


      <div className="imageDiv">
       <video src={videoHome} autoPlay loop muted className='video'/>
        <div className="textDiv">
          <h2 className='title'>Discover the perfect job for you</h2>
          <p className='text'>Only with Jumpstart</p>
        </div>
        <Link to='/SignUp'>
        <Button className='btn Discover'>Discover</Button>
        </Link>
      </div>
      
    </div>
    
    </div>
  )
}
