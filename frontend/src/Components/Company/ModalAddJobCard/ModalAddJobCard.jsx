import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import CheckIcon from '@mui/icons-material/Check';
import Alert from '@mui/material/Alert';
import { useState } from 'react';

import { axiosJWT, getUserDataFromToken } from '../../../Views/tokenPrep'
import './ModalAddJobCard.css';

export default function ModalAddJobCard({ open, handleClose, editingJob, editJob, setJobsCards}) {

  const [error, setError] = useState('')
  const [showAlert, setShowAlert] = useState(false);
  const [newRecruiterJob, setNewRecruiterJob] = React.useState({
    jobTitle: '',
    jobDescription: '',
    jobRequirements:'',
    jobType: '',
    jobRegime:'',
    jobResponsabilities:'',
    location: '',
    salary: '',
    jobDate:''
  });

  React.useEffect(() => {
    setNewRecruiterJob({
      jobTitle: editingJob ? editingJob.jobTitle : '',
      jobDescription: editingJob ? editingJob.jobDescription : '',
      jobType: editingJob ? editingJob.jobType : '',
      location: editingJob ? editingJob.location : '',
      salary: editingJob ? editingJob.salary : '',
      jobRegime: editingJob ? editingJob.jobRegime : '',
      jobRequirements: editingJob ? editingJob.jobRequirements : '',
      jobResponsabilities: editingJob ? editingJob.jobResponsabilities : '',
      jobDate: editingJob ? editingJob.jobDate : ''
    });
  }, [editingJob]);

  const handleInputChange = (event) => {
    setNewRecruiterJob({
      ...newRecruiterJob,
      [event.target.name]: event.target.value
    });
  };

  const handleSave = async () => {
    try {
      let userId = getUserDataFromToken().userId;
      const token = localStorage.getItem('tokenAcces');
  
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }
  
      if (!newRecruiterJob.jobTitle || !newRecruiterJob.jobDescription || !newRecruiterJob.jobType || !newRecruiterJob.location || !newRecruiterJob.salary) {
        setShowAlert(true);
        setError('All fields are required.');
        setTimeout(() => setShowAlert(false), 10000);
        return;
      }

      
  
      const jobData = {
        recruiterId: userId,
        jobTitle: newRecruiterJob.jobTitle,
        jobDescription: newRecruiterJob.jobDescription,
        jobRequirements: newRecruiterJob.jobRequirements,
        jobResponsabilities: newRecruiterJob.jobResponsabilities,
        jobType: newRecruiterJob.jobType,
        jobRegime: newRecruiterJob.jobRegime,
        location: newRecruiterJob.location,
        salary: newRecruiterJob.salary,
        jobDate: newRecruiterJob.jobDate

      };
      console.log('Job data', jobData);
  
      if (editingJob) {
        await axiosJWT.put(`http://localhost:8001/api/job/update/${editingJob.jobId}`, jobData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        jobData.jobDate = formattedDate;

        await axiosJWT.post(`http://localhost:8001/api/job`, jobData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      handleClose();
    } catch (error) {
      console.error('Error in handleSave', error);
    }
  };

  return (
    <div>
      <div>
        <Modal
            onClose={handleClose}
            open={open}
            className='modal-recruiter-job'>     
              <Box >
              <h3 className="modal-add-job-title">{editingJob ? 'Edit job' : 'Add a new job'}</h3>
              <h4 className='modal-add-job-advice'>{editingJob ? 'Edit your job here' : 'Add a new job here'}</h4>
                  <div className="add-job-container">
                      <div className='input-add-job-div'>
                          <h4 className="input-add-job-title">Company Name</h4>                   
                          <OutlinedInput placeholder="Software developper" 
                                      inputProps={{ 'aria-label': 'position', 'name': 'jobTitle' }}
                                      type="text" 
                                      value={newRecruiterJob.jobTitle} onChange={handleInputChange} 
                                      className='input-add-job' />
                      </div>  
                      
                      <div className='input-add-job-div'>
                          <h4 className="input-add-job-title">Job regime</h4>
                          <TextField
                            select
                            placeholder="**************"
                            inputProps={{ 'aria-label': 'job', 'name': 'jobRegime' }}
                            value={newRecruiterJob.jobRegime} onChange={handleInputChange}
                            className='input-add-job'
                          >
                            <MenuItem value={'Remote'}>Remote</MenuItem>
                            <MenuItem value={'On-Site'}>On-Site</MenuItem>
                            <MenuItem value={'Hybrid'}>Hybrid</MenuItem>
                          </TextField>

                          <h4 className="input-add-job-title">Type of job</h4>
                          <TextField
                            select
                            placeholder="**************"
                            inputProps={{ 'aria-label': 'job', 'name': 'jobType' }}
                            value={newRecruiterJob.jobType} onChange={handleInputChange}
                            className='input-add-job'
                          >
                            <MenuItem value={'Full-Time'}>Full-Time</MenuItem>
                            <MenuItem value={'Part-Time'}>Part-Time</MenuItem>
                            <MenuItem value={'Internship'}>Internship</MenuItem>
                          </TextField>
                      </div>
                      
                      <div className='input-add-job-div'>
                          <h4 className="input-add-job-title">About this role</h4>
                          <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows={8}
                            maxRows={8}
                            placeholder='Write a few words about your experience'
                            inputProps={{ 'aria-label': 'job','name':'jobDescription' }}
                            className='input-add-job'
                            value={newRecruiterJob.jobDescription} onChange={handleInputChange}
                            style={{ maxHeight: "100px",minHeight:"100px", overflowY: "auto"}}
                          /> 
                      </div>
                      <div className='input-add-job-div'>
                          <h4 className="input-add-job-title">Responsabilities</h4>
                          <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows={8}
                            maxRows={8}
                            placeholder='Write a few words about the job responsabilities'
                            inputProps={{ 'aria-label': 'job','name':'jobResponsabilities' }}
                            className='input-add-job'
                            value={newRecruiterJob.jobResponsabilities} onChange={handleInputChange}
                            style={{ maxHeight: "100px",minHeight:"100px", overflowY: "auto"}}
                          /> 
                      </div>
                      <div className='input-add-job-div'>
                          <h4 className="input-add-job-title">Requirements</h4>
                          <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows={8}
                            maxRows={8}
                            placeholder='Write a few words about your requirements'
                            inputProps={{ 'aria-label': 'job','name':'jobRequirements' }}
                            className='input-add-job'
                            value={newRecruiterJob.jobRequirements} onChange={handleInputChange}
                            style={{ maxHeight: "100px",minHeight:"100px", overflowY: "auto"}}
                          /> 
                      </div>
                      <div className='input-add-job-div'>
                          <h4 className="input-add-job-title">Job Location</h4>                   
                          <OutlinedInput placeholder="Bucharest" 
                                      inputProps={{ 'aria-label': 'job', 'name': 'location' }}
                                      type="text" 
                                      value={newRecruiterJob.location} onChange={handleInputChange} 
                                      className='input-add-job' />
                      </div>      
                      <div className='input-add-job-div'>
                          <h4 className="input-add-job-title">Salary</h4>                   
                          <OutlinedInput placeholder="5000 RON" 
                                      inputProps={{ 'aria-label': 'job', 'name': 'salary' }}
                                      type="text" 
                                      value={newRecruiterJob.salary} onChange={handleInputChange}
                                      className='input-add-job' />
                      </div>  
                </div>
                <div className='button-add-job-div'>
                <Button className='btn-save-add-job'
                  onClick={handleSave}
                  sx={{ backgroundColor: '#C7EF00',
                        color: 'black',
                        height: '40px',
                        marginLeft:'50px',
                        '&:hover': {
                          backgroundColor: '#AE85FF',
                        }
                  }}>
                  <span style={{ margin: 'auto' }}>Save</span>
                  <CheckIcon style={{ marginLeft: '5px' }}/>
                </Button>
                </div>
                <div>
                  {showAlert && <Alert severity="warning" className='alert' onClose={() => setShowAlert(false)}>{error}</Alert>}
                </div> 
              </Box>
        </Modal>
      </div>
         
    </div>
  )
}
