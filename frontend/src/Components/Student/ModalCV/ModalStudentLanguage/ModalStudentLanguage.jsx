import React from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import OutlinedInput from '@mui/material/OutlinedInput'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getUserDataFromToken } from '../../../../Views/tokenPrep'
import CheckIcon from '@mui/icons-material/Check';

import './ModalStudentLanguage.css'

export default function ModalStudentLanguage({ open, handleClose, saveData }) {

  const studentId= getUserDataFromToken().userId;

  const [newStudentLanguage, setNewStudentLanguage] = React.useState({
    studentId: studentId,
    languageName: '',
    proficiencyLevel: '',
  });

  const handleInputChange = (event) => {
    setNewStudentLanguage({
      ...newStudentLanguage,
      [event.target.name]: event.target.value
    });
  };

  const handleDateChange = (name) => (date) => {
    setNewStudentLanguage({
      ...newStudentLanguage,
      [name]: date
    });
  };

  const handleModalLanguageSave = () => {
    console.log(saveData); // should log the saveData function
    saveData(newStudentLanguage);
    handleClose();
  };


  return (
    <div>
      

          <Modal
          onClose={handleClose}
          open={open}
          className='modal-student-language'>
              <Box >
                <h3 className="add-language-title">Add Language</h3>
                <h5  className="add-language-advice">
                  <span>
                    Let's make your profile shine!🌟
                  </span>
                  Add each language one by one, and highlight the ones that could catch the eye of your future employer. 🎯
                  <span>
                  Remember, language proficiency can be a key differentiator in the job market. Don't forget to include any languages in which you have professional working proficiency or are a native speaker. 🌍
                  </span>
                </h5>

                <div className="add-language-container">                
                  <div className='input-add-language-div'>
                    <h4 className="input-add-language-title">Language name</h4>                   
                    <OutlinedInput placeholder="English" 
                                  inputProps={{ 'aria-label': 'language', 'name': 'languageName' }}
                                  type="text" 
                                  value={newStudentLanguage.languageName} onChange={handleInputChange} 
                                  className='input-add-language' />
                  </div>                  

                  <div className='input-add-language-div'>
                    <h4 className="input-add-language-title">Degree Type</h4>
                    <TextField
                      select
                      placeholder="**************"
                      inputProps={{ 'aria-label': 'language', 'name': 'proficiencyLevel' }}
                      value={newStudentLanguage.proficiencyLevel}
                      onChange={handleInputChange}
                      className='input-add-language'
                    >
                      <MenuItem value={'Beginner'}>Beginner</MenuItem>
                      <MenuItem value={'Intermediate'}>Intermediate</MenuItem>
                      <MenuItem value={'Advanced'}>Advanced</MenuItem>
                      <MenuItem value={'Fluent'}>Fluent</MenuItem>
                      <MenuItem value={'Native'}>Native</MenuItem>
                    </TextField>
                  </div>
                </div>

                <Button className='btn-save-add-language' 
                  onClick={handleModalLanguageSave}
                  sx={{ backgroundColor: '#C7EF00',
                        color: 'black',
                        height: '40px',
                        marginLeft:'50px',
                        '&:hover': {
                          backgroundColor: '#AE85FF',
                        }
                  }}>
                  <span style={{ margin: 'auto' }}>Save</span>
                  <CheckIcon style={{ marginLeft: '5px' }}/>
                </Button>
              </Box>
          </Modal>
    </div>
  )
}
