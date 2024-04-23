import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';

import '../CardStudentExperience/CardStudentExperience.css'

export default function CardStudentExperience({ experience, onDelete, onEdit }) {

    const experienceId = experience.experienceId;
    console.log('experience Card id', experience)
    console.log('experience Card id', experienceId)

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      }

      const handleDelete = async () => {
        try {
          console.log('Deleting experience with ID:', experienceId);
          await onDelete(experienceId); 
        } catch (err) {
          console.error('Failed to delete experience:', err);
        }
      }

    return (
      <div className='card-experience-container'>
        <Card variant='outlined' className='card-experience'>
          <CardContent>
            <div className='card-experience-title-container'>
            <h4 className='card-experience-title-period'>{formatDate(experience.startYear)} - {formatDate(experience.endYear)}</h4>
              <h3 className='card-experience-title-role-title'>{experience.positionTitle}</h3>
              <h4 className='card-experience-title-company-name'>{experience.companyName}</h4>
              <h4 className='card-experience-title-experience-description'>{experience.experienceDescription}</h4>
            </div>
  
            <CardActions style={{ justifyContent: 'flex-end' }}>
              <div className='card-experience-button-container'>
                <IconButton aria-label="delete" className='card-experience-icon-button-delete' onClick={() => handleDelete(experienceId)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton aria-label="edit" className='card-experience-icon-button-edit'>
                  <ModeEditOutlineIcon />
                </IconButton>
              </div>
            </CardActions>
          </CardContent>
        </Card>
      </div>
    )
  }