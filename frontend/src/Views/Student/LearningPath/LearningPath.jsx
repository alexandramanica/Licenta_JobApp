import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { PieChart } from '@mui/x-charts/PieChart';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SecurityUpdateWarningIcon from '@mui/icons-material/SecurityUpdateWarning';
import ReplayIcon from '@mui/icons-material/Replay';

import { getUserDataFromToken,axiosJWT } from '../../../Views/tokenPrep.jsx';
import SidebarStudent from '../../../Components/Student/SidebarStudent/SidebarStudent'
import learningPathData from './learningPathData.jsx'

import './LearningPath.css'

export default function LearningPath() {
  const [quizData, setQuizData] = useState(null);
  const [quizPathData, setQuizPathData] = useState(null);
  const [mainPathData, setMainPathData] = useState(null); 
  const [selectedPath, setSelectedPath] = useState(null);
  const [modules, setModules] = useState([]); 
  const [selectedModule, setSelectedModule] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    const token = localStorage.getItem('tokenAcces');
    const userId= getUserDataFromToken().userId;

    if (!token) {
      console.error('Token not found in localStorage');
      return;
    }
    try{
    const response = await axiosJWT.get(
      `http://localhost:8001/api/quizTake/student/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    if (response.data) {
      setQuizData(response.data);
      const sum= response.data.EngineeringPath + response.data.DataPath + response.data.BussinesPath + response.data.UiUxPath;
      const pathData = [
        { id: 0, value: (response.data.EngineeringPath *100)/sum, label: 'Engineering Path %' },
        { id: 1, value: (response.data.DataPath *100)/sum, label: 'Data Path %'},
        { id: 2, value: (response.data.BussinesPath *100)/sum, label: 'Business Path %' },
        { id: 3, value: (response.data.UiUxPath*100)/sum, label: 'UI UX Path %' },
      ];
      setQuizPathData(pathData);
      
      const maxPath = pathData.reduce((max, item) => item.value > max.value ? item : max, pathData[0]);
      setMainPathData(maxPath.label.slice(0, -2));

      const selectedPathData = learningPathData.find(item => item.pathName === maxPath.label.slice(0, -2));
      setSelectedPath(selectedPathData);

      const learningPath = learningPathData.filter(path => path.pathName === maxPath.label.slice(0, -2));
      if (learningPath.length > 0) {
        const modules = learningPath[0].modules;
        setModules(modules);
    } else {
       console.log("No learning path found with the specified name");
    }
    }
    } catch(err) {
      console.log(err)
    }
  };

  const handleButtonClick = (module) => {
    setSelectedModule(module);
    console.log(module);
  };

  React.useEffect(() => {
    fetchData();
  },[]);

  return (
    <div className="learning-path-page">
      <SidebarStudent/>
      <div className="learning-path-page-text">
        <h1 className='learning-path-page-text-title'>Learning Path</h1>
        <p className='learning-path-page-text-subtitle'>Welcome to your personalized learning path! 🚀 Here, you can explore and navigate through the modules tailored to your interests and career goals. 🎯</p>
      </div>

      {quizPathData && quizPathData.length > 0 ? (
      <div className="learning-path-page-quiz-taken">
         <div className="learning-path-page-content">
            <div className="learning-path-page-results">
              <h3 className='learning-path-page-results-title'>Your Results</h3>
              <p className='learning-path-page-results-path-title'>{mainPathData}</p>
              <p className='learning-path-page-results-path-subtitle'>{selectedPath.pathDescription}</p>
              <div classname="learning-path-page-take-again">
                <h5 className='learning-path-page-take-again-text'>Not happy with the results?</h5>
                <Button className='learning-path-page-take-again-button'
                endIcon={<ReplayIcon/>}
                 onClick={() => navigate('/QuizPage')}>Take the quiz again</Button>
              </div>
            </div>



          <div className="learning-path-page-piechart">
            <PieChart
              className='learning-path-page-pie-chart'
              series={[
                {
                  data: quizPathData,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: { innerRadius: 70, additionalRadius: -70, color: 'gray' },
                },
              ]}
              colors={['#7f27ff', '#ae85ff', '#c7ef00', '#ff8911']}
              height={350}
              width={700}
            />
          </div>
         </div>

          <div className="learning-path-page-roadmap">
            <h4 className='learning-path-page-roadmap-title'>🗺️Roadmap</h4>

            <div className='learning-path-page-roadmap-cards-container'>
              <Card className='learning-path-page-roadmap-card'>
                <CardContent>
                  <h4 className='learning-path-page-roadmap-card-title'>Step 1</h4>
                  <p className='learning-path-page-roadmap-card-subtitle'>Starting Out</p>
                  <Button 
                    className='learning-path-page-roadmap-card-button' 
                    endIcon={<MenuBookIcon/>}
                    onClick={() => handleButtonClick(modules[0])}>Show more</Button>
                </CardContent>
              </Card>
              <div className='arrow'><ArrowForwardIcon/></div>
              <Card className='learning-path-page-roadmap-card'>
                <CardContent>
                  <h4 className='learning-path-page-roadmap-card-title'>Step 2</h4>
                  <p className='learning-path-page-roadmap-card-subtitle'>Building Skills</p>
                  <Button 
                    className='learning-path-page-roadmap-card-button' 
                    endIcon={<MenuBookIcon/>}
                    onClick={() => handleButtonClick(modules[1])}>Show more</Button>
                </CardContent>
              </Card>
              <div className='arrow'><ArrowForwardIcon/></div>
              <Card className='learning-path-page-roadmap-card'>
                <CardContent>
                  <h4 className='learning-path-page-roadmap-card-title'>Step 3</h4>
                  <p className='learning-path-page-roadmap-card-subtitle'>Mastering Technologies</p>
                  <Button 
                    className='learning-path-page-roadmap-card-button' 
                    endIcon={<MenuBookIcon/>}
                    onClick={() => handleButtonClick(modules[2])}>Show more</Button>
                </CardContent>
              </Card>
              <div className='arrow'><ArrowForwardIcon/></div>
              <Card className='learning-path-page-roadmap-card'>
                <CardContent>
                  <h4 className='learning-path-page-roadmap-card-title'>Step 4</h4>
                  <p className='learning-path-page-roadmap-card-subtitle'>Exploring Careers</p>
                  <Button 
                    className='learning-path-page-roadmap-card-button' 
                    endIcon={<MenuBookIcon/>}
                    onClick={() => handleButtonClick(modules[3])}>Show more</Button>
                </CardContent>
              </Card>
            </div>

            <div className='learning-path-page-roadmap-container-module'>
            {selectedModule ? (
              <>
              <h4 className='learning-path-page-roadmap-container-module-title'>{selectedModule.title}</h4>
              <Divider/>
              <p className='learning-path-page-roadmap-container-text-module-description'>{selectedModule.description}</p>
              {selectedModule.sections.map((section, index) => (
                <div className='learning-path-page-roadmap-container-text-submodules' key={index}>
                    <h5 className='learning-path-page-roadmap-container-text-submodules-title'>{section.title}</h5>
                    <p className='learning-path-page-roadmap-container-text-submodules-description'>{section.description}</p>
                    <p className='learning-path-page-roadmap-container-text-submodules-resources-title'>Resources</p>
                  <div className='learning-path-page-roadmap-container-text-submodules-resources-container'>
                    {section.resources.map((resource, resourceIndex) => (
                      <div key={resourceIndex} className='learning-path-page-roadmap-container-text-submodules-resource'>
                        <div className='learning-path-page-roadmap-container-text-submodules-resource-text'>
                          <p className='learning-path-page-roadmap-container-text-submodules-resource-text-title'>{resource.title}</p>
                          <p className='learning-path-page-roadmap-container-text-submodules-resource-text-description'>{resource.description}</p>
                          <div className='learning-path-page-roadmap-container-text-submodules-resource-text-link'>
                            <SecurityUpdateWarningIcon/>
                            <a href={`${resource.link}`} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              style={{color: '#ff8911'}}
                              > Click here to acces this resource!</a>
                            </div>
                        </div>
                       
                      </div>
                    ))}
                  </div>
              </div> 
              ))}
              </>
            ) : (
              <p></p>
            )}
            </div>

            <Divider className='learning-path-page-divider'/>
          

          </div>

      </div>
      ) : (
        <div className="learning-path-page-quizz-not-taken">
          <h1 className='learning-path-page-quizz-not-taken-title'>Quizz Not Taken</h1>
          <p className='learning-path-page-quizz-not-taken-subtitle'>You have not taken any quizzes yet. Please take the quizzes to unlock more job opportunities.</p>
          <Button 
            className='learning-path-page-quizz-not-taken-button' 
            onClick={() => navigate('/QuizPage')}
          >Take quizz</Button>
        </div>
      )}
    </div>
  )
}
