import React from 'react'
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

import { useState } from 'react';
import { getUserDataFromToken,axiosJWT } from '../../../Views/tokenPrep.jsx';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WorkIcon from '@mui/icons-material/Work';
import PlaceIcon from '@mui/icons-material/Place';
import LaptopChromebook from '@mui/icons-material/LaptopChromebook';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BusinessIcon from '@mui/icons-material/Business';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

import './JobDrawerStudent.css'

export default function JobDrawerStudent({job, isOpen, onClose,  onSaveJob, onApplyJob, isApplied, isSaved, onUnsaveJob}) {
    const [recruiterData, setRecruiterData] = useState([]);

    const handleUnsaveClick = () => {
        console.log('unsave', job?.jobId);
        onUnsaveJob(job?.jobId);
    };
    

    React.useEffect(() => {

        if (!job) {
            // console.error('Job data is null or undefined');
            return;
        }

        const token = localStorage.getItem('tokenAcces');
       
        if (!token) {
          console.error('Token not found in localStorage');
          return;
        }

        const fetchRecruiterData = async () => {
          try {

            let recruiterId = job.recruiterId;

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
      }, [job]);

      if (!job) {
        return;
      }

      const jobDate = job ? new Date(job.jobDate) : null;
      const formattedDate = jobDate ? `${jobDate.toLocaleString('default', { month: 'long' })} ${jobDate.getDate()}, ${jobDate.getFullYear()}` : '';

    return (
    <div>
        <Drawer className='student-about-job-drawer'
                anchor='right'
                open={isOpen}
                onClose={onClose}
                PaperProps={{ 
                        style: {
                            width: '47%', 
                            overflowY: 'auto',
                            height: '100vh',
                        },
                }}
        >
            <div className='student-about-job'>
                <div className='student-about-job-container'>
                    <h2 className='student-about-job-title'>{job.jobTitle}</h2>
                    <h5 className='student-about-job-company'> <BusinessIcon /> {recruiterData.companyName}</h5>
                    <h5 className='student-about-job-date'>Posted on: {formattedDate}</h5>
                    <div className='student-about-job-content'>

                        <div className="student-about-job-details-container">
                            <div className="student-about-job-location-container">
                                <PlaceIcon />
                                <h4>{job.location}</h4>
                            </div>
                            
                            <div className="student-about-job-type-container">
                                <WorkIcon />
                                <h4 >{job.jobType}</h4> 
                            </div>

                            <div className="student-about-job-regime-container">
                                <LaptopChromebook />
                                <h4 >{job.jobRegime}</h4>  
                            </div>

                            <div className="student-about-job-salary-container">
                                <AttachMoneyIcon />
                                <h4>{job.salary} RON/month</h4>
                            </div>

                            <div className="student-about-job-path-container">
                                <AutoAwesomeIcon />
                                <h4>{job.jobPath}</h4>
                            </div>
                        </div>

                        <div className='student-about-job-buttons-container'>
                            <Button endIcon={<AdsClickIcon />}
                                onClick={() => isApplied ? null : onApplyJob(job)} 
                                disabled={isApplied}
                                className={isApplied ? 'student-about-job-button-applied' : 'student-about-job-button-apply'}>
                                {isApplied ? 'Job Applied' : 'Apply now'}
                            </Button>
                            <Button 
                                endIcon={<BookmarkIcon />} 
                                onClick={isSaved ? handleUnsaveClick : () => onSaveJob(job)} 
                                className={isSaved ? 'student-about-job-button-saved-job' : 'student-about-job-button-save-job'}>
                                {isSaved ? 'Unsave job' : 'Save job'}
                            </Button>
                            
                        </div> 


                        <div className='student-about-job-text-container'>
                            <h3 className='student-about-job-title-description'>About company</h3>
                            <p className='student-about-job-subtitle-description'>{recruiterData.aboutCompany}</p>

                            <h3 className='student-about-job-title-description'>About job</h3>
                            {job.jobDescription.split(/(?<=[.])\s*/).map((sentence, index) => (
                                <p key={index} className='student-about-job-subtitle-description'>{sentence}</p>
                            ))}

                            <h3 className='student-about-job-title-description'>Requirements</h3>
                            <ul style={{ marginBottom: '10px', marginLeft:'0px' }}>
                                {job.jobRequirements.split(/(?<=[.;])\s*/).map((sentence, index) => (
                                    <li key={index} className='student-about-job-subtitle-description'>{sentence}</li>
                                ))}
                            </ul>

                            <h3 className='student-about-job-title-description'>Responsabilities</h3>
                            <ul style={{ marginBottom: '10px', marginLeft:'0px' }}>
                                {job.jobResponsabilities.split(/(?<=[.;])\s*/).map((sentence, index) => (
                                    <li key={index} className='student-about-job-subtitle-description'>{sentence}</li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </Drawer>
    </div>
  )
}
