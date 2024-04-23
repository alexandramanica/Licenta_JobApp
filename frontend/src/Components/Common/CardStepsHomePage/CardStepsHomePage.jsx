import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { cardResumeData } from './CardResumeData';
import './CardStepsHomePage.css';

export default function CardStepsHomePage() {
  return (
    <div className='all-cards-steps-home-page'>
      {cardResumeData.map((val,key)=>{
        return(
          <Card key={key} className="card-steps-home-page">
            <CardContent>
              <div className='card-steps-home-page-icon' >{val.icon}</div>
              <h2 className='card-steps-home-page-title'>{val.title}</h2>
              <p className='card-steps-home-page-description'>{val.description}</p>
            </CardContent>
          </Card>
        )
      })
      } 
    </div>
  )
}
