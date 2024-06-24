import React, { Component } from 'react'
import { useEffect,useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Drawer from '@mui/material/Drawer';

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
  //api
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [generatedText, setGeneratedText] = useState('');

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

  const deleteExperience = async (experienceId) => {
    try {
      const token = localStorage.getItem('tokenAcces');
      console.log("Experience Id delete", experienceId);

      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }

      const response = await axiosJWT.delete(
        `http://localhost:8001/api/experience/delete/${experienceId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log('Delete Response:', response.data);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setExperienceData((prevExperienceData) =>
        prevExperienceData.filter((experience) => experience.experienceId !== experienceId)
      );
      setExperienceCardData((prevExperienceCardData) =>
        prevExperienceCardData.filter((experience) => experience.experienceId !== experienceId)
      );
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const deleteLanguage = async (languageId) => {
    try {
      const token = localStorage.getItem('tokenAcces');
      console.log("Language Id delete", languageId);

      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }

      const response = await axiosJWT.delete(
        `http://localhost:8001/api/language/delete/${languageId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log('Delete Response:', response.data);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setLanguageData((prevLanguageData) =>
        prevLanguageData.filter((language) => language.languageId !== languageId)
      );
      setLanguageCardData((prevLanguageCardData) =>
        prevLanguageCardData.filter((language) => language.languageId !== languageId)
      );
    } catch (err) {
      console.error('Error:', err);
    }
  };

  //api
  const fetchGeneratedText = async () => {
    try {
      let userId = getUserDataFromToken().userId;
      const token = localStorage.getItem('tokenAcces');
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }
      const response = await axiosJWT.get(`http://localhost:8001/api/student/analyze-cv/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGeneratedText(response.data.analysis);
      console.log(response.data.analysis);
      console.log(generatedText);
      setDrawerOpen(true);
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

        <div className="personal-details-container">
          <h3 className='personal-details-title'>My CV</h3>
          <h3 className='personal-details-subtitle'>Welcome to your CV page! Here, you can add and showcase your professional journey, skills, and achievements. ✨</h3>
            <h4 className='personal-details-container-personal-analysis-title'>Personal Analysis</h4>
            <h5 className='personal-details-container-personal-analysis-subtitle'>Have You Finished Completing Your CV? 📄</h5>
            <p className='personal-details-container-personal-analysis-text'>If you have finished updating and refining your CV, it’s time to take the next step! Let our advanced AI assistant 🤖 analyze your resume for a comprehensive review.<br/> Our AI-powered analysis will identify key strengths, suggest improvements, and help you better highlight your skills and achievements.</p>
            <Button className='personal-details-container-personal-analysis-button' onClick={fetchGeneratedText} endIcon={<AssignmentIndIcon />}>
              Generate CV Analysis
            </Button>
          
          
          
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
            onDelete={() => {deleteExperience(experience.experienceId);}} 
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
              onDelete={() => {deleteLanguage(language.languageId);}}
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

        <Drawer anchor='right' open={drawerOpen} onClose={() => setDrawerOpen(false)}
          PaperProps={{ 
            style: {
                width: '40%', 
                overflowY: 'auto',
                height: '100vh',
            },}}>
          <div className='drawer-student-cv-container-text-generated'>
            <h2 className='drawer-student-text-title'>Personal CV Analysis</h2>
            <h5 className='drawer-student-text-subtitle'>Unlock the potential of your career with our personalized CV analysis! <br/> Our AI assistant 🤖, will review your resume to identify strengths, areas for improvement, and opportunities to better showcase your skills and achievements🌟.<br/> Whether you're a recent graduate 🎓 or still a student 📚, we provide tailored feedback to help you stand out in a competitive job market. Let us help you create a CV that not only captures your unique value but also gets you noticed by employers!🔍</h5>
            <h3 className='drawer-student-text-tile-result'>Your result:</h3>
            <Typography variant="body1" style={{ whiteSpace: 'pre-line', fontFamily:'Montserrat',fontWeight:'350', fontSize:'1em' }}>{generatedText}</Typography>
          </div>
      </Drawer>
      </div>
    )
}


