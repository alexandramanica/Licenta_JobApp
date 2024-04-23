import React, { Component } from 'react'
import { useEffect,useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

import Sidebar from '../../../Components/Student/SidebarStudent/SidebarStudent.jsx'
import NavbarStudentMD from '../../../Components/Student/NavbarStudent/NavbarStudentMD.jsx'
import NavbarStudentXS from '../../../Components/Student/NavbarStudent/NavbarStudentXS.jsx'

import CardStudentEducation from '../../../Components/Student/CVCards/CardStudent/CardStudent.jsx'
import CardStudentExperience from '../../../Components/Student/CVCards/CardStudentExperience/CardStudentExperience.jsx'
import CardStudentLanguage from '../../../Components/Student/CVCards/CardStudentLanguage/CardStudentLanguage.jsx'

import ModalStudentSchool from '../../../Components/Student/ModalCV/ModalStudentSchool/ModalStudentSchool.jsx'
import ModalStudentExperience from '../../../Components/Student/ModalCV/ModalStudentExperience/ModalStudentExperience.jsx'
import ModalStudentLanguage from '../../../Components/Student/ModalCV/ModalStudentLanguage/ModalStudentLanguage.jsx'

import { refreshToken, axiosJWT, getUserDataFromToken } from '../../tokenPrep.jsx';
import '../CVPage/CV.css'

export default function CVpage(){
  const [openModalExperience, setOpenModalExperience] = React.useState(false);
  const [openModalEducation, setOpenModalEducation] = React.useState(false);
  const [openModalLanguage, setOpenModalLanguage] = React.useState(false);

  const handleOpenModalEducation = () => setOpenModalEducation(true);
  const handleCloseModalEducation = () => setOpenModalEducation(false);
  const handleOpenModalExperience = () => setOpenModalExperience(true);
  const handleCloseModalExperience = () => setOpenModalExperience(false);
  const handleOpenModalLanguage = () => setOpenModalLanguage(true);
  const handleCloseModalLanguage = () => setOpenModalLanguage(false);

  const [newStudentData,setNewStudentData] = React.useState({
    id: "",
    firstName:"",
    lastName:"",
    aboutStudent:"",
    placeToWork:"",
    phoneNumber:"",
  });

  const [educationData, setEducationData] = React.useState([]);
  const [educationCardData, setEducationCardData] = React.useState([]);
  const [allEducationData, setAllEducationData] = React.useState([]);

  const [experienceData, setExperienceData] = React.useState([]);
  const [experienceCardData, setExperienceCardData] = React.useState([]);
  const [allExperienceData, setAllExperienceData] = React.useState([]);

  const [languageData, setLanguageData] = React.useState([]);
  const [languageCardData, setLanguageCardData] = React.useState([]);
  const [allLanguageData, setAllLanguageData] = React.useState([]);

  React.useEffect(() => {
    console.log("Education Data uf", educationData);
    console.log("Experience Data uf", experienceData);
    console.log("Language Data uf", languageData);
}, [educationData, experienceData, languageData]);

  React.useEffect(() => {
    setAllEducationData([...educationCardData, ...educationData]);
    setAllExperienceData([...experienceCardData, ...experienceData]);
    setAllLanguageData([...languageCardData, ...languageData]);
  }, [educationData, educationCardData, experienceData, experienceCardData, languageData, languageCardData]);

  const handleInputChange = (event) => {
    setNewStudentData({
      ...newStudentData,
      [event.target.name]: event.target.value});
  };

  const saveDataEducation = async (newStudentSchool) => {
    try{
      console.log("New School Data", newStudentSchool);
      setEducationData([...educationData, newStudentSchool]);
      console.log("Education Data", experienceCardData)}
      catch(error){
        console.error('Error:', error);
      }
};

const saveDataLanguage = async (newStudentLanguage) => {
  try{
    console.log("New School Data", newStudentLanguage);
    setLanguageData([...languageData, newStudentLanguage]);
    console.log("Language Data", languageCardData)}
    catch(error){
      console.error('Error:', error);
    }
};

const saveDataExperience = async (newStudentExperience) => {
  try{
    console.log("New School Data", newStudentExperience);
    setExperienceData([...experienceData, newStudentExperience]);
    console.log("Experience Data", experienceCardData)}
    catch(error){
      console.error('Error:', error);
    }
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
    
      console.log("Education Data Length:", educationData.length);   
   if (educationData.length !== 0) {
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
    }

    if(experienceData.length !== 0 ){   
     const experienceResponse = await axiosJWT.post(
      `http://localhost:8001/api/experience`,
      {
        userId: userId,
        experienceData:experienceData
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
     console.log('Experience Server Response:', experienceResponse.data);
    }

    if(languageData.length !== 0 ){
     const languageResponse = await axiosJWT.post(
      `http://localhost:8001/api/language`,
      {
        userId: userId,
        languageData: languageData
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
     console.log('Language Server Response:', languageData.data);
    }

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
    try {
      let userId = getUserDataFromToken().userId;
        console.log("User Id", userId)
        const token = localStorage.getItem('tokenAcces');
        
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }

      const fetchEducationCardData = async () => {
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
      }

      const fetchExperienceCardData = async () => {
        const response = await axiosJWT.get(
          `http://localhost:8001/api/experience/studentId/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
    
        if (response.data) {
          console.log('Experience Card Data:', response.data);
          setExperienceCardData(response.data);
        }
      }

      const fetchLanguageCardData = async () => {
        const response = await axiosJWT.get(
          `http://localhost:8001/api/language/studentId/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
    
        if (response.data) {
          console.log('Language Card Data:', response.data);
          setLanguageCardData(response.data);
        }
      }
      fetchEducationCardData(); 
      fetchExperienceCardData();
      fetchLanguageCardData();
    }
    catch (err) {
      console.error('Error:', err);
    };
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
            <Button startIcon={<AddBoxIcon />} className='education-add-button' onClick={handleOpenModalEducation}> 
              Add Education
            </Button>
            {allEducationData.map((education, index) => (
            <CardStudentEducation key={index} education={education} onDelete={() => {
              // Delete the education with the given ID
              deleteEducation(education.educationId);
            }} />
          ))}
          </div>

          <div className="experience-container">
            <h3 className='experience-title'>Experience</h3>
            <Button startIcon={<AddBoxIcon />} className='experience-add-button' onClick={handleOpenModalExperience}> 
              Add Experience
            </Button>
            {allExperienceData.map((experience, index) => (
            <CardStudentExperience key={index} experience={experience} 
            //onDelete={() => {deleteEducation(education.educationId);}} 
            />
          ))}
          </div>

          <div className="language-container">
            <h3 className='language-title'>Language</h3>
            <Button startIcon={<AddBoxIcon />} className='language-add-button' onClick={handleOpenModalLanguage}> 
              Add Language
            </Button>
            {allLanguageData.map((language, index) => (
            <CardStudentLanguage key={index} language={language} 
           // onDelete={() => {deleteEducation(education.educationId);}}
             />
          ))}
          </div>

        <div>
          <ModalStudentSchool open={openModalEducation} 
                              handleClose={handleCloseModalEducation}
                              saveData={saveDataEducation}/>
          <ModalStudentExperience open={openModalExperience} 
                                  handleClose={handleCloseModalExperience}
                                  saveData={saveDataExperience}/>
          <ModalStudentLanguage open={openModalLanguage} 
                                handleClose={handleCloseModalLanguage}
                                saveData={saveDataLanguage}/>
        </div>
            
        <Button  onClick={handleSave} className='btn-save-cv' endIcon={<TaskAltIcon />}>
            Save
        </Button>
      </div>
    )
}


