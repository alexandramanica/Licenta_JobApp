import React from 'react'
import Button  from '@mui/material/Button'
import { Link } from 'react-router-dom'

import SidebarStudent from '../../../Components/Student/SidebarStudent/SidebarStudent'
import NavbarStudentMD from '../../../Components/Student/NavbarStudent/NavbarStudentMD.jsx'
import NavbarStudentXS from '../../../Components/Student/NavbarStudent/NavbarStudentXS.jsx'
import CardCareerPathAbout from '../../../Components/Student/CardCareerPathAbout/CardCareerPathAbout.jsx'
import './Dashboard.css'

import videoDashboard from '../../../assets/videoDashboard.mp4'


export default function Dashboard() {
  return (

    <div>
      <SidebarStudent />
      <NavbarStudentMD/>
      <NavbarStudentXS/>
      <div  className="dashboard-container">

        <div className='dashboard-video-container'>
          <video src={videoDashboard} className='dashboard-video-container-video' autoPlay loop muted />
          <div className='dashboard-video-container-elements'>
            <h3 className='dashboard-video-container-title'>Discover your path to succes</h3>
            <h3 className='dashboard-video-container-subtitle'>Your perfect place to rediscover yourself</h3>
            <Link to='/CV'>
              <Button className='dashboard-video-container-button' >Get Started</Button>
            </Link>
          </div>
        </div>

        <div className='dashboard-careerPaths-container'>
          <div className='dashboard-careerPaths-container-text'>
            <h4 className='dashboard-careerPaths-container-subtitle'>Career Paths</h4>
            <h3 className='dashboard-careerPaths-container-title'>Unlock your potential</h3>
            <p className='dashboard-careerPaths-container-p'>Unleash Your Potential with the Best Career Path for You!</p>
          </div>
          <CardCareerPathAbout/>
        </div>
      </div>

    </div>
  )
}
