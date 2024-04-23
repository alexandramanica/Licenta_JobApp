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

import './ModalStudentSchool.css'

export default function ModalStudentSchool({ open, handleClose, saveData }) {

  const studentId= getUserDataFromToken().userId;

  const [newStudentSchool, setNewStudentSchool] = React.useState({
    studentId: studentId,
    institutionName: '',
    degreeType: '',
    fieldOfStudy: '',
    startYear: '',
    endYear: ''
  });

  const handleInputChange = (event) => {
    setNewStudentSchool({
      ...newStudentSchool,
      [event.target.name]: event.target.value
    });
  };

  const handleDateChange = (name) => (date) => {
    setNewStudentSchool({
      ...newStudentSchool,
      [name]: date
    });
  };

  const handleModalEducationSave = () => {
    console.log(saveData); // should log the saveData function
    saveData(newStudentSchool);
    handleClose();
  };


  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>

          <Modal
          onClose={handleClose}
          open={open}
          className='modal-student-school'>
              <Box >
                <h3 className="add-school-title">Add Education</h3>
                <h5  className="add-school-advice">
                  <span>
                    Let's make your profile shine! 
                  </span>
                    Add each job experience one by one, and highlight the ones that could catch the eye of your future employer.
                  <span>
                    Friendly tip: If you're light on work experience, showcase your internships, volunteer projects, and any cool personal projects related to your field. Let's make your journey stand out!"
                  </span>
                </h5>

                <div className="add-school-container">                
                  <div className='input-add-school-div'>
                    <h4 className="input-add-school-title">Institution name</h4>                   
                    <OutlinedInput placeholder="Bucharest University of Economic Studies" 
                                  inputProps={{ 'aria-label': 'school-name', 'name': 'institutionName' }}
                                  type="text" 
                                  value={newStudentSchool.institutionName} onChange={handleInputChange} 
                                  className='input-add-school' />
                  </div>                  
                  <div className='input-add-school-div'>
                    <h4 className="input-add-school-title">Field of study</h4>
                    <OutlinedInput placeholder="Computer Science" 
                                  inputProps={{ 'aria-label': 'profile', 'name': 'fieldOfStudy' }}
                                  type="text" 
                                  value={newStudentSchool.fieldOfStudy} onChange={handleInputChange} 
                                  className='input-add-school' />
                  </div>
                  <div className='input-add-school-div'>
                    <h4 className="input-add-school-title">Degree Type</h4>
                    <TextField
                      select
                      placeholder="**************"
                      inputProps={{ 'aria-label': 'confirm-password', 'name': 'degreeType' }}
                      value={newStudentSchool.degreeType}
                      onChange={handleInputChange}
                      className='input-add-school'
                    >
                      <MenuItem value={'Bachelor'}>Bachelor</MenuItem>
                      <MenuItem value={'Master'}>Master</MenuItem>
                      <MenuItem value={'PhD'}>PhD</MenuItem>
                      <MenuItem value={'Associate'}>Associate</MenuItem>
                      <MenuItem value={'Highschool'}>Highschool</MenuItem>
                      <MenuItem value={'Other'}>Other</MenuItem>
                    </TextField>
                  </div>
                  <div className='date-add-school-div'>
                    <div className='input-add-school-div'>
                    <h4 className="input-add-school-title">Start Date</h4>
                    <DatePicker className='date-picker-add-school'
                                value={newStudentSchool.startYear} 
                                onChange={handleDateChange('startYear')} />
                    </div>
                    <div className='input-add-school-div'>
                      <h4 className="input-add-school-title">End Date</h4>
                      <DatePicker className='date-picker-add-school'
                                  value={newStudentSchool.endYear} 
                                  onChange={handleDateChange('endYear')} />
                    </div>
                  </div>
                </div>

                <Button className='btn-save-add-school' 
                  onClick={handleModalEducationSave}
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
