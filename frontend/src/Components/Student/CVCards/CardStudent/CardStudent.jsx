import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';

import '../CardStudent/CardStudent.css'

export default function CardStudent({ education, onDelete, onEdit }) {

    const educationId = education.educationId;
    console.log('education Card id', education)
    console.log('education Card id', educationId)

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      }

      const handleDelete = async () => {
        try {
          console.log('Deleting education with ID:', educationId);
          await onDelete(educationId); 
        } catch (err) {
          console.error('Failed to delete education:', err);
        }
      }

    return (
      <div className='card-school-container'>
        <Card variant='outlined' className='card-school'>
          <CardContent>
            <div className='card-school-title-container'>
            <h4 className='card-school-title-period'>{formatDate(education.startYear)} - {formatDate(education.endYear)}</h4>
              <h3 className='card-school-title-university'>{education.institutionName}</h3>
              <h4 className='card-school-title-areaStudy'>{education.fieldOfStudy}</h4>
              <h4 className='card-school-title-diploma'>{education.degreeType}</h4>
            </div>
  
            <CardActions style={{ justifyContent: 'flex-end' }}>
              <div className='card-school-button-container'>
                <IconButton aria-label="delete" className='card-school-icon-button-delete' onClick={() => handleDelete(educationId)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton aria-label="edit" className='card-school-icon-button-edit'>
                  <ModeEditOutlineIcon />
                </IconButton>
              </div>
            </CardActions>
          </CardContent>
        </Card>
      </div>
    )
  }