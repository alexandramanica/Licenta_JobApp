import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { Gauge } from '@mui/x-charts/Gauge';

import SidebarCompany from '../../../Components/Company/SidebarCompany/SidebarCompany'
import { getUserDataFromToken,axiosJWT } from '../../../Views/tokenPrep.jsx';
import '../DashboardRecruiter/DashboardRecruiter.css';
import JobCard from '../../../Components/Company/JobCard/JobCard.jsx';

export default function DashboardRecruiter() {

  const [topJobs, setTopJobs] = React.useState([]);
  const [topSavedJobs, setTopSavedJobs] = React.useState([]);
  const [latestJobs, setLatestJobs]=React.useState([]);
  const [selectedJob, setSelectedJob] = React.useState(null);
  const [showButton,setShowButton]=React.useState(true);
  const [nrJobs, setNrJobs]=React.useState(0);
  const [nrCandidates, setnrCandidates]=React.useState(0);

  const getTopJobs = async () => {
    try {
      const token = localStorage.getItem('tokenAcces');
      
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }

      const response = await axiosJWT.get(`http://localhost:8001/api/jobApplication/top`,
      {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200) {
        setTopJobs(response.data);
      }

    } catch (error) {
      console.error('Failed to get Jobs', error);
    }
  }

  const getTopSavedJobs = async () => {
    try {
      const token = localStorage.getItem('tokenAcces');
      
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }

      const response = await axiosJWT.get(`http://localhost:8001/api/savedJobRouter/top`,
      {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200) {
        setTopSavedJobs(response.data);
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

      const response = await axiosJWT.get(`http://localhost:8001/api/job/postingDate/${recruiterId}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200) {
        setLatestJobs(response.data);
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

      const response = await axiosJWT.get(`http://localhost:8001/api/job/count/${recruiterId}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200) {
        setNrJobs(response.data.count);
        console.log("nr",response.data)
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
        console.log("nr",nrCandidates)
      }

    } catch (error) {
      console.error('Failed to get Jobs', error);
    }
  }

  const showMoreJob = (job) => {
    console.log('Selected job:', job);
    setSelectedJob(job);
  };

  React.useEffect(() => {
    getTopJobs();
    getTopSavedJobs();
    getLatestJobs();
    getNrJobs();
    getNrCandidates();
  }, []);

  const series = topJobs.map(job => ({
    name: job.jobTitle,
    data: [job.applicantCount],
    label: job.jobTitle
  }));

  const seriesPieChart = [
    {
      data: topSavedJobs.map(job => ({
        id: job.jobTitle,
        value: job.savedJobCount,
        label: job.jobTitle
      })),
      highlightScope: { faded: 'global', highlighted: 'item' },
      faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
    }
  ];
  console.log(`seriesPieChart`, seriesPieChart)

  return (
    <div>
      <SidebarCompany/>

      <div className="dashboard-container">
        <div className="dashboard-container-text">
              <h1 className='dashboard-container-text-title'>Dashboard</h1>
              <p className='dashboard-container-text-subtitle'>This dashboard provides you with a comprehensive overview of your recruitment activities. From managing job postings to tracking candidate progress, everything you need is right at your fingertips.</p>
        </div>

        <div className='dashboard-top-cards-info-container'>
          <Card className='dashboard-top-cards-info'>
            <CardContent>
              <h3 className='dashboard-top-cards-info-title'>Total jobs</h3>
              <p className='dashboard-top-cards-info-subtitle'>{nrJobs}</p>
            </CardContent>
          </Card>
          <Card className='dashboard-top-cards-info'>
            <CardContent>
              <h3 className='dashboard-top-cards-info-title'>Total candidates</h3>
              <p className='dashboard-top-cards-info-subtitle'>{nrCandidates}</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="dashboard-bar-chart">
          <div className="dashboard-bar-chart-text-container">
            <h3 className='dashboard-bar-chart-text-container-title'>Top jobs by applicants count</h3>
            <p className='dashboard-bar-chart-text-container-subtitle'> This chart highlights the top 5 jobs within your organization that have been most frequently saved by candidates. 
              <br/><br/>By showcasing which positions are generating the highest level of interest among potential hires, recruiters gain valuable insights into the preferences and priorities of job seekers.
              <br/><br/>Understanding which roles are resonating with candidates allows recruiters to tailor their outreach efforts, refine job descriptions, and adjust recruitment strategies to attract the best talent for these coveted positions. 
            </p>
          </div>
          <BarChart
            series={series}
            width={750}
            height={400}
            colors={['#7f27ff', '#c7ef00', '#dadcf2', '#ff8911', '#ae85ff']}
          />
        </div>

        <div className="dashboard-pie-chart">
          <PieChart
            series={seriesPieChart}
            height={350}
            width={650}
            colors={['#7f27ff', '#c7ef00', '#dadcf2', '#ff8911', '#ae85ff']}
          />
          <div className="dashboard-pie-chart-text-container" >
            <h3 className="dashboard-pie-chart-text-container-title">Top jobs by saves count</h3>
            <p className="dashboard-pie-chart-text-container-subtitle">This chart provides a snapshot of the top 5 jobs within your organization based on the number of applicants received.
              <br/><br/> By visually displaying the most sought-after positions, recruiters can quickly identify where the highest levels of candidate interest lie. 
              <br/><br/>This information enables recruiters to allocate resources effectively, prioritize recruitment efforts, and streamline the hiring process for these key roles.
            </p>
          </div>
        </div>

        <h3 className='dashboard-cards-title'>Latest jobs</h3>
        <p className='dashboard-cards-subtitle'>Stay up-to-date with the most recent job postings from your organization. </p>
        <div className="dashboard-cards-container">
          {latestJobs.map(job => (
                <JobCard key={`job-${job.jobId}`} job={job} className='candidate-card' 
                        showMoreJob={() => showMoreJob(job)}
                        showButton={false} />
          ))}
        </div>
      </div>
    </div>
  )
}
