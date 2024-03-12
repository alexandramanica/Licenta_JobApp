import React,{useState} from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'

import {cardsData} from '../CardCareerPathAbout/cardCareerPathAboutData'
import './CardCareerPathAbout.css'

export default function CardCareerPathAbout() {

const [modalIsOpen, setModalIsOpen] = useState(false);
const [modalTextTitle, setModalTextTitle] = useState('');
const [modalTextDescription, setModalTextDescription] = useState('');
const [modalTextSkill1, setModalTextSkill1] = useState('');
const [modalTextSkill2, setModalTextSkill2] = useState('');
const [modalTextSkill3, setModalTextSkill3] = useState('');

const openModal = (title,description,skill,skill2,skill3) => {
    setModalTextTitle(title);
    setModalTextDescription(description);
    setModalTextSkill1(skill);
    setModalTextSkill2(skill2);
    setModalTextSkill3(skill3);
    setModalIsOpen(true);
};

const closeModal = () => {
    setModalIsOpen(false);
};

  return (
    <div>
        <div className='career-path-all-cards'> 
            {cardsData.map((card, index) => (
                <Card className='card-career-path-about' key={index} 
                      onClick={() => openModal(card.title,card.description,card.skill_1,card.skill_2,card.skill_3)}>
                <CardMedia
                    className="card-career-path-about-card-media"
                    component="img"  
                    image={card.image}
                    alt={card.title}
                />
                </Card>
            ))}
        </div>

      <Modal
        open={modalIsOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='modal-career-path-about'
      >
        <Box sx={{ width: 400, padding: 3 }}>
          <div className='modal-text-container'>
            <h3 className='modal-text-container-title'>{modalTextTitle}</h3>
              <h4 className='modal-text-container-description'>{modalTextDescription}</h4>
              <h5 className='modal-text-container-skills-title'>Skills:</h5>
              <div className='modal-text-container-skills'>
                <p>{modalTextSkill1}</p>
                <p>{modalTextSkill2}</p>
                <p>{modalTextSkill3}</p>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
