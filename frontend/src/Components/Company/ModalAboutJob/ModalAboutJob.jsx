import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import CheckIcon from '@mui/icons-material/Check';
import Alert from '@mui/material/Alert';
import { useState } from 'react';

import { axiosJWT, getUserDataFromToken } from '../../../Views/tokenPrep'
import './ModalAddJobCard.css';

export default function ModalAddJobCard({ open, handleClose}) {

  return (
    <div>
      <div>
        <Modal
            onClose={handleClose}
            open={open}
            className='modal-recruiter-job'>
            <Box >
            </Box>

        </Modal>
      </div>
         
    </div>
  )
}
