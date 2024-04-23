import React from 'react'
import { useState } from 'react';

import '../JobsRecruiter/JobsRecruiter.css'
import SidebarCompany from '../../../Components/Company/SidebarCompany/SidebarCompany.jsx';
import JobCard from '../../../Components/Company/JobCard/JobCard.jsx';
import ModalAddJobCard from '../../../Components/Company/ModalAddJobCard/ModalAddJobCard.jsx';
import JobCardAbout from '../../../Components/Company/JobCardAbout/JobCardAbout.jsx';

import { getUserDataFromToken,axiosJWT } from '../../../Views/tokenPrep.jsx';
import Button from '@mui/material/Button';
import Divider  from '@mui/material/Divider';
import  Autocomplete from '@mui/material/Autocomplete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardIcon from '@mui/icons-material/Keyboard';

export default function JobsRecruiter() {
  const [jobsCards, setJobsCards] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [editingJob, setEditingJob] = useState(null);
  const [refreshJobs, setRefreshJobs] = useState(false);
  //filters
  const [filteredJobsCards, setFilteredJobsCards] = useState([]);
  const [jobTypeFilter, setJobTypeFilter] = useState('');
  const [jobRegimeFilter, setJobRegimeFilter] = useState('');
  const [selectedJobSearch, setSelectedJobSearch] = useState(null);
  const [realTimeSearch, setRealTimeSearch] = useState(null);
  const [locationsFilter, setLocationsFilter] = useState([]);

  const uniqueLocations = jobsCards.reduce((unique, job) => {
    return unique.includes(job.location) ? unique : [...unique, job.location];
  }, []);

  const [openModalJob, setOpenModalJob] = React.useState(false);
  const handleOpenModalJob = () => setOpenModalJob(true);

React.useEffect(() => {
  try{
    let recruiterId = getUserDataFromToken().userId;
        console.log("User Id", recruiterId)
        const token = localStorage.getItem('tokenAcces');
        
    if (!token) {
      console.error('Token not found in localStorage');
      return;
    }

    const fetchData = async () => {
      const response = await axiosJWT.get(
        `http://localhost:8001/api/job/recruiterId/${recruiterId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
  
      if (response.data) {
        console.log('Job Recruiter Card Data:', response.data);
        setJobsCards(response.data);
        setFilteredJobsCards(response.data);
      }
    };

    fetchData();
  } catch (error) {
    console.log('error', error);}
  }, [refreshJobs]);

  const deleteJob = async (jobId) => {
    try {
      const token = localStorage.getItem('tokenAcces');
      console.log("Education Id delete", jobId)
      
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }

      const response = await axiosJWT.delete(`http://localhost:8001/api/job/delete/${jobId}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200) {
        setJobsCards(jobsCards.filter(job => job.jobId !== jobId));

      }
    } catch (error) {
      console.error('Failed to delete job:', error);
    }
  };

  const editJob = (job) => {
    setEditingJob(job);
    setOpenModalJob(true);
  };

  const showMoreJob = (job) => {
    console.log('Selected job:', job);
    setSelectedJob(job);
  };

  const handleJobUpdated = () => {
    setRefreshJobs(!refreshJobs); 
  };

  return (
    <div>
    <SidebarCompany />

    <div className="jobs-page">

        <div className="jobs-page-text">
            <h1 className='jobs-page-text-title'>Jobs</h1>
            <p className='jobs-page-text-subtitle'>Welcome to our candidate browsing page! Here, you can explore the profiles of talented individuals who are seeking opportunities in various fields.</p>
        </div>
        <Button className='jobs-page-add-button' startIcon={<AddBoxIcon /> } onClick={handleOpenModalJob} >Add Job</Button>
        
      <div className="jobs-page-filters">
      <div className='jobs-page-filter-search-container'>
        <Autocomplete
          id="jobs-page-filter-search"
          style={{ width: '100%' }}
          freeSolo
          options={jobsCards}
          getOptionLabel={(option) => option.jobTitle} 
          onInputChange={(event, newInputValue) => {
            setRealTimeSearch(newInputValue);
            setFilteredJobsCards(jobsCards.filter(job => 
              job.jobTitle.toLowerCase().startsWith(newInputValue.toLowerCase())
            ));
          }}
          onBlur={() => {
            setSelectedJobSearch(realTimeSearch);
          }}
          renderInput={(params) => <TextField {...params} label="Search by Job Title" 
                                      InputProps={{
                                        endAdornment: (
                                          <InputAdornment position="end">
                                            <KeyboardIcon/>
                                          </InputAdornment>
                                        ),
                                      }}
                                      InputLabelProps={{style: { color: '#ae85ff',paddingLeft:'5px', fontFamily:'Montserrat',fontWeight:'500'}}} />}
        />
      </div>
      <div className='jobs-page-filter-job-type-container'>
          <Autocomplete
            id="jobs-page-filter-job-type"
            style={{ width: '100%' }}
            options={['Full-Time', 'Part-Time', 'Internship']}
            getOptionLabel={(option) => option} 
            onInputChange={(event, newInputValue) => {
              setJobTypeFilter(newInputValue);
            }}
            renderInput={(params) => <TextField {...params} label="Job Type"  id="jobs-page-filter-job-type" InputLabelProps={{style: { color: '#ae85ff',paddingLeft:'5px',fontFamily:'Montserrat',fontWeight:'500'}}} />}
          />
        </div>
        <div className='jobs-page-filter-job-regime-container'>
          <Autocomplete
            id="jobs-page-filter-job-regime"
            disablePortal
            style={{ width: '100%' }}
            options={['Remote', 'On-Site', 'Hybrid']}
            getOptionLabel={(option) => option} 
            onInputChange={(event, newInputValue) => {
              setJobRegimeFilter(newInputValue);
            }}
            renderInput={(params) => <TextField {...params} label="Job Regime" InputLabelProps={{style: { color: '#ae85ff',paddingLeft:'5px',fontFamily:'Montserrat',fontWeight:'500'}}} />}
          />
        </div>
        <div className='jobs-page-filter-location-container'>
          <Autocomplete
            id="jobs-page-filter-location"
            disablePortal
            style={{ width: '100%' }}
            options={uniqueLocations}
            getOptionLabel={(option) => option} 
            onInputChange={(event, newInputValue) => {
              setLocationsFilter(newInputValue);
            }}
            renderInput={(params) => <TextField {...params} label="Job Location" InputLabelProps={{style: { color: '#ae85ff',paddingLeft:'5px',fontFamily:'Montserrat',fontWeight:'500'}}} />}
          />
        </div>

        <Button onClick={() => {
          setFilteredJobsCards(jobsCards.filter(job => 
            (selectedJobSearch === null || selectedJobSearch === '' || job.jobTitle.toLowerCase().includes(selectedJobSearch.toLowerCase())) &&
            (jobTypeFilter === null || jobTypeFilter === '' || job.jobType === jobTypeFilter) &&
            (jobRegimeFilter === null || jobRegimeFilter === '' || job.jobRegime === jobRegimeFilter) &&
            (locationsFilter.length === 0 || locationsFilter.includes(job.location))
          ));
        }}
        className='jobs-page-button-search'
        endIcon={<SearchIcon/>}>Search</Button>
      </div>

        <Divider className='divider' sx={{backgroundColor: '#dadcf2'}} />
        <div className="jobs-page-content">
          <div className="jobs-page-card" >
            {filteredJobsCards.map(job => (
              <JobCard key={`job-${job.jobId}`} job={job} className='candidate-card' 
                      showMoreJob={() => showMoreJob(job)} />
            ))} 
          </div>
          <div className= "jobs-page-details">
              <JobCardAbout job={selectedJob}
                            deleteJob={() => deleteJob(selectedJob.jobId)}
                            editJob={() => editJob(selectedJob)} />
          </div>
      </div>
    </div>

   

    <div className="modal-add-job">
      <ModalAddJobCard open={openModalJob} 
                       handleClose={() => {setOpenModalJob(false); setEditingJob(null); handleJobUpdated();}} 
                       editingJob={editingJob} 
                       editJob={editJob}
                      />
    </div>
</div>
  )
}
