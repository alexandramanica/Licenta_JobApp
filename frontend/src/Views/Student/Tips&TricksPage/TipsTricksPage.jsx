import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SidebarStudent from '../../../Components/Student/SidebarStudent/SidebarStudent'
import './TipsTricksPage.css'
import tipsData from './tipsTricksData'

export default function TipsTricksPage() {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <div>
            <SidebarStudent/>
            <div className='student-tips-tricks'>
                <div className="student-tips-tricks-text">
                    <h1 className='student-tips-tricks-text-title'>Tips & Tricks</h1>
                    <p className='student-tips-tricks-text-subtitle'>Hey there, student superstar!🌟 Let's embark on this adventure together!
                    <br/>Consider this your secret weapon for success. With the knowledge and tools at your fingertips, you'll feel empowered to overcome obstacles, achieve your goals, and create the future you envision for yourself.</p>
                </div>
                <div>

                <div className='student-tips-tricks-container'>
                    {tipsData.map((tip, index) => (
                        <div key={index}>
                            <h2 className='student-tips-tricks-container-tip-title'>{tip.title}</h2>
                            <p className='student-tips-tricks-container-tip-subtitle'>{tip.content}</p>
                            {tip.text.map((step, idx) => (
                                <Accordion key={`${index}-${idx}`} expanded={expanded === `panel${index}-${idx}`} onChange={handleChange(`panel${index}-${idx}`)}
                                sx={{width:'90%', marginBottom:'5px'}} >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls={`panel${index}-${idx}bh-content`}
                                        id={`panel${index}-${idx}bh-header`}
                                        sx={{color: '#ffffff', 
                                        background: 'linear-gradient(45deg, #ae85ff 30%, #ae85ff 90%)'}}
                                    >
                                        <Typography 
                                            sx={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1.2em', fontWeight: '600' }}>
                                            {step.subtitle}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{borderRadius:'16px'}}>
                                        <Typography sx={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1em', fontWeight: '400' }}>{step.textSubtitle}</Typography>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </div>
                    ))}
                </div>

                </div>
            </div>
        </div>
    )
}
