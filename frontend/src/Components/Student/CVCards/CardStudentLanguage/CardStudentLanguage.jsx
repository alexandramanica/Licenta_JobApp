import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';

import '../CardStudentLanguage/CardStudentLanguage.css'

export default function CardStudentLanguage({ language, onDelete, onEdit }) {

    const languageId = language.languageId;
    console.log('language Card id', language)
    console.log('language Card id', languageId)

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      }

      const handleDelete = async () => {
        try {
          console.log('Deleting languageId with ID:', languageId);
          await onDelete(languageId); 
        } catch (err) {
          console.error('Failed to delete language:', err);
        }
      }

    return (
      <div className='card-language-container'>
        <Card variant='outlined' className='card-language'>
          <CardContent>
            <div className='card-language-title-container'>
              <h3 className='card-language-title-languageName'>{language.languageName}</h3>
              <h4 className='card-language-title-proficiencyLevel'>{language.proficiencyLevel}</h4>
            </div>
  
            <CardActions style={{ justifyContent: 'flex-end' }}>
              <div className='card-language-button-container'>
                <IconButton aria-label="delete" className='card-language-icon-button-delete' onClick={() => handleDelete(languageId)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton aria-label="edit" className='card-language-icon-button-edit'>
                  <ModeEditOutlineIcon />
                </IconButton>
              </div>
            </CardActions>
          </CardContent>
        </Card>
      </div>
    )
  }