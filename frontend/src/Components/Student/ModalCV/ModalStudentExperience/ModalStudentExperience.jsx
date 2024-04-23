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

import './ModalStudentExperience.css'

export default function ModalStudentExperience({ open, handleClose, saveData }) {

  const studentId= getUserDataFromToken().userId;

  const [newStudentExperience, setNewStudentExperience] = React.useState({
    studentId: studentId,
    companyName: '',
    positionTitle: '',
    experienceDescription: '',
    startYear: '',
    endYear: ''
  });

  const handleInputChange = (event) => {
    setNewStudentExperience({
      ...newStudentExperience,
      [event.target.name]: event.target.value
    });
  };

  const handleDateChange = (name) => (date) => {
    setNewStudentExperience({
      ...newStudentExperience,
      [name]: date
    });
  };

  const handleModalExperienceSave = () => {
    console.log(saveData); // should log the saveData function
    saveData(newStudentExperience);
    handleClose();
  };


  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>

          <Modal
          onClose={handleClose}
          open={open}
          className='modal-student-experience'>
              <Box >
                <h3 className="add-experience-title">Add Experience</h3>
                <h5  className="add-experience-advice">
                  <span>
                    Let's make your profile shine! 
                  </span>
                    Add each job experience one by one, and highlight the ones that could catch the eye of your future employer.
                  <span>
                    Friendly tip: If you're light on work experience, showcase your internships, volunteer projects, and any cool personal projects related to your field. Let's make your journey stand out!"
                  </span>
                </h5>

                <div className="add-experience-container">                
                  <div className='input-add-experience-div'>
                    <h4 className="input-add-experience-title">Company Name</h4>                   
                    <OutlinedInput placeholder="Google Romania" 
                                  inputProps={{ 'aria-label': 'experience', 'name': 'companyName' }}
                                  type="text" 
                                  value={newStudentExperience.companyName} onChange={handleInputChange} 
                                  className='input-add-experience' />
                  </div>                  
                  <div className='input-add-experience-div'>
                    <h4 className="input-add-experience-title">Role Title</h4>
                    <OutlinedInput placeholder="Software Developer" 
                                  inputProps={{ 'aria-label': 'experience', 'name': 'positionTitle' }}
                                  type="text" 
                                  value={newStudentExperience.positionTitle} onChange={handleInputChange} 
                                  className='input-add-experience' />
                  </div>
                  <div className='input-add-experience-div'>
                    <h4 className="input-add-experience-title">About your role</h4>
                    <TextField
                      id="outlined-multiline-static"
                      multiline
                      rows={8}
                      maxRows={8}
                      placeholder='Write a few words about your experience'
                      inputProps={{ 'aria-label': 'experience','name':'experienceDescription' }}
                      className='input-add-experience'
                      value={newStudentExperience.experienceDescription} onChange={handleInputChange}
                      style={{ height: "100px"}}
                    /> 
                  </div>
                  <div className='date-add-experience-div'>
                    <div className='input-add-experience-div'>
                    <h4 className="input-add-experience-title">Start Date</h4>
                    <DatePicker className='date-picker-add-experience'
                                value={newStudentExperience.startYear} 
                                onChange={handleDateChange('startYear')} />
                    </div>
                    <div className='input-add-experience-div'>
                      <h4 className="input-add-experience-title">End Date</h4>
                      <DatePicker className='date-picker-add-experience'
                                  value={newStudentExperience.endYear} 
                                  onChange={handleDateChange('endYear')} />
                    </div>
                  </div>
                </div>

                <Button className='btn-save-add-experience' 
                  onClick={handleModalExperienceSave}
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
      </LocalizationProvider>
    </div>
  )
}
