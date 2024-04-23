import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

import PushPinIcon from '@mui/icons-material/PushPin';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import './CandidatesCard.css'

export default function CandidatesCard({ student, showMoreCandidate}) {
  return (
    <div className='candidate-card-container'>
        <Card className='candidate-card'>
            <CardContent>
              <div className='candidate-card-location-container'>
                <PushPinIcon/>
                <p className='candidate-card-location'>{student.placeToWork} </p>
              </div>
              <h2 className='candidate-card-name'>{student.firstName} {student.lastName}</h2>
            </CardContent>
            <CardActions>
              <Button className='candidate-card-btn-view-profile' endIcon={<PermContactCalendarIcon/>}
              onClick={() => showMoreCandidate(student)}>View Profile</Button>
            </CardActions>
        </Card>
    </div>
  )
}
