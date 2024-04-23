import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';


import Button from '@mui/material/Button';
import WorkIcon from '@mui/icons-material/Work';
import LaptopChromebook from '@mui/icons-material/LaptopChromebook';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

import { useState } from 'react';
import { getUserDataFromToken,axiosJWT } from '../../../Views/tokenPrep.jsx';

import './JobCardStudent.css'

export default function JobCardStudent({job,onShowMoreClick, onSaveJob, onApplyJob, isApplied, isSaved, onUnsaveJob }) {
 
  const [recruiterData, setRecruiterData] = useState([]);

  const handleUnsaveClick = () => {
    console.log('unsave', job.jobId);
    onUnsaveJob(job.jobId);
  };

  React.useEffect(() => {
      const token = localStorage.getItem('tokenAcces');
      let recruiterId=job.recruiterId;
      
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }

      try {
        const fetchRecruiterData = async () => {
          try {
            const response = await axiosJWT.get(
              `http://localhost:8001/api/recruiter/${recruiterId}`,
              { headers: { 'Authorization': `Bearer ${token}` } }
            );
      
            if (response.data) {
              setRecruiterData(response.data);
            }
          } catch (err) {
            console.log(err);
          }
        };
        
        fetchRecruiterData();
    } catch (err) {
      console.log(err);
    }
  },[]);

  return (
    <div className='student-job-card'>
      <Card className='student-job-card-container'>
        <CardContent >
          <div className='student-job-card-student-job-location-save-container'>
            <h5 className='student-job-card-student-job-location'>{job.location}</h5>
            <IconButton
              aria-label="save"
              color="primary"
              className='student-job-card-student-job-save-container'
              sx={{ color: '#c7ef00' }}
              onClick={isSaved ? handleUnsaveClick : () => onSaveJob(job)}
            >
              {isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </IconButton>
          </div>
          <h3 className='student-job-card-student-job-title'>{job.jobTitle}</h3>
          <h3 className='student-job-card-student-job-company'>{recruiterData.companyName}</h3>
          <div className="student-job-card-details-container">
            
            <div className="student-job-card-type-container">
              <WorkIcon />
              <h4>{job.jobType}</h4>
            </div>

            <div className="student-job-card-regime-container">
                            <LaptopChromebook />
                            <h4 >{job.jobRegime}</h4>  
                        </div>

            <div className="student-job-card-salary-container">
              <AttachMoneyIcon />
              <h4>{job.salary}</h4>
            </div>

          </div>

            <div className="student-job-card-button-container">
              
              <Button  endIcon={<AdsClickIcon />} 
                onClick={() => isApplied ? null : onApplyJob(job)} 
                disabled={isApplied}
                className={isApplied ? 'student-job-card-button-applied' : 'student-job-card-button-apply'}>
                {isApplied ? 'Job Applied' : 'Apply now'}
              </Button>
              <Button variant='outlined' endIcon={<VisibilityIcon />} className='student-job-card-button-show'  onClick={onShowMoreClick}>Show more</Button>
            </div>

        </CardContent>
      </Card>
    </div>
  )
}
