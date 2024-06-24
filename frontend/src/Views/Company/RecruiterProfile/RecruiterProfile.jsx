import React from 'react'
import { useState } from 'react';

import OutlinedInput from '@mui/material/OutlinedInput'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert';

import { refreshToken, axiosJWT, getUserDataFromToken } from '../../tokenPrep.jsx';
import SidebarCompany from '../../../Components/Company/SidebarCompany/SidebarCompany'
import './RecruiterProfile.css'

import TaskAltIcon from '@mui/icons-material/TaskAlt';

export default function RecruiterProfile() {
  const [newRecruiterData,setNewRecruiterData] = React.useState({
    recruiterId: "",
    recruiterFirstName:"",
    recruiterLastName:"",
    companyName:"",
    aboutCompany:"",
    location:"",
    phoneNumber:"",
  });

  
  const [error, setError] = useState('')
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertSucces, setShowAlertSucces] = useState(false);

  const handleInputChange = (event) => {
    setNewRecruiterData({
      ...newRecruiterData,
      [event.target.name]: event.target.value});
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      let validationError = '';

      if(!newRecruiterData.recruiterFirstName.trim()||!newRecruiterData.recruiterLastName.trim()||!newRecruiterData.companyName.trim()
      ||!newRecruiterData.aboutCompany.trim()||!newRecruiterData.location.trim()||!newRecruiterData.phoneNumber.trim()){
        validationError = "All fields are required. Please make sure to enter all the fields.";
      }
      setError(validationError);
      setShowAlert(true);

      let userId = getUserDataFromToken().userId;
      const token = localStorage.getItem('tokenAcces');
      
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }
  
      console.log('Token:', token);
      if(validationError === '') {
        const response = await axiosJWT.post(
          `http://localhost:8001/api/recruiter/upsert`,
          {
            userId:userId,
            recruiterId: userId,
            recruiterFirstName:newRecruiterData.recruiterFirstName,
            recruiterLastName:newRecruiterData.recruiterLastName,
            companyName:newRecruiterData.companyName,
            aboutCompany:newRecruiterData.aboutCompany,
            location:newRecruiterData.location,
            phoneNumber:newRecruiterData.phoneNumber
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        console.log('Server Response:', response.data);
        setShowAlertSucces(true);
      }
    } catch (err) {
      console.error(`Error! ${err}`);
      setShowAlert(true);
    } 
  };

  
  React.useEffect(() => {
    const fetchRecruiterData = async () => {
      try {
        let userId = getUserDataFromToken().userId;
        const token = localStorage.getItem('tokenAcces');
        
        if (!token) {
          console.error('Token not found in localStorage');
          return;
        }
    
        const response = await axiosJWT.get(
          `http://localhost:8001/api/recruiter/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
    
        if (response.data) {
          setNewRecruiterData(prevState => ({
            ...prevState,
            recruiterId: response.data.recruiterId,
            recruiterFirstName:response.data.recruiterFirstName,
            recruiterLastName:response.data.recruiterLastName,
            companyName:response.data.companyName,
            aboutCompany:response.data.aboutCompany,
            location:response.data.location,
            phoneNumber:response.data.phoneNumber
          }));   

        }
      } catch (err) {
        console.error('Error:', err);
      }
    };
  
    fetchRecruiterData();
  }, []);
  return (
    <div className='container-recruiter-profile'>
      <SidebarCompany />

      <div className="personal-details-recruiter-container">
          <h3 className='personal-details-recruiter-title'>My Profile</h3>
          <p className='personal-details-recruiter-subtitle'>This profile page is your professional showcase. Here, you can manage your personal details and company information 🏢. Keep your profile up-to-date to ensure potential candidates get the best impression of you and your company. Remember, a well-crafted profile can be a powerful tool in attracting top talent.</p>
          <div className="personal-details-recruiter-input-name">
            <div id="personal-details-recruiter-first-name-input">
              <h4 className="personal-details-recruiter-input-title" >First Name</h4>
              <OutlinedInput placeholder="ex: Alexandra" 
                              inputProps={{ 'aria-label': 'first-name','name':'recruiterFirstName' }}
                              type="text" 
                              value={newRecruiterData.recruiterFirstName} onChange={handleInputChange} 
                              className='personal-details-recruiter-input'/>
            </div>

            <div id="personal-details-recruiter-last-name-input" >
              <h4 className="personal-details-recruiter-input-title">Last Name</h4>
              <OutlinedInput placeholder="ex: Mănica" 
                              inputProps={{ 'aria-label': 'last-name','name':'recruiterLastName' }}
                              type="text" 
                              value={newRecruiterData.recruiterLastName} onChange={handleInputChange}
                              className='personal-details-recruiter-input'/>
            </div>
          </div>

          <div className='personal-details-recruiter-input-container'>
              <h4 className="personal-details-recruiter-input-title">Company Name</h4>
              <OutlinedInput placeholder="ex: Microsoft" 
                              inputProps={{ 'aria-label': 'companyName','name':'companyName' }}
                              type="text" 
                              value={newRecruiterData.companyName} onChange={handleInputChange}
                              className='personal-details-recruiter-input' />
          </div>

            <div className='personal-details-recruiter-input-container'>
              <h4 className="personal-details-recruiter-input-title">About company</h4>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={8}
                maxRows={8}
                placeholder='Write a few words about the company you represent.'
                inputProps={{ 'aria-label': 'aboutCompany','name':'aboutCompany' }}
                className='personal-details-recruiter-input'
                value={newRecruiterData.aboutCompany} onChange={handleInputChange}
                style={{ height: "200px"}}
              />
            </div>

            <div className='personal-details-recruiter-input-container'>
              <h4 className="personal-details-recruiter-input-title">Location</h4>
              <OutlinedInput placeholder="ex: Bucharest" 
                              inputProps={{ 'aria-label': 'location','name':'location' }}
                              type="text"
                              value={newRecruiterData.location} onChange={handleInputChange} 
                              className='personal-details-recruiter-input' />
            </div>

            <div className='personal-details-recruiter-input-container'>
              <h4 className="personal-details-recruiter-input-title">Phone Number</h4>
              <OutlinedInput placeholder="ex: 0767412964" 
                              inputProps={{ 'aria-label': 'phone','name':'phoneNumber' }}
                              type="text" 
                              value={newRecruiterData.phoneNumber} onChange={handleInputChange}
                              className='personal-details-recruiter-input' />
            </div>
          </div>

          <Button className='btn-save-profile' onClick={handleSave} endIcon={<TaskAltIcon />}>
            Save
          </Button>
    
          <div className="personal-details-recruiter-alert-container">
            {showAlert && <Alert severity="warning" className='alert' onClose={() => setShowAlert(false)}>{error}</Alert>}
            {showAlertSucces && <Alert severity="success" className='alert' onClose={() => setShowAlertSucces(false)}>You succesfully updated your profile details!</Alert>}
          </div>
    </div>
  )
}
