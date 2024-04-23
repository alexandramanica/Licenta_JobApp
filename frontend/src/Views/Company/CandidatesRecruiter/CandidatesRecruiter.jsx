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

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import  Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';

export default function CandidatesRecruiter() {
  const [candidatesCard, setCandidatesCards] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const [filteredCandidatesCard, setFilteredCandidatesCards] = useState([]);
  const [realTimeSearch, setRealTimeSearch] = useState(null);
  const [locationsFilter, setLocationsFilter] = useState([]);

  const uniqueLocations = candidatesCard.reduce((unique, candidate) => {
    return unique.includes(candidate.placeToWork) ? unique : [...unique, candidate.placeToWork];
  }, []);

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
                <p className='candidates-page-text-subtitle'>Welcome to our candidate browsing page! Here, you can explore the profiles of talented individuals who are seeking opportunities in various fields.</p>
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

    </div>
  )
}
