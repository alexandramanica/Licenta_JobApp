import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import SchoolIcon from '@mui/icons-material/School';
import SummarizeIcon from '@mui/icons-material/Summarize';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

export const SidebarStudentData = Object.freeze([
    {
        path:"/Dashboard",
        name:"Dashboard",
        icon:<HomeIcon/>
    },
    {
        path:"/CV",
        name:"CV",
        icon:<AssignmentIndIcon/>
    },
    {
        path:"/JobsPage",
        name:"Jobs",
        icon:<WorkIcon/>,
    },   
    {
        path:"/LearningPath",
        name:"Learning Path",
        icon:<SchoolIcon/>
    },
    {
        path:"/TipsTricksPage",
        name:"Tips & Tricks",
        icon:<TipsAndUpdatesIcon/>
    },
    {
        path:"/Settings",
        name:"Account Settings",
        icon:<SettingsIcon/>
    }
])