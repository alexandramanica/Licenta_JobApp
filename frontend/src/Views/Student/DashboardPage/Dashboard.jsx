import React from 'react'
import Button  from '@mui/material/Button'
import { Link } from 'react-router-dom'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { BarChart } from '@mui/x-charts/BarChart';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import WorkIcon from '@mui/icons-material/Work';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import GradingIcon from '@mui/icons-material/Grading';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';

import SidebarStudent from '../../../Components/Student/SidebarStudent/SidebarStudent'
import NavbarStudentMD from '../../../Components/Student/NavbarStudent/NavbarStudentMD.jsx'
import NavbarStudentXS from '../../../Components/Student/NavbarStudent/NavbarStudentXS.jsx'
import CardCareerPathAbout from '../../../Components/Student/CardCareerPathAbout/CardCareerPathAbout.jsx'
import JobCard from '../../../Components/Company/JobCard/JobCard.jsx';
import { getUserDataFromToken,axiosJWT } from '../../../Views/tokenPrep.jsx';
import './Dashboard.css'

import videoDashboard from '../../../assets/videoDashboard.mp4'


export default function Dashboard() {
  const [studentsNumberCareerPath, setStudentsNumberCareerPath] = React.useState([]);
  const [latestJobs, setLatestJobs]=React.useState([]);
  const [nrJobs, setNrJobs]=React.useState(0);
  const [nrCandidates, setnrCandidates]=React.useState(0);
  const [nrApplicants, setNrApplicants] = React.useState(null);
  const [nrSavedJobs, setNrSavedJobs] = React.useState(null);

  const getStudentNumberCareerPath = async () => {
    try {
      const token = localStorage.getItem('tokenAcces');
      const studentId = getUserDataFromToken().userId;
      
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }

      const response = await axiosJWT.get(`http://localhost:8001/api/job/countByPath/${studentId}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200 && Array.isArray(response.data)) {
        setStudentsNumberCareerPath(response.data);
        console.log(response.data)
      }

    } catch (error) {
      console.error('Failed to get Jobs', error);
    }
  }

  const getLatestJobs= async() =>{
    try {
      const token = localStorage.getItem('tokenAcces');
      const recruiterId = getUserDataFromToken().userId;
      
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }

      const response = await axiosJWT.get(`http://localhost:8001/api/job/postingDate/all/${recruiterId}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200) {
        setLatestJobs(response.data);
        console.log("latest jobs",latestJobs)
      }

    } catch (error) {
      console.error('Failed to get Jobs', error);
    }
  }

  const getNrJobs= async() =>{
    try {
      const token = localStorage.getItem('tokenAcces');
      const recruiterId = getUserDataFromToken().userId;
      
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }

      const response = await axiosJWT.get(`http://localhost:8001/api/jobs/allCount`,
      {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200) {
        setNrJobs(response.data.count);
        console.log("nr job",response.data)
      }

    } catch (error) {
      console.error('Failed to get Jobs', error);
    }
  }

  const getNrCandidates= async() =>{
    try {
      const token = localStorage.getItem('tokenAcces');
      const recruiterId = getUserDataFromToken().userId;
      
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }

      const response = await axiosJWT.get(`http://localhost:8001/api/students/count`,
      {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200) {
        setnrCandidates(response.data.count);
        console.log("nr candidates",nrCandidates)
      }

    } catch (error) {
      console.error('Failed to get Jobs', error);
    }
  }

  const getNrApplicants = async () => {
    try {
      const token = localStorage.getItem('tokenAcces');
      const recruiterId = getUserDataFromToken().userId;
      
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }

      const response = await axiosJWT.get(`http://localhost:8001/api/jobsApplication/countByStudent/${recruiterId}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200) {
        console.log("Response data appl:", response.data); 
        setNrApplicants(response.data.count);
        console.log("nr candidates appl",nrApplicants)
      }

    } catch (error) {
      console.error('Failed to get Jobs', error);
    }
  }

  const getNrSavedJobs = async () => {
    try {
      const token = localStorage.getItem('tokenAcces');
      const recruiterId = getUserDataFromToken().userId;
      
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }

      const response = await axiosJWT.get(`http://localhost:8001/api/savedJob/countByStudent/${recruiterId}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200) {
        console.log("Response data saved jobs:", response.data.count); 
        setNrSavedJobs(response.data.count);
        console.log("nr saved jobs",nrSavedJobs)
      }

    } catch (error) {
      console.error('Failed to get Jobs', error);
    }
  }

  const showMoreJob = (job) => {
    console.log('Selected job:', job);
   
  };

  React.useEffect(() => {
    getStudentNumberCareerPath();
    getLatestJobs();
    getNrCandidates();
    getNrJobs();
    getNrApplicants();
    getNrSavedJobs();
  }, []);

  const series = studentsNumberCareerPath.map(job => ({
    name: job.jobPath,
    data: [job.jobCount],
    label: job.jobPath
  }));

  return (

    <div>
      <SidebarStudent />
      <NavbarStudentXS/>
      <div  className="dashboard-container">
      <div className="dashboard-container-text">
          <h1 className='dashboard-container-text-title'>Dashboard</h1>
          <p className='dashboard-container-text-subtitle'>This is your personal dashboard, where you can track your progress and discover new paths! Your path to success starts here. Remember, every step you take is a step closer to your goals.🎯</p>
      </div>
        <div className='dashboard-video-container'>
          <video src={videoDashboard} className='dashboard-video-container-video' autoPlay loop muted />
          <div className='dashboard-video-container-elements'>
            <h3 className='dashboard-video-container-title'>Discover your path to succes</h3>
            <h3 className='dashboard-video-container-subtitle'>Your perfect place to rediscover yourself</h3>
            <Link to='/CV'>
              <Button className='dashboard-video-container-button' >Get Started</Button>
            </Link>
          </div>
        </div>

        <div className='dashboard-careerPaths-container'>
          <div className='dashboard-careerPaths-container-text'>
            <h4 className='dashboard-careerPaths-container-subtitle'>🔥Career Paths</h4>
            <h3 className='dashboard-careerPaths-container-title'>Unlock your potential</h3>
            <p className='dashboard-careerPaths-container-p'>Unleash your potential with the best career path for you!</p>
            <Link to='/LearningPath'>
              <Button className='dashboard-careerPaths-container-button' endIcon={<AutoAwesomeIcon/>}>Take the quiz</Button>
            </Link>
          </div>
          <CardCareerPathAbout/>
        </div>
      </div>

      <div className='dashboard-barchart-container-text'>
            <h4 className='dashboard-barchart-container-subtitle'>📈 Applicant Status</h4>
            <h3 className='dashboard-barchart-container-title'>Track your progress</h3>
            <p className='dashboard-barchart-container-p'>This section gives a snapshot of your status, the number of submitted applications, available jobs, saved jobs, and candidates!</p>
      </div>

      <div className='dashboard-student-top-cards-info-container'>
          <Card className='dashboard-top-cards-info'>
            <CardContent>
              <h3 className='dashboard-top-cards-info-title'>Jobs Openings</h3>
              <p className='dashboard-top-cards-info-subtitle'>{nrJobs} <WorkIcon /></p>
            </CardContent>
          </Card>
          <Card className='dashboard-top-cards-info'>
            <CardContent>
              <h3 className='dashboard-top-cards-info-title'>Candidates</h3>
              <p className='dashboard-top-cards-info-subtitle'>{nrCandidates} <PeopleAltIcon/> </p>
            </CardContent>
          </Card>
          <Card className='dashboard-top-cards-info'>
            <CardContent>
              <h3 className='dashboard-top-cards-info-title'>Applications Number</h3>
              <p className='dashboard-top-cards-info-subtitle'>{nrApplicants} <GradingIcon/> </p>
            </CardContent>
          </Card>
          <Card className='dashboard-top-cards-info'>
            <CardContent>
              <h3 className='dashboard-top-cards-info-title'>Saved Jobs</h3>
              <p className='dashboard-top-cards-info-subtitle'>{nrSavedJobs} <BookmarkAddedIcon/> </p>
            </CardContent>
          </Card>
        </div>

      <div className='dashboard-barchart-container-text'>
            <h4 className='dashboard-barchart-container-subtitle'>📊Statistics</h4>
            <h3 className='dashboard-barchart-container-title'>Job Market Overview</h3>
            <p className='dashboard-barchart-container-p'>This graph displays the number of job opportunities available for each learning path!</p>
      </div>

     <div className="dashboard-student-bar-chart">
        <BarChart
                series={series}
                width={900}
                height={400}
                colors={['#7f27ff', '#c7ef00', '#dadcf2', '#ff8911', '#ae85ff']}
        />
     </div>

          <div className='dashboard-latestJob-container-text'>
            <h4 className='dashboard-latestJob-container-subtitle'>🎓Latest jobs</h4>
            <h3 className='dashboard-latestJob-container-title'>Stay up to date</h3>
            <p className='dashboard-latestJob-container-p'>Check out the latest job opportunities tailored to you!</p>
        </div>

        <div className="dashboard-student-cards-container">
          {latestJobs.map(job => (
                <JobCard key={`job-${job.jobId}`} job={job} className='candidate-card' 
                        showMoreJob={() => showMoreJob(job)}
                        showButton={false} />
          ))}
          </div>

    </div>
  )
}
