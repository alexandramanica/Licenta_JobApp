import React, { Component } from 'react'
import { useEffect,useState } from 'react'

import Sidebar from '../../../Components/Student/SidebarStudent/SidebarStudent.jsx'
import NavbarStudentMD from '../../../Components/Student/NavbarStudent/NavbarStudentMD.jsx'
import NavbarStudentXS from '../../../Components/Student/NavbarStudent/NavbarStudentXS.jsx'
import CardStudent from '../../../Components/Student/CardStudent/CardStudent.jsx'
import ModalStudentSchool from '../../../Components/Student/ModalStudentSchool/ModalStudentSchool.jsx'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import OutlinedInput from '@mui/material/OutlinedInput';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

import { refreshToken, axiosJWT, getUserDataFromToken } from '../tokenPrep.jsx';
import '../CVPage/CV.css'
import styles from '../CVPage/CV.css'


export default function CVpage(){
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [educationData, setEducationData] = React.useState([]);
  const [educationCardData, setEducationCardData] = React.useState([]);
  const [allEducationData, setAllEducationData] = React.useState([]);
  const [newStudentData,setNewStudentData] = React.useState({
    id: "",
    firstName:"",
    lastName:"",
    aboutStudent:"",
    placeToWork:"",
    phoneNumber:"",
  })

  React.useEffect(() => {
    console.log("Education Data uf", educationData);
  }, [educationData]);

  React.useEffect(() => {
    setAllEducationData([...educationCardData, ...educationData]);
  }, [educationData, educationCardData]);

  const handleInputChange = (event) => {
    setNewStudentData({
      ...newStudentData,
      [event.target.name]: event.target.value
    });
  };

  const saveData = async (newStudentSchool) => {
      console.log("New School Data", newStudentSchool);
      setEducationData([...educationData, newStudentSchool]);
      console.log("Education Data", educationData)
};

  const handleSave = async () => {
    try {
      let userId = getUserDataFromToken().userId;
      const token = localStorage.getItem('tokenAcces');
      
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }
  
      console.log('Token:', token);
  
      console.log("Education Data Handle Save", educationData)

      const response = await axiosJWT.post(
        `http://localhost:8001/api/student/upsert`,
        {
          studentId:userId,
          userId: userId,
          firstName: newStudentData.firstName,
          lastName: newStudentData.lastName,
          aboutStudent: newStudentData.aboutStudent,
          placeToWork: newStudentData.placeToWork,
          phoneNumber: newStudentData.phoneNumber
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
  
      console.log('Server Response:', response.data);
    
  const educationResponse = await axiosJWT.post(
      `http://localhost:8001/api/education`,
      {
        userId: userId,
        educationData: educationData
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

     console.log('Education Server Response:', educationResponse.data);
    

    } catch (err) {
      console.error('Error:', err);
    }
  };

  const deleteEducation = async (educationId) => {
    try {
      const token = localStorage.getItem('tokenAcces');
      console.log("Education Id delete", educationId)
      
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }
  
      const response = await axiosJWT.delete(
        `http://localhost:8001/api/education/delete/${educationId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
  
      console.log('Delete Response:', response.data);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setEducationData(prevEducationData => prevEducationData.filter(education => education.educationId !== educationId));
      setEducationCardData(prevEducationCardData => prevEducationCardData.filter(education => education.educationId !== educationId));
    } catch (err) {
      console.error('Error:', err);
    }
  };

  React.useEffect(() => {
    const fetchStudentData = async () => {
      try {
        let userId = getUserDataFromToken().userId;
        const token = localStorage.getItem('tokenAcces');
        
        if (!token) {
          console.error('Token not found in localStorage');
          return;
        }
    
        const response = await axiosJWT.get(
          `http://localhost:8001/api/student/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
    
        if (response.data) {
          setNewStudentData(prevState => ({
            ...prevState,
            id: response.data.id,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            aboutStudent: response.data.aboutStudent,
            placeToWork: response.data.placeToWork,
            phoneNumber: response.data.phoneNumber,
          }));
        }
      } catch (err) {
        console.error('Error:', err);
      }
    };
  
    fetchStudentData();
  }, []);

  React.useEffect(() => {
    const fetchEducationCardData = async () => {
      try {
        let userId = getUserDataFromToken().userId;
        console.log("User Id", userId)
        const token = localStorage.getItem('tokenAcces');
        
        if (!token) {
          console.error('Token not found in localStorage');
          return;
        }
    
        const response = await axiosJWT.get(
          `http://localhost:8001/api/education/studentId/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
    
        if (response.data) {
          console.log('Education Card Data:', response.data);
          setEducationCardData(response.data);
        }
      } catch (err) {
        console.error('Error:', err);
      }
    };
  
    fetchEducationCardData();
  }, []);
  
    return (
      <div  className="container-cv">
        <Sidebar />
        <NavbarStudentMD />
        <NavbarStudentXS />

        <div className="personal-details-container">
          <h3 className='personal-details-title'>Personal Details</h3>
          <div className="personal-details-input-name">
            <div id="personal-details-first-name-input">
              <h4 className="personal-details-input-title" >First Name</h4>
              <OutlinedInput placeholder="Alexandra" 
                              inputProps={{ 'aria-label': 'first-name','name':'firstName' }}
                              type="text" 
                              value={newStudentData.firstName} onChange={handleInputChange} 
                              className='personal-details-input'/>
            </div>

            <div id="personal-details-last-name-input" >
              <h4 className="personal-details-input-title">Last Name</h4>
              <OutlinedInput placeholder="Manica" 
                              inputProps={{ 'aria-label': 'last-name','name':'lastName' }}
                              type="text" 
                              value={newStudentData.lastName} onChange={handleInputChange}
                              className='personal-details-input'/>
            </div>
          </div>

            <div className='personal-details-input-container'>
              <h4 className="personal-details-input-title">About me</h4>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={8}
                maxRows={8}
                placeholder='Write a few words about yourself'
                inputProps={{ 'aria-label': 'aboutStudent','name':'aboutStudent' }}
                className='personal-details-input'
                value={newStudentData.aboutStudent} onChange={handleInputChange}
                style={{ height: "200px"}}
              />
            </div>

            <div className='personal-details-input-container'>
              <h4 className="personal-details-input-title">Where do you want to work?</h4>
              <OutlinedInput placeholder="Bucharest" 
                              inputProps={{ 'aria-label': 'location','name':'placeToWork' }}
                              type="text"
                              value={newStudentData.placeToWork} onChange={handleInputChange} 
                              className='personal-details-input' />
            </div>

            <div className='personal-details-input-container'>
              <h4 className="personal-details-input-title">Phone Number</h4>
              <OutlinedInput placeholder="0767412964" 
                              inputProps={{ 'aria-label': 'phone','name':'phoneNumber' }}
                              type="text" 
                              value={newStudentData.phoneNumber} onChange={handleInputChange}
                              className='personal-details-input' />
            </div>
          </div>

          <div className="education-container">
            <h3 className='education-title'>Education</h3>
            <Button startIcon={<AddBoxIcon />} className='education-add-button' onClick={handleOpen}> 
              Add Education
            </Button>
            {allEducationData.map((education, index) => (
            <CardStudent key={index} education={education} onDelete={() => {
              // Delete the education with the given ID
              deleteEducation(education.educationId);
            }} />
          ))}
          </div>

        <div>
          <ModalStudentSchool open={open} 
                              handleClose={handleClose}
                              saveData={saveData}/>
        </div>
            
        <Button  onClick={handleSave} className='btn-save-cv' endIcon={<TaskAltIcon />}>
            Save
        </Button>
      </div>
    )
}


