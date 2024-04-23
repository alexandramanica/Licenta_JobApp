import React from "react";
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import ArticleIcon from '@mui/icons-material/Article';

export const cardResumeData= Object.freeze([
    {
        title: 'Create your account', 
        icon : <PersonIcon />,
        description : 'Create your account and fill in your personal information'
    },
    {
        title:'Create your CV', 
        icon : <ArticleIcon />,
        description : 'Add your professional experience, education and skills'
    },
    {
        title: 'Find the best job for you',  
        icon : <WorkIcon />,
        description : 'Browse through our jobs and start applying'
    }
]);