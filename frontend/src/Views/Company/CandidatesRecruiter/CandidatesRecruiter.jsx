import React from 'react'
import SidebarCompany from '../../../Components/Company/SidebarCompany/SidebarCompany.jsx';
import CandidatesCard from '../../../Components/Company/CandidatesCard/CandidatesCard.jsx';
import CandidateCardAbout from '../../../Components/Company/CandidateCardAbout/CandidateCardAbout.jsx';
import './CandidatesRecruiter.css'

import { useState } from 'react';
import { getUserDataFromToken,axiosJWT } from '../../../Views/tokenPrep.jsx';

import AddBoxIcon from '@mui/icons-material/AddBox';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import  Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import axios from 'axios';

export default function CandidatesRecruiter() {
  const [candidatesCard, setCandidatesCards] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const [filteredCandidatesCard, setFilteredCandidatesCards] = useState([]);
  const [realTimeSearch, setRealTimeSearch] = useState(null);
  const [locationsFilter, setLocationsFilter] = useState([]);

  const [criteria, setCriteria] = useState('');
  const [recommendations, setRecommendations] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const uniqueLocations = candidatesCard.reduce((unique, candidate) => {
    return unique.includes(candidate.placeToWork) ? unique : [...unique, candidate.placeToWork];
  }, []);

  const handleInputChange = (event) => {
    setCriteria(event.target.value);
};

const fetchRecommendations = async () => {
    try {
        let userId = getUserDataFromToken().userId;
        console.log("User Id", userId)
        const token = localStorage.getItem('tokenAcces');
        const response = await axiosJWT.post(`http://localhost:8001/api/student/get-recomandations/${userId}`, 
          {
            headers: { Authorization: `Bearer ${token}` },
            criteria: criteria
        });
        setRecommendations(response.data.recommendations);
        setDrawerOpen(true);
    } catch (error) {
        console.error('Error fetching recommendations:', error);
    }
};

  React.useEffect(() => {
    try {
      let recruiterId = getUserDataFromToken().userId;
      console.log("User Id", recruiterId)
      const token = localStorage.getItem('tokenAcces');
      
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }
  
      const fetchData = async () => {
        const response = await axiosJWT.get(
          `http://localhost:8001/api/students`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
    
        if (response.data) {
          console.log('Candidate Recruiter Card Data:', response.data);
          setCandidatesCards(response.data);
          setFilteredCandidatesCards(response.data);
        } else {
          console.error('Failed to fetch data');
        }
      };
  
      fetchData();
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }, []);

  const showMoreCandidate = (candidate) => {
    console.log('Selected candidate:', candidate);
    setSelectedCandidate(candidate);
  };


  return (
    <div>
        <SidebarCompany />

        <div className="candidates-page">
            <div className="candidates-page-text">
                <h1 className='candidates-page-text-title'>Candidates</h1>
                <p className='candidates-page-text-subtitle'>Welcome to our candidate browsing page! Here, you can explore the profiles of talented individuals who are seeking opportunities in various fields 📋.Let's start finding the perfect candidates for your roles 👥!</p>
            </div>

            <div className="candidates-page-filters">
              <div className='candidates-page-filter-search-container'>
              <Autocomplete
                id="candidates-page-filter-search"
                style={{ width: '100%' }}
                freeSolo
                options={candidatesCard}
                getOptionLabel={(option) => `${option.firstName} ${option.lastName}`} 
                getOptionSelected={(option, value) => option.studentId === value.studentId}
                onInputChange={(event, newInputValue) => {
                  setRealTimeSearch(newInputValue);
                  setFilteredCandidatesCards(candidatesCard.filter(candidate => 
                    candidate.firstName.toLowerCase().startsWith(newInputValue.toLowerCase()) ||
                    candidate.lastName.toLowerCase().startsWith(newInputValue.toLowerCase())
                  ));
                }}
                onChange={(event, newValue) => {
                  setSelectedCandidate(newValue);
                }}
                renderInput={(params) => <TextField {...params} label="Search by candidate name" 
                                                InputProps={{
                                                  endAdornment: (
                                                    <InputAdornment position="end">
                                                      <KeyboardIcon/>
                                                    </InputAdornment>
                                                  ),
                                                }}
                                                InputLabelProps={{style: { color: '#ae85ff',paddingLeft:'5px', fontFamily:'Montserrat',fontWeight:'500'}}} />}
              />
              </div>

              <div className='candidates-page-filter-location-container'>
                  <Autocomplete
                    id="candidates-page-filter-location"
                    disablePortal
                    style={{ width: '100%' }}
                    options={uniqueLocations}
                    getOptionLabel={(option) => option} 
                    onInputChange={(event, newInputValue) => {
                      setLocationsFilter(newInputValue);
                    }}
                    renderInput={(params) => <TextField {...params} label="Job Location" InputLabelProps={{style: { color: '#ae85ff',paddingLeft:'5px',fontFamily:'Montserrat',fontWeight:'500'}}} />}
                  />
                </div>
               

              <Button onClick={() => {
                setFilteredCandidatesCards(candidatesCard.filter(candidate => 
                  (selectedCandidate === null || selectedCandidate === '' 
                  || candidate.firstName.toLowerCase().includes(selectedCandidate.toLowerCase())
                  || candidate.lastName.toLowerCase().includes(selectedCandidate.toLowerCase())) &&
                  (locationsFilter.length === 0 || locationsFilter.includes(candidate.placeToWork))
                ));
              }}
              className='candidates-page-button-search'
              endIcon={<SearchIcon/>}>Search</Button>
            </div>

            <div className="candidates-recommandations">
              <h2 className='candidates-recommandations-title'>Our top picks ✨</h2>
              <p className='candidates-recommandations-subtitle'>Tell us what you're looking for, and our AI assistant 🤖 will recommend the top five candidates. Simply complete the text field with your requirements, and let us do the rest! </p>
              <div className="candidates-recommandations-text-search">
              <TextField
                    className='candidates-recommandations-text-input'
                    label="Criteria"
                    name="criteria"
                    type="text"
                    value={criteria}
                    onChange={handleInputChange}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{style: { color: '#ae85ff',paddingLeft:'5px',fontFamily:'Montserrat',fontWeight:'500'}}}
                />
                <Button className='candidates-recommandations-button' onClick={fetchRecommendations} endIcon={<TipsAndUpdatesIcon/>}>
                    Recommend
                </Button>
              </div>
            </div>
            

            <div className="candidates-page-container">
              <div className="candidates-container-card">
              {filteredCandidatesCard.map(student => (
                <CandidatesCard key={`candidate-${student.studentId}`} student={student} className='candidate-card' 
                       showMoreCandidate={() => showMoreCandidate(student)}
                />
              ))} 
              </div>
              <div className='candidate-page-about-canidate'>
                  <CandidateCardAbout student={selectedCandidate} />
              </div>
            </div>
        </div> 

        <Drawer anchor='right' open={drawerOpen} onClose={() => setDrawerOpen(false)}
          PaperProps={{ 
            style: {
                width: '40%', 
                overflowY: 'auto',
                height: '100vh',
                padding: '20px',
            },}}>
                <div>
                    <h3 className='drawer-recruiter-recommandations-top5-title'>Our recomandations</h3>
                    <p className='drawer-recruiter-recommandations-top5-subtitle'>Based on your requirements, our AI assistant has selected the top five candidates📋.<br/> Review the results below to find the perfect match for your needs. Each candidate has been carefully chosen to ensure they possess the specific skills, experience, and qualifications you're looking for.<br/> Here are your results: the perfect talent for your needs, ready to drive success🚀. </p>
                    <h3 className='drawer-recruiter-recommandations-text-tile-result'>Results: </h3>
                    <Typography variant="body1" style={{ whiteSpace: 'pre-line', fontFamily:'Montserrat',fontWeight:'350', fontSize:'1em', paddingLeft:'20px' }}>{recommendations}</Typography>
                </div>
        </Drawer>

    </div>
  )
}
