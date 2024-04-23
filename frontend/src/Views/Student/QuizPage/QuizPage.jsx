import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Divider from '@mui/material/Divider';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import HelpIcon from '@mui/icons-material/Help';
import Button from '@mui/material/Button';

import { refreshToken, axiosJWT, getUserDataFromToken } from '../../tokenPrep.jsx';
import SidebarStudent from '../../../Components/Student/SidebarStudent/SidebarStudent';
import quizQuestionsData from './questionsData';
import './QuizPage.css'

export default function QuizzPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState({ EngineeringPath: 0, DataPath: 0, BussinesPath: 0, UiUxPath: 0 });
  const navigate = useNavigate();

  const handleAnswerClick = (answer) => {
    setScore({
      EngineeringPath: score.EngineeringPath + answer.EngineeringPath,
      DataPath: score.DataPath + answer.DataPath,
      BussinesPath: score.BussinesPath + answer.BussinesPath,
      UiUxPath: score.UiUxPath + answer.UiUxPath,
    });
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleBackClick = async () => {
    try {
      let userId = getUserDataFromToken().userId;
      const token = localStorage.getItem('tokenAcces');
      
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }
  
      console.log('Token:', token);
      
      const response = await axiosJWT.post(
        `http://localhost:8001/api/quizTake/upsert`,
        {
          studentId: userId,
          EngineeringPath: score.EngineeringPath,
          DataPath: score.DataPath,
          BussinesPath: score.BussinesPath,
          UiUxPath: score.UiUxPath,
          finishDate: new Date()
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      navigate('/LearningPath')
  
      console.log('Server Response:', response.data);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className='quiz-page'>
      <SidebarStudent />
      
      <div className='quiz-page-container'>
       
        {currentQuestion < quizQuestionsData.length ? (

          <div className='quiz-page-content'>

            <div className='quiz-page-header'>
              <h1 className='quiz-page-header-title'>Question {quizQuestionsData[currentQuestion].questionId}/8 </h1>
              <p className='quiz-page-header-subtitle'>Please click on the answer that applies best to you for each question.</p>
            </div>

            <div className='quiz-page-question-container'>
              <h2>{quizQuestionsData[currentQuestion].question}</h2>
              
            </div>
            <div className='quiz-page-answear-container'>
              {quizQuestionsData[currentQuestion].answers.map((answer, index) => (
                <p
                  key={index}
                  className='quiz-page-answear'
                  onClick={() => handleAnswerClick(answer)}
                >
                  {index === 0 && <LooksOneIcon sx={{ marginRight: '10px', fontSize:'30px', color: '#ae85ff'}} /> }
                  {index === 1 && <LooksTwoIcon sx={{ marginRight: '10px', fontSize:'30px', color: '#ae85ff'}} />}
                  {index === 2 && <Looks3Icon  sx={{ marginRight: '10px', fontSize:'30px', color: '#ae85ff'}}/>}
                  {index === 3 && <Looks4Icon sx={{ marginRight: '10px', fontSize:'30px', color: '#ae85ff'}} />}
                  {answer.text}
                </p>
              ))}
            </div>
          </div>
        ) : (
          <div className='quiz-page-back-content'>
            <h2 className='quiz-page-content-back-title'>Congratulations on completing the "Discover Your Ideal Career Path" quiz!</h2>
            <p className='quiz-page-content-back-text' > 
            We've analyzed your responses, and now it's time to unveil your personalized career path recommendation.
            <br/><br/>  To view your results and gain insights into your ideal profession, please navigate back to the Learning Path page.
                       Thank you for participating, and we hope you find this information valuable in guiding your career journey!</p>
            <Button className='quiz-page-content-back-button' onClick={handleBackClick} >Back</Button>
          </div>
        )}
      </div>
    </div>
  )
}
