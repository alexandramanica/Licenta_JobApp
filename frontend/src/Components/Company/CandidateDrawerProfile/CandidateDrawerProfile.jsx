import React from 'react'
import { useState } from 'react';
import Drawer from '@mui/material/Drawer';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';

import './CandidateDrawerProfile.css';
import { getUserDataFromToken,axiosJWT } from '../../../Views/tokenPrep.jsx';

export default function CandidateDrawerProfile({candidate,isOpen,onClose}) {
  const [user,setUser] = useState(null);
  const [educations, setEducations] = useState([])
  const [experiences, setExperiences] = useState([])
  const [languages, setLanguages] = useState([]);

React.useEffect(() => {

    if (!candidate) {
        console.log('No candidate selected');
        return;
      }

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('tokenAcces'); 
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }

      
      const responseUser = await axiosJWT.get(
        `http://localhost:8001/api/users/${candidate.studentId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const response = await axiosJWT.get(
        `http://localhost:8001/api/users/${candidate.studentId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const responseEducation = await axiosJWT.get(
          `http://localhost:8001/api/education/studentId/${candidate.studentId}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
    
      const responseExperience = await axiosJWT.get(
      `http://localhost:8001/api/experience/studentId/${candidate.studentId}`,
      {
          headers: { Authorization: `Bearer ${token}` }
      }
      );

      const responseLanguage = await axiosJWT.get(
          `http://localhost:8001/api/language/studentId/${candidate.studentId}`,
          {
              headers: { Authorization: `Bearer ${token}` }
          }
      );

      if (response.data) {
        console.log('User Recruiter Card Data:', response.data);
        setUser(response.data);
        console.log("User",user);
      }

      if(responseUser.data){
            console.log('User Recruiter Card Data:', responseUser.data);
            setUser(responseUser.data);
            console.log("User",user);
      }

      if (responseEducation.data) {
          setEducations(responseEducation.data);
      }

      if (responseExperience.data) {
          setExperiences(responseExperience.data);
      }

      if (responseLanguage.data) {
          setLanguages(responseLanguage.data);
      }


    } catch (error) {
      console.log('error', error);
    }
  };

  fetchData();
}, [candidate]);

if (!candidate) {
    console.log('No candidate selected');
    return;
  }

  return (
    <div>
        <Drawer className='recruiter-about-candidate-drawer'
                anchor='right'
                open={isOpen}
                onClose={onClose}
                PaperProps={{ 
                        style: {
                            width: '45%', 
                            overflowY: 'auto',
                            height: '100vh',
                        },
                }}>
          
            <div className='recruiter-about-candidate-drawer-container'>
                <h2 className='recruiter-about-candidate-drawer-name'>{candidate.firstName} {candidate.lastName}</h2>
                <div className='recruiter-about-candidate-drawer-container-location'>
                    <LocationOnIcon />
                    <p className='recruiter-about-candidate-drawer-location'>{candidate.placeToWork}</p>
                </div>
                <div className='recruiter-about-candidate-drawer-contact-info'>
                    <div className='recruiter-about-candidate-drawer-container-email'>
                        <EmailIcon />
                        <h5 className='recruiter-about-candidate-drawer-email'>{user && user.email}</h5>
                    </div>
                    <div className='recruiter-about-candidate-drawer-container-telephone'>
                        <CallIcon />
                        <h5 className='recruiter-about-candidate-drawer-telephone'>{candidate.phoneNumber}</h5>
                    </div>
                </div>
                <h3 className='recruiter-about-candidate-drawer-about-title'>About candidate</h3>
                <p className='recruiter-about-candidate-drawer-about'>{candidate.aboutStudent}</p>
                <div className='recruiter-about-candidate-drawer-education-container'>
                    <h3 className='recruiter-about-candidate-drawer-about-title'>Education</h3>
                        {educations.map((education, index) => {
                            const startDate = new Date(education.startYear);
                            const formattedStartDate = startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                            
                            const endDate = new Date(education.endYear);
                            const formattedEndDate = endDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

                            return (
                                <div key={index} className='recruiter-about-candidate-drawer-education-info-container'>
                                    <p>{formattedStartDate} - {formattedEndDate}</p>
                                    <ul>
                                    <li className='recruiter-about-candidate-drawer-education-info-container-title'>{education.institutionName}</li>
                                    </ul>
                                    <div className='recruiter-about-candidate-drawer-education-info-container-details'>
                                        <p>Field of study: {education.fieldOfStudy}</p>
                                        <p>Degree: {education.degreeType}</p>
                                    </div>
                                </div>
                            );
                        })}
                </div>

                <div className='recruiter-about-candidate-drawer-experience-container'>
                    <h3 className='recruiter-about-candidate-drawer-about-title'>Experience</h3>
                        {experiences.map((experience, index) => {
                            console.log("Experience",experience);
                            const startDate = new Date(experience.startYear);
                            const formattedStartDate = startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                            
                            const endDate = new Date(experience.endYear);
                            const formattedEndDate = endDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

                            return (
                                <div key={index} className='recruiter-about-candidate-drawer-experience-info-container'>
                                    <p>{formattedStartDate} - {formattedEndDate}</p>
                                    <ul>
                                    <li className='recruiter-about-candidate-drawer-experience-info-container-title'>{experience.positionTitle}</li>
                                    </ul>
                                        <p className='recruiter-about-candidate-drawer-experience-info-container-companyName'>{experience.companyName}</p>
                                    <p>{experience.experienceDescription}</p>
                                </div>
                            );
                        })}
                </div>

                <div className='recruiter-about-candidate-drawer-language-container'>
                    <h3 className='recruiter-about-candidate-drawer-about-title'>Languages</h3>
                    {languages.map((language, index) => (
                        <div key={index} className='recruiter-about-candidate-drawer-language-info-container'>
                            <ul>
                            <li className='recruiter-about-candidate-drawer-language-info-container-title'>{language.languageName}</li>
                            </ul>
                            <p className='recruiter-about-candidate-drawer-language-info-container-proficiency'>{language.proficiencyLevel}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Drawer>
    </div>
  )
}
