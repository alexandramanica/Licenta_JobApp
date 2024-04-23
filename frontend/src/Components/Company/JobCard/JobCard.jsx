import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LaptopChromebook from '@mui/icons-material/LaptopChromebook';

import {getUserDataFromToken, axiosJWT} from '../../../Views/tokenPrep';
import './JobCard.css'

export default function JobCard({job,showMoreJob}) {
  const jobDate = new Date(job.jobDate);
  const formattedDate = `${jobDate.toLocaleString('default', { month: 'long' })} ${jobDate.getDate()}, ${jobDate.getFullYear()}`;
  return (
    <div className='job-card'>
      <Card className='job-card-container'>
        <CardContent >
          <h5 className='job-card-job-location'>{job.location}</h5>
          <h3 className='job-card-job-title'>{job.jobTitle}</h3>
          <div className="job-card-details-container">
            
            <div className="job-card-type-container">
              <WorkIcon />
              <h4>{job.jobType}</h4>
            </div>

            <div className="job-card-regime-container">
                            <LaptopChromebook />
                            <h4 >{job.jobRegime}</h4>  
                        </div>

            <div className="job-card-salary-container">
              <AttachMoneyIcon />
              <h4>{job.salary}</h4>
            </div>

          </div>

            <div className="job-card-button-container">
              <Button variant='outlined' endIcon={<VisibilityIcon />} className='job-card-button-show'  onClick={() => showMoreJob(job)}>Show more</Button>
            </div>

        </CardContent>
      </Card>
    </div>
  )
}