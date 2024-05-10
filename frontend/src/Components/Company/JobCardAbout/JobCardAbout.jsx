import React from 'react'
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Alert from '@mui/material/Alert';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WorkIcon from '@mui/icons-material/Work';
import PlaceIcon from '@mui/icons-material/Place';
import LaptopChromebook from '@mui/icons-material/LaptopChromebook';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';

import './JobCardAbout.css'
import CandidateDrawerProfile from '../CandidateDrawerProfile/CandidateDrawerProfile.jsx';
import { getUserDataFromToken,axiosJWT } from '../../../Views/tokenPrep.jsx';


export default function JobCardAbout({ job,deleteJob,editJob }) {
const [activeButton, setActiveButton] = useState('details');
const [candidates, setCandidates] = useState([]);
const [selectedCandidate, setSelectedCandidate] = useState(null);
const [filteredCandidates, setFilteredCandidates] = useState([]);
const [isOpenDrawer, setIsOpenDrawer] = useState(false);
const [showAlert, setShowAlert] = useState(false);

const handleOpenDrawer= (candidate) => {
  setSelectedCandidate(candidate);
  setIsOpenDrawer(true);
};


  const fetchCandidates = async () => {
    const token = localStorage.getItem('tokenAcces');
    const userId= getUserDataFromToken().userId;

    if (!token) {
      console.error('Token not found in localStorage');
      return;
    }

    try {
    const response = await axiosJWT.get(
      `http://localhost:8001/api/jobApplication/studentsByJob/${job.jobId}`,
      {headers : {'Authorization' : `Bearer ${token}`}}
    );

    if (response.data) {
      setCandidates(response.data);
        setFilteredCandidates(response.data);
      console.log(response.data)
    }
  } catch (err) {
    console.log(err);
  }
  };

  React.useEffect(() => {
    fetchCandidates();
  }, [job]);

  if (!job) {
    return (
        <div>Please select a job to see the details.</div>);
  }

  const handleSearchChange = (event, newValue, reason) => {
    if (reason === 'input') {
      if (typeof newValue === 'string') {
        setFilteredCandidates(candidates.filter(candidate => 
          candidate.firstName.toLowerCase().includes(newValue.toLowerCase()) ||
          candidate.lastName.toLowerCase().includes(newValue.toLowerCase())
        ));
      } else {
        setFilteredCandidates(candidates);
      }
    }
  };

  const generateCV= async(studentId) =>{
      const token = localStorage.getItem('tokenAcces');
      const userId= getUserDataFromToken().userId;

      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }

      try {
      const response = await axiosJWT.get(
        `http://localhost:8001/api/student/generate-cv/${studentId}`,
        {headers : {'Authorization' : `Bearer ${token}`}}
      );

      if (response.data) {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 10000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const jobDate = new Date(job.jobDate);
  const formattedDate = `${jobDate.toLocaleString('default', { month: 'long' })} ${jobDate.getDate()}, ${jobDate.getFullYear()}`;

  return (
    <div className='recruiter-about-job'>
        <Paper className='recruiter-about-job-paper' elevation={3}>
            <div className='recruiter-about-job-buttons'>
                <Button 
                    className={`recruiter-about-job-buttons-details ${activeButton === 'details' ? 'active' : ''}`}
                    onClick={() => {setActiveButton('details')}} >Job details</Button>
                <Button 
                    className={`recruiter-about-job-buttons-candidates ${activeButton === 'candidates' ? 'active' : ''}`}
                    onClick={() => {setActiveButton('candidates');
                                    fetchCandidates()}}>Candidates</Button>
            </div>

            {activeButton === 'details' ? (
                <div className='recruiter-about-job-container'>
                    <h2 className='recruiter-about-job-title'>{job.jobTitle}</h2>
                    <h5 className='recruiter-about-job-date'>Posted on: {formattedDate}</h5>
                    <div className='recruiter-about-job-content'>
                        <div className="recruiter-about-job-details-container">
                            <div className="recruiter-about-job-location-container">
                                <PlaceIcon />
                                <h4>{job.location}</h4>
                            </div>
                            
                            <div className="recruiter-about-job-type-container">
                                <WorkIcon />
                                <h4 >{job.jobType}</h4> 
                            </div>

                            <div className="recruiter-about-job-regime-container">
                                <LaptopChromebook />
                                <h4 >{job.jobRegime}</h4>  
                            </div>

                            <div className="recruiter-about-job-salary-container">
                                <AttachMoneyIcon />
                                <h4>{job.salary} RON/month</h4>
                            </div>

                        </div>
                        <div className='recruiter-about-job-buttons-container'>
                            <Button endIcon={<EditIcon />} className='job-card-button-edit' onClick={() => editJob(job.id)}>Edit job</Button>
                            <Button endIcon={<DeleteIcon />} className='job-card-button-delete'  onClick={() => deleteJob(job.id)}>Delete job</Button>
                        </div> 
                        <div className='recruiter-about-job-text-container'>
                            <h3 className='recruiter-about-job-title-description'>About job</h3>
                            {job.jobDescription.split(/(?<=[.])\s*/).map((sentence, index) => (
                                <p key={index} className='recruiter-about-job-subtitle-description'>{sentence}</p>
                            ))}

                            <h3 className='recruiter-about-job-title-description'>Requirements</h3>
                            {job.jobRequirements.split(/(?<=[.;])\s*/).map((sentence, index) => (
                            <ul key={index} style={{ marginBottom: '10px', marginLeft:'20px' }}>
                                <li className='recruiter-about-job-subtitle-description'>{sentence}</li>
                            </ul>
                            ))}

                            <h3 className='recruiter-about-job-title-description'>Responsabilities</h3>
                            {job.jobResponsabilities.split(/(?<=[.;])\s*/).map((sentence, index) => (
                            <ul key={index} style={{ marginBottom: '10px', marginLeft:'20px' }}>
                                <li className='recruiter-about-job-subtitle-description'>{sentence}</li>
                            </ul>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className='recruiter-about-job-table'>
                    <div className='recruiter-about-job-table-text'>
                        <h2 className='recruiter-about-job-table-title'>Candidates list</h2>
                        <p className='recruiter-about-job-table-subtitle'>Here are the candidates for the current job! Browse to find the perfect fit for your team.</p>
                    </div>

                    <div className='recruiter-about-job-table-filter-search-container'>
                    <Autocomplete
                        id="recruiter-about-job-table-filter-search"
                        style={{ width: '100%' }}
                        freeSolo
                        options={filteredCandidates || []}
                        getOptionLabel={(option) => {
                            if (typeof option === 'string') {
                            return option;
                            }
                            return `${option.firstName} ${option.lastName}`;
                        }}
                        onInputChange={handleSearchChange}
                        renderInput={(params) => <TextField {...params} label="Search by candidate name" 
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
                    <TableContainer component={Paper} className='recruiter-about-job-table-container'>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                            <TableHead>
                            <TableRow>
                                <TableCell>Student Name</TableCell>
                                <TableCell align="right">Location</TableCell>
                                <TableCell align="right">Phone Number</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {filteredCandidates.map((candidate) => (
                                <TableRow
                                key={candidate.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {candidate.firstName} {candidate.lastName}
                                </TableCell>
                                <TableCell align="right">{candidate.placeToWork}</TableCell>
                                <TableCell align="right">{candidate.phoneNumber}</TableCell>
                                <TableCell align="right">
                                    <Button endIcon={<ContactMailIcon />} 
                                            className='recruiter-about-job-table-button-profile'
                                            onClick={()=>handleOpenDrawer(candidate)}>Details</Button>
                                    <Button endIcon={<SimCardDownloadIcon />}
                                            className='recruiter-about-job-table-button-download-cv'
                                            onClick={() => generateCV(candidate.studentId)}>Download CV</Button>
                                </TableCell>

                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer>
                        <div className='recruiter-about-job-table-drawer'>
                          <CandidateDrawerProfile
                            isOpen={isOpenDrawer}
                            onClose={() => setIsOpenDrawer(false)}
                            candidate={selectedCandidate}
                          />
                        </div>
                    <div className='alert-container'>
                      {showAlert  && <Alert severity="success" className='alert' onClose={() => setShowAlert(false)}>You've succesfully downloaded this candidate CV!</Alert>}
                    </div>
                </div>
                 
            )}
         
        </Paper>
    
    </div>
  )
}
