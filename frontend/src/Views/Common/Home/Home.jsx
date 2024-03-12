import React from 'react'
import {Link} from 'react-router-dom'
import { Button } from '@mui/material'

import './Home.css'
import NavbarBF from '../../../Components/Common/NavbarBF/NavbarBF'

import imageHome from '../../../assets/pexels-buro-millennial-1438072.jpg'
import videoHome from '../../../assets/video.mp4'

export default function Home() {
  return (
    <div >
    <NavbarBF />
    
    <div className="homePage">
      <div className="imageDiv">
        <img src={imageHome} alt="home" />
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
