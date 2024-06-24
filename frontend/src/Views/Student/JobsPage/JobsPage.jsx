import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserDataFromToken,axiosJWT } from '../../../Views/tokenPrep.jsx';
import SidebarStudent from '../../../Components/Student/SidebarStudent/SidebarStudent'
import JobCardStudent from '../../../Components/Student/JobCardStudent/JobCardStudent'
import JobDrawerStudent from '../../../Components/Student/JobDrawerStudent/JobDrawerStudent'
import './JobsPage.css'

import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';

import InputAdornment from '@mui/material/InputAdornment';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import SearchIcon from '@mui/icons-material/Search';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

export default function JobsPage() {
  const navigate=useNavigate();
  const [jobsCards, setJobsCards] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [matchingJobs, setMatchingJobs] = useState([]);

  const [activeButton, setActiveButton] = useState('explore');
  const [quizTaken, setQuizTaken] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  //filters
  const [filteredJobsCards, setFilteredJobsCards] = useState([]);
  const [filteredSavedJobsCards, setFilteredSaveJobsCards] = useState([]);
  const [filteredAppliedJobsCards, setFilteredAppliedJobsCards] = useState([]);
  const [jobTypeFilter, setJobTypeFilter] = useState('');
  const [jobRegimeFilter, setJobRegimeFilter] = useState('');
  const [selectedJobSearch, setSelectedJobSearch] = useState(null);
  const [realTimeSearch, setRealTimeSearch] = useState(null);
  const [locationsFilter, setLocationsFilter] = useState([]);
  const [salaryRange, setSalaryRange] = useState([0, 100000]);

  const uniqueLocations = jobsCards.reduce((unique, job) => {
    return unique.includes(job.location) ? unique : [...unique, job.location];
  }, [])

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredJobsCards.slice(indexOfFirstItem, indexOfLastItem);

  const handleShowMoreClick = (job) => {
    setIsDrawerOpen(true);
    setSelectedJob(job);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  //saving jobs
  const handleSaveJob = async (job) => {
    try {
      const token = localStorage.getItem('tokenAcces');
      
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }
  
      const response = await axiosJWT.post(
        `http://localhost:8001/api/savedJob`,
        {
          studentId: getUserDataFromToken().userId,
          jobId: job.jobId
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      fetchSavedJobs();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnsaveJob = async (job) => {
    try {
      const token = localStorage.getItem('tokenAcces');
      const userId= getUserDataFromToken().userId;
      
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }
  
      const response = await axiosJWT.delete(
        `http://localhost:8001/api/savedJob/${userId}/${job}`,
        {
      
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      fetchSavedJobs();
    } catch (err) {
      console.log(err);
    }
  };

  //applications
  const handleApplyJob = async (job) => {
    try {
      const token = localStorage.getItem('tokenAcces');
      
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }
  
      const response = await axiosJWT.post(
        `http://localhost:8001/api/jobsApplication`,
        {
  
          studentId: getUserDataFromToken().userId,
          jobId: job.jobId,
          applicationDate: new Date()
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

     fetchAppliedJobs();
    } catch (err) {
      console.log(err);
    }
  };

  const isJobApplied = (jobId) => {
    return appliedJobs.some(appliedJob => appliedJob.jobId === jobId && appliedJob.JobApplication.studentId == getUserDataFromToken().userId);
  };

  const isJobSaved = (jobId) => {
    return savedJobs.some(savedJob => savedJob.jobId === jobId && savedJob.SavedJob.studentId == getUserDataFromToken().userId);
  };

    const fetchData = async () => {
      const token = localStorage.getItem('tokenAcces');
      const userId= getUserDataFromToken().userId;
  
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }

      const response = await axiosJWT.get(
        `http://localhost:8001/api/jobs`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
  
      if (response.data) {
        setJobsCards(response.data);
        setFilteredJobsCards(response.data);
      }
    };

    
    const fetchSavedJobs = async () => {
      const token = localStorage.getItem('tokenAcces');
      const userId= getUserDataFromToken().userId;

      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }

      try {
      const savedResponse = await axiosJWT.get(
        `http://localhost:8001/api/savedJob/${userId}`,
        {headers : {'Authorization' : `Bearer ${token}`}}
      );

      if (savedResponse.data) {
        let savedResponse_array=savedResponse.data.saved_jobs_jobs
        setSavedJobs(savedResponse_array);
        setFilteredSaveJobsCards(savedResponse_array)
        
      }
    } catch (err) {
      console.log(err);
    }
    };

    const fetchAppliedJobs = async () => {
      const token = localStorage.getItem('tokenAcces');
      const userId= getUserDataFromToken().userId;
  
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }
    
      try {
        const appliedRespone = await axiosJWT.get(
          `http://localhost:8001/api/jobsApplication/${userId}`,
        );
        
        if (appliedRespone.data) {
          let appliedRespone_array=appliedRespone.data.applied_job_student
          setAppliedJobs(appliedRespone_array);
          setFilteredAppliedJobsCards(appliedRespone_array);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const fetchJobsMatching = async () => {
      const token = localStorage.getItem('tokenAcces');
      const userId= getUserDataFromToken().userId;
  
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }
  
      const response = await axiosJWT.get(
        `http://localhost:8001/api/quizTake/student/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
  
      if (response.data) {
        console.log(response.data)
    
        let highestPathValue = -Infinity;
        let highestPathName = '';
      
        for (const [pathName, pathValue] of Object.entries(response.data)) {
          if (pathValue > highestPathValue && pathName !== 'quizTakeId' && pathName !== 'studentId' && pathName !== 'finishDate') {
            highestPathValue = pathValue;
            highestPathName = pathName;
          }
        }
      
        console.log(highestPathName, highestPathValue);
        if (highestPathName === 'BussinesPath'){
          const matchingJobsArray = jobsCards.filter(job => job.jobPath === 'Business');
          setFilteredJobsCards(matchingJobsArray);
          console.log("Match",matchingJobsArray)

        } else  if (highestPathName === 'DataPath') {
          const matchingJobsArray = jobsCards.filter(job => job.jobPath === 'Data');
          setFilteredJobsCards(matchingJobsArray);

        } else if (highestPathName === 'UiUxPath'){
          const matchingJobsArray = jobsCards.filter(job => job.jobPath === 'UI-UX');
          setFilteredJobsCards(matchingJobsArray);

        } else  if (highestPathName === 'EngineeringPath'){
          const matchingJobsArray = jobsCards.filter(job => job.jobPath === 'Engineering');
          setFilteredJobsCards(matchingJobsArray);
        }
          
          
    
        
      } else {
         console.log("No data found");
      }

    };

    const fetchExistentQuizTake = async () => {
      const token = localStorage.getItem('tokenAcces');
      const userId= getUserDataFromToken().userId;

      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }

      try {
      const response = await axiosJWT.get(
        `http://localhost:8001/api/quizTake/student/${userId}`,
        {headers : {'Authorization' : `Bearer ${token}`}}
      );

      if (response.data) {
        setQuizTaken(true);
        console.log("quiztaken",quizTaken);
      } else {
        setQuizTaken(false); // Set quizTaken to false if the user hasn't taken the quiz
      }
    } catch (err) {
      console.log(err);
    }
    };

    React.useEffect(() => {
    try{
      const token = localStorage.getItem('tokenAcces');
          
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }

      fetchData();
      fetchAppliedJobs();
      fetchSavedJobs();
      fetchExistentQuizTake();
    } catch (error) {
      console.log('error', error);}
    }, []);


  return (
    <div>
        <SidebarStudent/>
        <div className='student-jobs-page'>

        <div className="student-jobs-page-text">
            <h1 className='student-jobs-page-text-title'>Jobs</h1>
            <p className='student-jobs-page-text-subtitle'>Welcome to our job browsing page!👋 Here, you can explore various job opportunities in different fields. 🕵️‍♀️ Start your journey towards finding your dream job today.</p>
        </div>

        <div className='student-jobs-page-render-buttons'>
          <Button 
            className={`student-jobs-render-buttons-explore ${activeButton === 'explore' ? 'active' : ''}`} 
            onClick={() => {setActiveButton('explore'); 
            fetchData()
          }}
          >Explore</Button>
          <Button 
            className={`student-jobs-render-buttons-applied ${activeButton === 'applied' ? 'active' : ''}`} 
            onClick={() => {setActiveButton('applied'); 
                            fetchAppliedJobs()
                          }}
          >Applied
          </Button>
          <Button 
            className={`student-jobs-render-buttons-saved ${activeButton === 'saved' ? 'active' : ''}`} 
            onClick={() => {setActiveButton('saved');
                            fetchSavedJobs()
                          }}
          >
            Saved
          </Button>
        </div>

        <div className='student-jobs-page-filter-search-container'>
              <Autocomplete
                id="student-jobs-page-filter-search"
                style={{ width: '100%' }}
                freeSolo
                options={jobsCards}
                getOptionLabel={(option) => option.jobTitle} 
                onInputChange={(event, newInputValue) => {
                  setRealTimeSearch(newInputValue);
                  setFilteredJobsCards(jobsCards.filter(job => 
                    job.jobTitle.toLowerCase().startsWith(newInputValue.toLowerCase())
                  ));
                  setFilteredSaveJobsCards(savedJobs.filter(job => 
                    job.jobTitle.toLowerCase().startsWith(newInputValue.toLowerCase())
                  ));
                  setFilteredAppliedJobsCards(appliedJobs.filter(job => 
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

        <div className='student-jobs-page-filters'>
      
            <div className='student-jobs-page-filter-job-type-container'>
              <Autocomplete
                id="student-jobs-page-filter-job-type"
                style={{ width: '100%' }}
                options={['Full-Time', 'Part-Time', 'Internship']}
                getOptionLabel={(option) => option} 
                onInputChange={(event, newInputValue) => {
                  setJobTypeFilter(newInputValue);
                }}
                renderInput={(params) => <TextField {...params} label="Job Type"  id="student-jobs-page-filter-job-type" InputLabelProps={{style: { color: '#ae85ff',paddingLeft:'5px',fontFamily:'Montserrat',fontWeight:'500'}}} />}
              />
            </div>
            <div className='student-jobs-page-filter-job-regime-container'>
              <Autocomplete
                id="student-jobs-page-filter-job-regime"
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
            <div className='student-jobs-page-filter-location-container'>
              <Autocomplete
                id="student-jobs-page-filter-location"
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

            <div className='student-jobs-page-filter-salary-container'>
            <Autocomplete
              id="student-jobs-page-filter-salary"
              options={[
                { label: '0 - 2.5000', value: [0, 2500] },
                { label: '2.5000 - 6.000', value: [2500, 6000] },
                { label: '6.000 - 8.000', value: [6000, 8000] },
                { label: '8.000 - 10.000', value: [8000, 10000] },
                { label: '10.000 - 20.000', value: [10000, 20000] },
              ]}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) => 
                option.value[0] === value[0] && option.value[1] === value[1]
              }
              onChange={(event, newValue) => {
                if (newValue) {
                  setSalaryRange(newValue.value);
                } else {
                  setSalaryRange([0, 20000]);
                }
              }}
              renderInput={(params) => <TextField {...params} label="Salary Range" InputLabelProps={{style: { color: '#ae85ff',paddingLeft:'5px',fontFamily:'Montserrat',fontWeight:'500'}}} />}
            />
            </div>

            <Button onClick={() => {
                 let filteredJobs;
                 if(activeButton === 'explore'){
                   filteredJobs = jobsCards.filter(job => 
                     (selectedJobSearch === null || selectedJobSearch === '' || job.jobTitle.toLowerCase().includes(selectedJobSearch.toLowerCase())) &&
                     (jobTypeFilter === null || jobTypeFilter === '' || job.jobType === jobTypeFilter) &&
                     (jobRegimeFilter === null || jobRegimeFilter === '' || job.jobRegime === jobRegimeFilter) &&
                     (locationsFilter.length === 0 || locationsFilter.includes(job.location)) &&
                     (job.salary >= salaryRange[0] && job.salary <= salaryRange[1])
                   );
                   setFilteredJobsCards(filteredJobs);
                 } else if(activeButton === 'saved'){
                   filteredJobs = savedJobs.filter(job => 
                     (selectedJobSearch === null || selectedJobSearch === '' || job.jobTitle.toLowerCase().includes(selectedJobSearch.toLowerCase())) &&
                     (jobTypeFilter === null || jobTypeFilter === '' || job.jobType === jobTypeFilter) &&
                     (jobRegimeFilter === null || jobRegimeFilter === '' || job.jobRegime === jobRegimeFilter) &&
                     (locationsFilter.length === 0 || locationsFilter.includes(job.location)) &&
                     (job.salary >= salaryRange[0] && job.salary <= salaryRange[1])
                   );
                   setFilteredSaveJobsCards(filteredJobs);
                   
                 } else if(activeButton === 'applied'){
                   filteredJobs = appliedJobs.filter(job => 
                     (selectedJobSearch === null || selectedJobSearch === '' || job.jobTitle.toLowerCase().includes(selectedJobSearch.toLowerCase())) &&
                     (jobTypeFilter === null || jobTypeFilter === '' || job.jobType === jobTypeFilter) &&
                     (jobRegimeFilter === null || jobRegimeFilter === '' || job.jobRegime === jobRegimeFilter) &&
                     (locationsFilter.length === 0 || locationsFilter.includes(job.location)) &&
                     (job.salary >= salaryRange[0] && job.salary <= salaryRange[1])
                   );
                   setFilteredAppliedJobsCards(filteredJobs);
                 }
              
              }}
            className='student-jobs-page-button-search'
            endIcon={<SearchIcon/>}>Search</Button>

        </div>

        <div className="student-jobs-page-personalized-jobs-container">
              <h5 className="student-jobs-page-personalized-jobs-text">Not happy with the results? See jobs that match your path!</h5>
              {quizTaken ? (
                <Button className="student-jobs-page-personalized-jobs-button" endIcon={<AutoFixHighIcon/>} onClick={fetchJobsMatching}>See jobs that match you</Button>
                ) : (
                  <Button className="student-jobs-page-personalized-jobs-button" endIcon={<AutoFixHighIcon/>} onClick={() => navigate('/LearningPath')}>Take the Quiz</Button>
                )}
        </div>

        <div className='student-jobs-page-cards'>
        {(activeButton === 'saved' ? filteredSavedJobsCards 
          : activeButton === 'applied' ? filteredAppliedJobsCards 
          : filteredJobsCards).map((job, index) => (
          <JobCardStudent key={index} 
            job={job} 
            onSaveJob={handleSaveJob} 
            onApplyJob={handleApplyJob}
            onUnsaveJob={handleUnsaveJob}
            onShowMoreClick={() => handleShowMoreClick(job)} 
            isApplied={isJobApplied(job.jobId)}
            isSaved={isJobSaved(job.jobId)}
            className='student-jobs-page-job-card' />
        ))}
        </div>

        <div className='student-jobs-page-pagination'>
          <Pagination count={Math.ceil(filteredJobsCards.length / itemsPerPage)} page={currentPage} onChange={handlePageChange} 
          sx={{marginTop:'10px',marginBottom:'10px', display:'flex', justifyContent:'center'}}/>
        </div>

        <div className='student-jobs-page-drawer'>
          <JobDrawerStudent
            job={selectedJob} 
            isOpen={isDrawerOpen} 
            onSaveJob={handleSaveJob} 
            onApplyJob={handleApplyJob}
            onUnsaveJob={handleUnsaveJob}
            isApplied={selectedJob ? isJobApplied(selectedJob.jobId) : false}
            isSaved={selectedJob ? isJobSaved(selectedJob.jobId) : false}
            onClose={() => setIsDrawerOpen(false)} />
        </div>

        </div>
    </div>
  )
}
