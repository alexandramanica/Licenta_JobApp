import React from 'react'
import Paper from '@mui/material/Paper';
import  Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import  IconButton  from '@mui/material/IconButton';

import{ useState } from 'react';
import { getUserDataFromToken,axiosJWT } from '../../../Views/tokenPrep.jsx';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/Work';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';

import './CandidateCardAbout.css';

export default function CandidateCardAbout({student,showMoreCandidate}) {
   const [user,setUser] = useState(null);
   const [educations, setEducations] = useState([])
   const [experiences, setExperiences] = useState([])
   const [languages, setLanguages] = useState([]);
   const [showAlert, setShowAlert] = useState(false);

   React.useEffect(() => {
    if (!student) {
      console.log('No student selected');
      return;
    }
  
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('tokenAcces'); 
        if (!token) {
          console.error('Token not found in localStorage');
          return;
        }
  
        const response = await axiosJWT.get(
          `http://localhost:8001/api/users/${student.studentId}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        const responseEducation = await axiosJWT.get(
            `http://localhost:8001/api/education/studentId/${student.studentId}`,
            {
              headers: { Authorization: `Bearer ${token}` }
            }
          );
      
        const responseExperience = await axiosJWT.get(
        `http://localhost:8001/api/experience/studentId/${student.studentId}`,
        {
            headers: { Authorization: `Bearer ${token}` }
        }
        );

        const responseLanguage = await axiosJWT.get(
            `http://localhost:8001/api/language/studentId/${student.studentId}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );

        if (response.data) {
          console.log('User Recruiter Card Data:', response.data);
          setUser(response.data);
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
  }, [student]);

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
  
  React.useEffect(() => {
    console.log("User", user);
  }, [user]);

  if (!student) {
    return (
            <div>Please select a job to see the details.</div>);
    }

  return (
    <div className='recruiter-about-candidate'>
        <Paper className='recruiter-about-candidate-paper' elevation={3}>
            <div className='recruiter-about-candidate-container'>
                <h2 className='recruiter-about-candidate-name'>{student.firstName} {student.lastName}</h2>
                <div className='recruiter-about-candidate-container-location'>
                    <LocationOnIcon />
                    <p className='recruiter-about-candidate-location'>{student.placeToWork}</p>
                </div>
                <div className='recruiter-about-candidate-contact-info'>
                    <div className='recruiter-about-candidate-container-email'>
                        <EmailIcon />
                        <h5 className='recruiter-about-candidate-email'>{user && user.email}</h5>
                    </div>
                    <div className='recruiter-about-candidate-container-telephone'>
                        <CallIcon />
                        <h5 className='recruiter-about-candidate-telephone'>{student.phoneNumber}</h5>
                    </div>
                 </div>
                 <Button className='recruiter-about-candidate-download-cv' endIcon={<SimCardDownloadIcon/>}  onClick={() => generateCV(student.studentId)}>Download CV</Button>
                <h3 className='recruiter-about-candidate-about-title'>About candidate</h3>
                <p className='recruiter-about-candidate-about'>{student.aboutStudent}</p>
                <div className='recruiter-about-candidate-education-container'>
                    <h3 className='recruiter-about-candidate-about-title'>Education</h3>
                        {educations.map((education, index) => {
                            const startDate = new Date(education.startYear);
                            const formattedStartDate = startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                            
                            const endDate = new Date(education.endYear);
                            const formattedEndDate = endDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

                            return (
                                <div key={index} className='recruiter-about-candidate-education-info-container'>
                                    <p>{formattedStartDate} - {formattedEndDate}</p>
                                    <ul>
                                    <li className='recruiter-about-candidate-education-info-container-title'>{education.institutionName}</li>
                                    </ul>
                                    <div className='recruiter-about-candidate-education-info-container-details'>
                                        <p>Field of study: {education.fieldOfStudy}</p>
                                        <p>Degree: {education.degreeType}</p>
                                    </div>
                                </div>
                            );
                        })}
                </div>

                <div className='recruiter-about-candidate-experience-container'>
                    <h3 className='recruiter-about-candidate-about-title'>Experience</h3>
                        {experiences.map((experience, index) => {
                            console.log("Experience",experience);
                            const startDate = new Date(experience.startYear);
                            const formattedStartDate = startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                            
                            const endDate = new Date(experience.endYear);
                            const formattedEndDate = endDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

                            return (
                                <div key={index} className='recruiter-about-candidate-experience-info-container'>
                                    <p>{formattedStartDate} - {formattedEndDate}</p>
                                    <ul>
                                    <li className='recruiter-about-candidate-experience-info-container-title'>{experience.positionTitle}</li>
                                    </ul>
                                        <p className='recruiter-about-candidate-experience-info-container-companyName'>{experience.companyName}</p>
                                    <p>{experience.experienceDescription}</p>
                                </div>
                            );
                        })}
                </div>

                <div className='recruiter-about-candidate-language-container'>
                    <h3 className='recruiter-about-candidate-about-title'>Languages</h3>
                    {languages.map((language, index) => (
                        <div key={index} className='recruiter-about-candidate-language-info-container'>
                            <ul>
                            <li className='recruiter-about-candidate-language-info-container-title'>{language.languageName}</li>
                            </ul>
                            <p className='recruiter-about-candidate-language-info-container-proficiency'>{language.proficiencyLevel}</p>
                        </div>
                    ))}
                </div>
                <div className='alert-container'>
                  {showAlert  && <Alert severity="success" className='alert' onClose={() => setShowAlert(false)}>You've succesfully downloaded this candidate CV!</Alert>}
                </div>
            </div>
        </Paper>
    </div>
  )
}
